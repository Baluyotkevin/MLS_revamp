"use client";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from "zod";
import { toast } from 'sonner';
import { useUploadThing } from '@/lib/uploadthing';
import { generateLovePostAction, transcribeUploadedFile } from '@/lib/actions/upload-actions';

const fileSchema = z.object({
    file: z.instanceof(File, {message: "Invalid file"})
    .refine((file) => file.size <= 20 * 1024 * 1024, "File must not exceed 20MB")
    .refine((file) => file.type.startsWith('audio/') || file.type.startsWith("video/"), "File must be an audio or a video file" )
});

const UploadForm = () => {

    const { startUpload } = useUploadThing("videoOrAudioUploader", {
        onClientUploadComplete: () => {
            toast.success("Uploaded successfully!");
        },
        onUploadError: (err) => {
            console.error(err)
            toast.error("Error occurred while uploading");
        },
        onUploadBegin: () => {
            toast.info("Upload has begun 🚀!");
        },
    });

    const handleTranscribe = async (formData: FormData) => {
        const file = formData.get('file') as File;

        const validatedFields = fileSchema.safeParse({ file });

        if (!validatedFields.success) {
            console.log("validatedFields", validatedFields.error.flatten().fieldErrors);
            toast.error("Something went wrong", {
                description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
            });
        };

        if (file) {
            const response: any = await startUpload([file]);
            
            if (!response) toast.error("Please use a different file");
            toast.success("Just a moment! Our digital elves are working their magic on your file! 🪄✨");

            const result = await transcribeUploadedFile(response);
            const { data = null, message = null } = result || {};

            if (!result || (!data && !message)) toast.error("Unexpected error occurred with the file result");

            if (data) {
                toast.success("🤖 Generating AI love post...");

                await generateLovePostAction({
                    transcriptions: data.transcriptions,
                    userId: data.userId,
                });

                toast.success("🎉 Wooooo! Your AI love story has been shared! 🎊")
            }
        };
    };

  return (
    <form className="flex flex-col gap-6" action={handleTranscribe}>
        <div className="flex justify-end items-center gap-1 5">
            <Input id="file" name="file" type="file" accept="audio/*.video/*" required />
            <Button className="bg-red-600">Transcribe</Button>
        </div>
    </form>
  )
}

export default UploadForm