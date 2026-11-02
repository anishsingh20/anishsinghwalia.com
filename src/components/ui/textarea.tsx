import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-line bg-ink px-3 py-3 text-sm text-cream placeholder:text-faint focus-visible:border-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
