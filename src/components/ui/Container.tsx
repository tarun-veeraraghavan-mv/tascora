import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-[1024px] mx-auto px-[24px]">{children}</div>;
}
