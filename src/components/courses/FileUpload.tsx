import { uploadFile } from "@/lib/actions/auth";
import { useState, useTransition } from "react";

export default function FileUpload({ courseId }: { courseId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, startTransition] = useTransition();

  async function handleUpload() {
    if (!file) return console.log("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);

    startTransition(async () => {
      await uploadFile(formData);
    });
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-md"
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
