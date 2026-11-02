import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-line bg-ink px-3 text-sm text-cream placeholder:text-faint focus-visible:border-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
