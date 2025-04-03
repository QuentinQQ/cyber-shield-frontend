import React, { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  headerHeight?: number
  className?: string
  withGrid?: boolean
  gridRows?: number
  fullHeight?: boolean
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  headerHeight = 80,
  className = '',
  withGrid = false,
  gridRows = 3,
  fullHeight = true,
}) => {
  const classes = [
    'relative w-full px-4 bg-transparent',
    fullHeight ? 'h-screen' : '',
    withGrid ? `grid grid-rows-${gridRows}` : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <section
      id={id}
      className={classes}
      style={{
        paddingTop: headerHeight ? `${headerHeight}px` : undefined
      }}
    >
      {children}
    </section>
  )
}

export default SectionWrapper