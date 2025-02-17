"use client";

import { uploadLink } from "@/lib/actions/auth";
import { Button, Divider, Input } from "@heroui/react";
import { Link } from "@prisma/client";
import React from "react";

interface LinkUploadCompProps {
  courseId: string;
  links: Link[];
}

export default function LInkUploadComp({
  courseId,
  links,
}: LinkUploadCompProps) {
  return (
    <div>
      <form action={uploadLink}>
        <h3 className="text-lg">Store resource links</h3>
        <div className="flex">
          <Input label="Link name" name="name" />
          <Input label="URL" name="link" />
          <input type="hidden" value={courseId} name="courseId" />
        </div>

        <Button type="submit">Upload</Button>
      </form>
      <Divider />
      <h3 className="text-lg">All your links</h3>

      {links
        ?.filter((link) => link.courseId === parseInt(courseId))
        .map((link, index) => (
          <div className="block" key={link.id}>
            {index + 1}) {link.name}:{" "}
            <a href={link.link} target="_blank" className="underline ">
              {link.link.substring(0, 34)}...
            </a>
          </div>
        ))}
    </div>
  );
}
