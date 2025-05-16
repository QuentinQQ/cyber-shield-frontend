import { useState, useEffect, useRef, ReactNode } from 'react';

const RelaxBackground = ({ children }: { children: ReactNode }) => {
  // Create a reference for each cloud to track position
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [clouds, setClouds] = useState([
    { id: 1, x: 100, y: 100, width: 180, height: 100, isDragging: false, color: '#c4b5fd' },
    { id: 2, x: 300, y: 150, width: 220, height: 120, isDragging: false, color: '#a5b4fc' },
    { id: 3, x: 150, y: 250, width: 200, height: 110, isDragging: false, color: '#93c5fd' },
    { id: 4, x: 400, y: 80, width: 160, height: 90, isDragging: false, color: '#bfdbfe' },
  ]);
  
  // Animation offsets for gentle floating
  const [offset, setOffset] = useState(0);
  
  // Setup animation loop
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setOffset((prev) => (prev + 0.1) % 20);
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [offset]);
  
  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setClouds(clouds.map((cloud, i) => 
      i === index ? { ...cloud, isDragging: true } : cloud
    ));
  };
  
  // Handle mouse move to drag clouds
  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    setClouds(clouds.map(cloud => 
      cloud.isDragging 
        ? { ...cloud, x: e.clientX - cloud.width/2, y: e.clientY - cloud.height/2 } 
        : cloud
    ));
  };
  
  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setClouds(clouds.map(cloud => ({ ...cloud, isDragging: false })));
  };
  
  // Add event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clouds]);

  // Generate a cloud shape as SVG
  const CloudShape = ({ width, height, color }: { width: number; height: number; color: string }) => {
    return (
      <svg width={width} height={height} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30 70 C15 70, 5 65, 5 55 C5 45, 15 40, 25 40 C25 30, 35 20, 50 20 C70 20, 85 35, 85 50 C95 45, 110 50, 110 60 C110 70, 100 75, 90 75 C90 80, 80 85, 70 85 C55 85, 45 75, 45 70 C40 75, 35 70, 30 70"
          fill={color}
          fillOpacity="0.8"
        />
      </svg>
    );
  };

  return (
    // Container with fixed size ratio for the grass image
    <div className="min-h-screen w-full relative overflow-hidden" 
         style={{ 
           // Use a light pink fallback while the grass image loads
           backgroundColor: '#fce7f3',
           cursor: clouds.some(c => c.isDragging) ? 'grabbing' : 'default' 
         }}>
      
      {/* Full-screen grass background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/relax-grass.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover', // This will make it fill the screen
          pointerEvents: 'none' // Allow interaction with elements on top
        }}
      />
      
      {/* Draggable clouds */}
      {clouds.map((cloud, index) => (
        <div
          key={cloud.id}
          ref={el => { cloudRefs.current[index] = el; }}
          className="absolute cursor-grab"
          style={{
            left: cloud.x,
            top: cloud.y + Math.sin(offset + index) * 5,
            width: cloud.width,
            height: cloud.height,
            cursor: cloud.isDragging ? 'grabbing' : 'grab',
            filter: 'drop-shadow(0px 10px 15px rgba(139, 92, 246, 0.5))',
            zIndex: cloud.isDragging ? 100 : 2,
            transition: cloud.isDragging ? 'none' : 'top 2s ease-in-out'
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
        >
          <CloudShape width={cloud.width} height={cloud.height} color={cloud.color} />
        </div>
      ))}
      
      {/* Render children passed to this component */}
      {children}
    </div>
  );
};

export default RelaxBackground;