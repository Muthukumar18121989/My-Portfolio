import * as React from "react";
import { cn } from "@/lib/utils";

// Laptop device frame for showcasing application screenshots — a neutral,
// grayscale bezel (not themed to accent colors) so it reads as a device,
// not a branded element, per common portfolio "project in a laptop" pattern.
export interface LaptopMockupProps {
  children: React.ReactNode;
  className?: string;
}

function LaptopMockup({ children, className }: LaptopMockupProps) {
  return (
    <div className={cn("mx-auto w-full", className)}>
      <div className="rounded-t-lg border-6 border-[#2a2a2a] bg-[#2a2a2a] shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-bg-surface">
          {children}
        </div>
      </div>
      <div className="h-2.5 rounded-b-sm bg-gradient-to-b from-[#3a3a3a] to-[#1c1c1c]" />
      <div className="mx-auto h-1.5 w-1/3 rounded-b-md bg-[#1c1c1c]" />
    </div>
  );
}

export { LaptopMockup };
