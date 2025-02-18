"use client";

import { deleteFile } from "@/lib/actions/auth";
import { FileUpload } from "@prisma/client";

interface ViewCourseFileProps {
  courseId: string;
  files: FileUpload[];
}

export default function ViewCourseFile({
  courseId,
  files,
}: ViewCourseFileProps) {
  console.log("FILE:", files);

  return (
    <div>
      <h2 className="text-lg">View your files</h2>
      {files
        ?.filter((file) => file.courseId === parseInt(courseId))
        ?.map((file) => (
          <div key={file.id} className="flex justify-between">
            <a
              href={`https://emgpuifemogjyllulvyp.supabase.co/storage/v1/object/public/courses/${file.fileUrl}`}
              target="_blank"
              download
            >
              {file.name}: <span className="underline">View course file</span>
            </a>

            <button
              className="text-red-500 text-md"
              onClick={() => deleteFile(file.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
