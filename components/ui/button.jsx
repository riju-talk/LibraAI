import React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", disabled, children, ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center rounded-xl font-medium 
      transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
      focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50
      relative overflow-hidden group
    `

    const variants = {
      default: `
        btn-primary text-navy-900 font-semibold
        hover:shadow-gold active:scale-95
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-700
      `,
      secondary: `
        btn-secondary text-neutral-100
        hover:text-gold-100 active:scale-95
      `,
      outline: `
        border-2 border-gold-600/50 text-gold-100 bg-transparent
        hover:bg-gold-600 hover:text-navy-900 hover:border-gold-500
        hover:shadow-gold active:scale-95
      `,
      ghost: `
        btn-ghost hover:bg-glass-accent
        active:scale-95
      `,
      destructive: `
        bg-error text-white border-none
        hover:bg-red-600 hover:shadow-lg
        active:scale-95
      `,
    }

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-lg",
      default: "h-11 px-6 text-sm rounded-xl",
      lg: "h-13 px-8 text-base rounded-xl",
      icon: "h-11 w-11 rounded-xl",
      "icon-sm": "h-9 w-9 rounded-lg",
    }

    return (
      <button 
        className={cn(baseClasses, variants[variant], sizes[size], className)} 
        ref={ref} 
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }