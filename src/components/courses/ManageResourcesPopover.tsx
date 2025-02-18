import { Card, CardBody, Divider, Tab, Tabs } from "@heroui/react";
import React from "react";
import FileUpload from "./FileUpload";
import ViewCourseFile from "../file-upload/ViewCourseFile";
import { Course, FileUpload as FileUploadType, Link } from "@prisma/client";
import LInkUploadComp from "./LInkUploadComp";

interface ManageResourcesProps {
  course: Course;
  files: FileUploadType[];
  links: Link[];
}

export default function ManageResourcesPopover({
  course,
  files,
  links,
}: ManageResourcesProps) {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="Files" title="Files">
          <Card>
            <CardBody>
              <FileUpload courseId={String(course.id)} />
              <Divider />
              <ViewCourseFile courseId={String(course.id)} files={files} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Links" title="Links">
          <Card>
            <CardBody>
              <LInkUploadComp courseId={String(course.id)} links={links} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
