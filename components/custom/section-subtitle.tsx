import React from "react";

export default function SectionSubtitle({ subtitle }: { subtitle: string }) {
  return (
    <h4 className="text-sm font-medium mb-2 uppercase text-secondary">
      {subtitle}
    </h4>
  );
}
