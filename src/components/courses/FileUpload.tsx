"use client";

import { uploadFile } from "@/lib/actions/auth";
import { Button } from "@heroui/react";
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
      <h3 className="text-lg">Upload your file (File size less than 1 MB)</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-md"
      />
      <Button type="submit" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
