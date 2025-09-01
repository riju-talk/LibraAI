import React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, disabled, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `input-primary h-12 w-full rounded-xl px-4 py-3 text-sm
         placeholder:text-neutral-400 
         focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold-500/30
         disabled:cursor-not-allowed disabled:opacity-50
         transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)`,
        className,
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }