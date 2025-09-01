import React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: `
      bg-gold-600 text-navy-900 border-gold-500
      shadow-sm font-semibold
    `,
    secondary: `
      bg-glass-secondary text-neutral-100 border-glass-border
      backdrop-filter blur-sm
    `,
    success: `
      bg-success text-white border-green-400
      shadow-sm
    `,
    warning: `
      bg-warning text-white border-yellow-400
      shadow-sm
    `,
    error: `
      bg-error text-white border-red-400
      shadow-sm
    `,
    outline: `
      bg-transparent text-gold-300 border-gold-500/50
      hover:bg-gold-500/10
    `,
  }

  return (
    <div
      ref={ref}
      className={cn(
        `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium 
         transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
         focus:outline-none focus:ring-2 focus:ring-gold-500/30`,
        variants[variant],
        className,
      )}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export { Badge }