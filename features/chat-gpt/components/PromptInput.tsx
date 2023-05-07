"use client";

import { TextareaHTMLAttributes } from "react";

export function PromptInput(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      className="bg-gray-200 p-3 text-slate-800 rounded max-w-5xl w-full min-h-[320px] resize-none"
      placeholder="Help me with code review..."
      name="prompt"
      {...props}
    />
  );
}
