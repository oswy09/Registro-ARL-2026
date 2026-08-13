import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[#606776] selection:bg-primary selection:text-primary-foreground border flex h-11 w-full min-w-0 rounded-[8px] border-[#D4D7DD] bg-[#FFFFFF] pl-3 pr-3 py-1 text-base text-[#1A1D21] transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#00000026] disabled:text-[#0000004D] md:text-sm",
        "hover:border-[#00008F] focus-visible:border-[#00008F]",
        "focus-visible:ring-2 focus-visible:ring-[#00008F] focus-visible:ring-offset-2",
        "aria-invalid:border-[#880727] aria-invalid:ring-2 aria-invalid:ring-[#880727]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
