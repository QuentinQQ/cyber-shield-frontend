import React from 'react'

interface HeroAvatarProps {
  src: string
  alt: string
  position?: 'left' | 'right'
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ src, alt, position }) => {
  const sideClass =
    position === 'left' ? 'left-4 md:left-10' : 'right-4 md:right-10'

  return (
    <img
      src={src}
      alt={alt}
      className={`w-36 h-36 rounded-full bg-blue-600 p-5 shadow-lg absolute ${sideClass}`}
    />
  )
}

export default HeroAvatar
