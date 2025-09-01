import React from "react"
import { cn } from "../../lib/utils"

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <div className="h-full w-full overflow-auto scrollbar-thin scrollbar-track-glass-primary scrollbar-thumb-gold-600 hover:scrollbar-thumb-gold-500">
      {children}
    </div>
  </div>
))

ScrollArea.displayName = "ScrollArea"

export { ScrollArea }