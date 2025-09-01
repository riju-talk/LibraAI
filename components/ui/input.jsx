import React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, disabled, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `h-12 w-full rounded-xl px-4 py-3 text-sm
         bg-navy-900 text-white border border-[#2A3A5F]
         placeholder:text-neutral-400 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA311]
         disabled:cursor-not-allowed disabled:opacity-50
         transition-all duration-300`,
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