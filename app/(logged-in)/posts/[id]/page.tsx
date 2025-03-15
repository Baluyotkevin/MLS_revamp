
import { connectToDB } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function PostsPage({ params : { id } } : { params : { id : string } }) {
    const user = await currentUser();

    if (!user) return redirect('/sign-in');

    const sql = await connectToDB();

    const posts = sql`SELECT content FROM posts WHERE user_id = ${user.id}`;

    return (
        <div className="">

        </div>
    )
}