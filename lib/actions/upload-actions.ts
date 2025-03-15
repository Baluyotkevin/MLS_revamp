"use server";
import OpenAI from "openai";
import { connectToDB } from "../database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getUsersLatestPosts(userId: string) {
    try {
        const sql = await connectToDB();

        const posts = sql`SELECT content FROM posts WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 3`;
        return posts.map((post: any) => post.content).join("\n\n");
        
    } catch (err) {
        console.error("Error in fetching all posts", err)
    }
};

export async function transcribeUploadedFile(response : {
    serverData: { userId : string; file: any }
}[]) {
    if (!response) {
        return {
            success: false,
            message: "File Upload failed"
        }
    };

    const { serverData : { userId, file : { url: fileUrl, name: fileName }}} = response[0];

    if (!fileUrl || !fileName) return { success: false, message: "File uploaded failed", data: null };

    const fileResponse = await fetch(fileUrl)
    try {
        const transcriptions = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: fileResponse
        });
        console.log({ transcriptions });
        return {
            success: true,
            message: "File uploaded successfully!",
            data: { transcriptions, userId }
        };

    } catch (err) {
        console.error("Error processing file", err)

        if (err instanceof OpenAI.APIError && err.status === 413) {
            return {
                success: false,
                message: "File size exceeds max limit of 20MB",
                data: null
            }
        }
        return {
            success: false,
            message: err instanceof Error ? err.message : "Error processing file",
            data: null,
        };
    };

};

async function generateLovePost({
  transcriptions,
  userPosts,
}: {
  transcriptions: string;
  userPosts: string;
}) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a skilled content writer that converts audio transcriptions into well-structured, engaging blog posts in Markdown format. Create a comprehensive blog post with a catchy title, introduction, main body with multiple sections, and a conclusion. Analyze the user's writing style from their previous posts and emulate their tone and style in the new post. Keep the tone casual and professional.",
      },
      {
        role: "user",
        content: `Here are some of my previous blog posts for reference:

${userPosts}

Please convert the following transcription into a well-structured blog post using Markdown formatting. Follow this structure:

1. Start with a SEO friendly catchy title on the first line.
2. Add two newlines after the title.
3. Write an engaging introduction paragraph.
4. Create multiple sections for the main content, using appropriate headings (##, ###).
5. Include relevant subheadings within sections if needed.
6. Use bullet points or numbered lists where appropriate.
7. Add a conclusion paragraph at the end.
8. Ensure the content is informative, well-organized, and easy to read.
9. Emulate my writing style, tone, and any recurring patterns you notice from my previous posts.

Here's the transcription to convert: ${transcriptions}`,
      },
    ],
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
};

async function saveLovePost(userId: string, title: string, content: string) {
    try {
        const sql = await connectToDB();
        const [insertedPost] = await sql`INSERT into posts (user_id, title, content) VALUES(${userId},${title},${content}) RETURNING id`;

        return insertedPost.id;
    } catch (err) {

        console.error("Error saving love post", err);
    }
};

export async function generateLovePostAction({
    transcriptions, userId,
} : { transcriptions: { text: string }, userId: string }) {
    const userPosts = await getUsersLatestPosts(userId)
    let postId = null
    if (transcriptions) {
        const lovePost = await generateLovePost({ transcriptions: transcriptions.text, userPosts});

        if (!lovePost) {
            return {
                success: false,
                message: "Blog post generation failed, please try again..."
            };
        };

        const [title, ...contentParts] = lovePost?.split("\n\n") || [];

    
        postId = await saveLovePost(userId, title, lovePost);
    }

    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
};
