"use client";

import {
  Button,
  Card,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@heroui/react";
import React from "react";

export default function TodoItemSkeleton() {
  return (
    <div>
      <Card className="max-w-[400px]">
        <Skeleton className="flex gap-3 justify-between">
          <div className="flex flex-col">
            <p className="text-md"></p>
            <p className="text-small text-default-500"></p>
          </div>
          <div>
            <Skeleton>
              <Popover>
                <PopoverTrigger>
                  <Button></Button>
                </PopoverTrigger>
                <PopoverContent> </PopoverContent>
              </Popover>
            </Skeleton>
          </div>
        </Skeleton>
        <Divider />
        <Skeleton className="flex flex-col gap-3"></Skeleton>
        <Divider />
      </Card>
    </div>
  );
}
