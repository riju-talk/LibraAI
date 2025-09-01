import React from "react"
import { cn } from "../../lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `relative flex shrink-0 overflow-hidden rounded-full
       ring-2 ring-gold-500/30 transition-all duration-300`,
      className
    )}
    {...props}
  />
))

Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))

AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `flex h-full w-full items-center justify-center rounded-full 
       bg-gradient-to-br from-gold-500 to-gold-600 text-navy-900 font-semibold
       shadow-inner`,
      className
    )}
    {...props}
  />
))

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }