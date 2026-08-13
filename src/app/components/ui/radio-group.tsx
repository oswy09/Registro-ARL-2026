"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group aspect-square size-7 shrink-0 rounded-full border-2 border-[#C7CAD1] bg-[#F8FAFF] text-[#00008F] transition-colors outline-none hover:border-[#0000F7] hover:bg-[#F0F6FF] focus-visible:ring-2 focus-visible:ring-[#0000F7] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#C7CAD1] data-[state=checked]:bg-[#F8FAFF] data-[state=checked]:hover:border-[#0000F7] data-[state=checked]:hover:bg-[#F0F6FF]",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-[#00008F] group-hover:fill-[#0000F7] data-[state=checked]:fill-[#00008F]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
