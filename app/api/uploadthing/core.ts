import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  videoOrAudioUploader: f({
    video: {
      maxFileSize: "32MB",
    },
  })
    .middleware(async ({ req }) => {
        const { userId } = getAuth(req);
        if (!userId) throw new UploadThingError("Unauthorized");

        console.log("User authenticated:", userId);
        return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);
        console.log("File URL:", file.url);

        return { userId: metadata.userId, file: file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
