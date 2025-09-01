import React from "react"
import { cn } from "../../lib/utils"

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "relative overflow-hidden",
      "bg-gradient-to-br from-[#14213D] via-[#001D3D] to-[#003566]",
      className
    )} 
    {...props}
  >
    <div 
      className={cn(
        "h-full w-full overflow-auto",
        "scrollbar-thin",
        "scrollbar-track-[#14213D]/30",
        "scrollbar-thumb-[#FCA311] hover:scrollbar-thumb-[#FCA311]/80",
        "scrollbar-thumb-rounded-full"
      )}
    >
      {children}
    </div>
  </div>
))

ScrollArea.displayName = "ScrollArea"

export { ScrollArea }