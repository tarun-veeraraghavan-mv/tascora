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
          <a
            href={`https://emgpuifemogjyllulvyp.supabase.co/storage/v1/object/public/courses/course-files/${file.fileUrl}`}
            target="_blank"
            download="1739748087837-Frame%201.png"
            key={file.id}
          >
            View course file
          </a>
        ))}
    </div>
  );
}
