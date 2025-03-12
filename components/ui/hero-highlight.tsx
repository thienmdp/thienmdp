'use client'
import { cn } from '@/lib/utils'
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion'
import React from 'react'

export const HeroHighlight = ({
  children,
  className,
  showGradient = true,
  containerClassName
}: {
  children: React.ReactNode
  className?: string
  showGradient?: boolean
  containerClassName?: string
}) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return
    let { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  return (
    <div className={cn('group relative h-screen w-full', containerClassName)} onMouseMove={handleMouseMove}>
      <div className='pointer-events-none absolute inset-0 bg-dot-thick-neutral-600/10 dark:bg-dot-thick-neutral-300/10' />
      <motion.div
        className='pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-[#1854af] group-hover:opacity-100 dark:bg-dot-thick-[#f37a0c]'
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `
        }}
      />
      {showGradient && (
        <div className='pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent,white)] dark:bg-black-100' />
      )}
      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  )
}

export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%'
      }}
      animate={{
        backgroundSize: '100% 100%'
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        delay: 0.5
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline'
      }}
      className={cn(`relative inline-block rounded-lg bg-gradient-to-r`, className)}
    >
      {children}
    </motion.span>
  )
}
