// File: src/components/NetworkBackground.tsx

import React, { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  className?: string;
  dotColor?: string;
  lineColor?: string;
  dotCount?: number;
  connectionDistance?: number;
  dotSize?: number;
  lineWidth?: number;
  speed?: number;
  interactive?: boolean;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
  className = "",
  dotColor = "rgba(0, 150, 255, 0.8)",
  lineColor = "rgba(150, 150, 150, 0.2)",
  dotCount = 50,
  connectionDistance = 150,
  dotSize = 3,
  lineWidth = 1,
  speed = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let mousePosition = { x: width / 2, y: height / 2 };
    
    // Set canvas size to full window
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    
    // Handle window resize
    window.addEventListener('resize', setCanvasSize);
    
    // Track mouse position if interactive
    if (interactive) {
      window.addEventListener('mousemove', (e) => {
        mousePosition = { x: e.clientX, y: e.clientY };
      });
      
      // Also track touch for mobile
      window.addEventListener('touchmove', (e) => {
        if (e.touches[0]) {
          mousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      });
    }
    
    // Create dots
    const dots: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
    }[] = [];
    
    for (let i = 0; i < dotCount; i++) {
      // Create dots with random positions and velocities
      const dot = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        color: dotColor,
        size: Math.random() * dotSize + 1,
      };
      
      dots.push(dot);
    }
    
    // Create some colorful dots (orange, blue, green)
    // Create colorful dots with kid-friendly colors
const splashColors = [
    "rgba(255, 183, 197, 0.8)",  // Pink (slightly more opaque)
    "rgba(173, 216, 230, 0.8)",  // Light blue (slightly more opaque)
    "rgba(152, 251, 152, 0.8)",  // Light green (slightly more opaque)
    "rgba(255, 255, 153, 0.8)",  // Light yellow (slightly more opaque)
    "rgba(221, 160, 221, 0.8)",  // Light purple (slightly more opaque)
  ];
  
  // Apply the splash colors to some dots
  splashColors.forEach((color) => {
    for (let i = 0; i < 4; i++) {  // 4 dots of each color
      const index = Math.floor(Math.random() * dots.length);
      if (dots[index]) {
        dots[index].color = color;
        dots[index].size = dotSize * (Math.random() * 1.5 + 1.5); // Varied sizes between 1.5x and 3x
      }
    }
  });
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw dots
      dots.forEach((dot, index) => {
        // Move dots
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Bounce off edges
        if (dot.x < 0 || dot.x > width) dot.vx = -dot.vx;
        if (dot.y < 0 || dot.y > height) dot.vy = -dot.vy;
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        
        // If interactive, dots near mouse move away slightly
        if (interactive) {
          const dx = mousePosition.x - dot.x;
          const dy = mousePosition.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const force = (connectionDistance - distance) / connectionDistance;
            dot.vx -= (dx / distance) * force * 0.02;
            dot.vy -= (dy / distance) * force * 0.02;
          }
        }
        
        // Draw connections between dots
        for (let j = index + 1; j < dots.length; j++) {
          const otherDot = dots[j];
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Make line opacity based on distance
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`).replace('rgba', 'rgba');
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
        
        // Draw connections to mouse if interactive
        if (interactive) {
          const dx = dot.x - mousePosition.x;
          const dy = dot.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance * 1.5) {
            const opacity = 1 - (distance / (connectionDistance * 1.5));
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`).replace('rgba', 'rgba');
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      });
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (interactive) {
        window.removeEventListener('mousemove', (e) => {
          mousePosition = { x: e.clientX, y: e.clientY };
        });
        window.removeEventListener('touchmove', (e) => {
          if (e.touches[0]) {
            mousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        });
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, lineColor, dotCount, connectionDistance, dotSize, lineWidth, speed, interactive]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default NetworkBackground;