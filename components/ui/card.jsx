import React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      `card-primary rounded-2xl shadow-lg
       transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)`,
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
  <h3 ref={ref} className={cn("text-lg font-semibold text-white leading-tight", className)} {...props} />
))

CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 flex items-center", className)} {...props} />
))

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardContent, CardFooter }