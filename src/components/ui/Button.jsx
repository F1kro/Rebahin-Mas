import * as React from "react"

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  // Style khusus Comic: Border tebal + Shadow kaku (drop-shadow-black)
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-black"

  const variants = {
    // Merah khas komik Marvel/DC
    default: "bg-[#FF0000] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CC0000]",
    // Kuning retro untuk aksi/perhatian
    destructive: "bg-[#FFD700] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFC400]",
    // Outline bersih dengan shadow
    outline: "border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100",
    // Ungu/Cyan untuk kesan Sci-Fi
    secondary: "bg-[#00FFFF] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00DADA]",
    ghost: "border-transparent hover:bg-black hover:text-white hover:border-black",
    link: "text-black underline-offset-4 hover:underline border-none shadow-none",
  }

  const sizes = {
    default: "h-10 px-6 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-10 text-lg",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }