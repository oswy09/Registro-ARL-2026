"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-5 shrink-0 rounded-[6px] border-[1.5px] border-[#C7CAD1] bg-[#F8FAFF] text-white transition-colors outline-none hover:border-[#0000F7] hover:bg-[#F0F6FF] data-[state=checked]:border-[#00008F] data-[state=checked]:bg-[#00008F] data-[state=checked]:hover:border-[#0000F7] data-[state=checked]:hover:bg-[#0000F7] focus-visible:ring-2 focus-visible:ring-[#0000F7] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
