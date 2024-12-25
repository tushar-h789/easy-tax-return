import { toTitleCase } from "@/lib/utils";
import React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="font-serif text-[2.5rem] leading-tight font-bold mb-4">
      {toTitleCase(title)}
    </h2>
  );
}
