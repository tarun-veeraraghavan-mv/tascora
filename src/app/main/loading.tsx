import Loading from "@/components/ui/Loading";
import React from "react";

export default function loading() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
      <Loading />
    </div>
  );
}
