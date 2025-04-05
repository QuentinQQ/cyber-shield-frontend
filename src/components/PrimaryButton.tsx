// PrimaryButton.tsx
import React from 'react'
import { cn } from '@/lib/utils'  // Optional: className helper if using clsx or shadcn setup

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cta' | 'ghost'
  rotate?: boolean
}

const variantClasses: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
  default: 'bg-blue-200 text-black hover:bg-blue-300',
  cta: 'bg-orange-400 text-black text-xl px-8 py-4 hover:bg-orange-500',
  ghost: 'bg-transparent text-white border border-white hover:bg-white hover:text-black',
}


const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  variant = 'default',
  rotate = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'font-semibold rounded-full px-5 py-2 transition-transform duration-300 shadow',
        variantClasses[variant],
        rotate && '-rotate-6 hover:rotate-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
