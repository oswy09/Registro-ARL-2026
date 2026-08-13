import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex max-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-[12px] text-sm font-medium transition-colors disabled:pointer-events-none disabled:bg-[#00000026] disabled:text-[#0000004D] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0000F7] focus-visible:ring-offset-2 aria-invalid:ring-2 aria-invalid:ring-[#880727] aria-invalid:border-[#880727]",
  {
    variants: {
      variant: {
        default: "bg-[#00008F] text-[#FFFFFF] hover:bg-[#0000F7] hover:text-[#E8EAED] active:bg-[#0000D2] active:text-[#D4D7DD]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "border border-[#00008F] bg-[#FFFFFF] text-[#00008F] hover:bg-[#0000F7] hover:border-transparent hover:text-[#E8EAED] active:bg-[#0000D2] active:border-transparent active:text-[#D4D7DD]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto px-4 py-[12px] has-[>svg]:px-3",
        sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-full px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
