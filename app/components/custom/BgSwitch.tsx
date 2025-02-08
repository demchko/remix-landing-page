import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "~/lib/utils";
import { Moon, Sun } from "lucide-react";

const BgSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-7 w-[55px] shrink-0 cursor-pointer items-center rounded-full border-2 border-gray-300 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <div className="relative h-full w-full">
      <Moon
        className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 transform text-background transition-opacity data-[state=checked]:opacity-0"
        data-state={props.checked ? "checked" : "unchecked"}
      />
      <Sun
        className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 transform text-foreground transition-opacity data-[state=unchecked]:opacity-0"
        data-state={props.checked ? "unchecked" : "checked"}
      />
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
        )}
      />
    </div>
  </SwitchPrimitives.Root>
));
BgSwitch.displayName = SwitchPrimitives.Root.displayName;

export { BgSwitch };
