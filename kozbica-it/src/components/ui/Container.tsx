import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className, narrow }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", narrow ? "max-w-4xl" : "max-w-7xl", className)}>
      {children}
    </div>
  );
}
