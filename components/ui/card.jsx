import React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      `bg-[#14213D] border border-[#2A3A5F] rounded-2xl shadow-lg
       transition-all duration-300 hover:shadow-xl hover:shadow-[#FCA311]/10
       overflow-hidden`,
      className
    )} 
    {...props}
  >
    {children}
  </div>
))

Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pb-4", className)} {...props} />
))

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold text-white leading-tight tracking-tight", className)} {...props} />
))

CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-2 text-gray-300 text-sm leading-relaxed", className)} {...props} />
))

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-2 flex items-center border-t border-[#2A3A5F] bg-[#14213D]/50", className)} {...props} />
))

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardContent, CardFooter }