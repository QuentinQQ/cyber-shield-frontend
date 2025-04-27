import { useState, useEffect, useCallback } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface MessageTemplate {
  id: number;
  text: string;
  emoji: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  color: string;
  shooting: boolean;
  brightened: boolean;
  shootingDirection: { x: number; y: number };
}

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  speed: number;
  popping: boolean;
}

const SafePeople = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [stars, setStars] = useState<Star[]>([]);
  const [allStarsBrightened, setAllStarsBrightened] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showBubbles] = useState(true);

  // Generate mini space bubbles
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 10, // 10-30px
      x: Math.random() * 60 - 30, // Position around speech bubble (-30 to 30%)
      y: Math.random() * 60 - 30, // Position around speech bubble (-30 to 30%)
      speed: Math.random() * 2 + 1, // 1-3s
      popping: false
    }));
    
    setBubbles(newBubbles);
  }, []);

  // Randomly pop bubbles
  useEffect(() => {
    if (!showBubbles) return;
    
    const popRandomBubble = () => {
      const nonPoppingBubbles = bubbles.filter(bubble => !bubble.popping);
      if (nonPoppingBubbles.length > 0) {
        const randomBubble = nonPoppingBubbles[Math.floor(Math.random() * nonPoppingBubbles.length)];
        
        setBubbles(prevBubbles => 
          prevBubbles.map(bubble => {
            if (bubble.id === randomBubble.id) {
              return {...bubble, popping: true};
            }
            return bubble;
          })
        );
        
        // Replace the bubble after popping animation
        setTimeout(() => {
          setBubbles(prevBubbles => 
            prevBubbles.map(bubble => {
              if (bubble.id === randomBubble.id) {
                return {
                  ...bubble,
                  popping: false,
                  size: Math.random() * 20 + 10,
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 60 - 30,
                  speed: Math.random() * 2 + 1
                };
              }
              return bubble;
            })
          );
        }, 1000);
      }
    };
    
    const interval = setInterval(() => {
      popRandomBubble();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [bubbles, showBubbles]);

  // Generate initial stars
  useEffect(() => {
    // Colors for the stars - brighter colors
    const starColors = [
      'rgba(255, 255, 255, 1)',   // White
      'rgba(135, 206, 250, 1)',   // Light blue
      'rgba(255, 255, 224, 1)',   // Light yellow
      'rgba(173, 216, 230, 1)',   // Light blue
      'rgba(240, 248, 255, 1)',   // Alice blue
    ];
    
    const generatedStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5-95% position
      y: Math.random() * 90 + 5, // 5-95% position
      size: Math.random() * 3 + 2, // 2-5px
      twinkleSpeed: Math.random() * 3 + 1, // 1-4s
      color: starColors[Math.floor(Math.random() * starColors.length)],
      shooting: false,
      brightened: false,
      shootingDirection: { x: 0, y: 0 }
    }));
    setStars(generatedStars);
  }, []);

  // Function to make a star shoot
  const makeStarShoot = useCallback((id: number) => {
    setStars(prevStars => 
      prevStars.map(star => {
        if (star.id === id && !star.shooting) {
          // Random direction, mostly diagonal downward
          const dirX = Math.random() * 2 - 0.5; // -0.5 to 1.5
          const dirY = Math.random() * 1.5 + 0.5; // 0.5 to 2
          
          return {
            ...star,
            shooting: true,
            shootingDirection: { x: dirX, y: dirY }
          };
        }
        return star;
      })
    );

    // Reset the star after animation
    setTimeout(() => {
      setStars(prevStars => 
        prevStars.map(star => {
          if (star.id === id) {
            return {
              ...star,
              x: Math.random() * 90 + 5,
              y: Math.random() * 20 + 5, // Appear at the top
              shooting: false,
              shootingDirection: { x: 0, y: 0 }
            };
          }
          return star;
        })
      );
    }, 3000); // Longer duration for slower animation
  }, []);

  // Automatic shooting stars - slowed down
  useEffect(() => {
    const shootRandomStar = () => {
      const nonShootingStars = stars.filter(star => !star.shooting && !star.brightened);
      if (nonShootingStars.length > 0) {
        const randomStar = nonShootingStars[Math.floor(Math.random() * nonShootingStars.length)];
        makeStarShoot(randomStar.id);
      }
    };

    // Shoot a random star every 3 to 6 seconds - slower timing
    const interval = setInterval(() => {
      if (!allStarsBrightened) {
        shootRandomStar();
      }
    }, Math.random() * 3000 + 3000);

    // Initial shooting star with a delay
    const initialTimeout = setTimeout(() => {
      shootRandomStar();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [stars, makeStarShoot, allStarsBrightened]);

  // Function to make all stars brighten when a message is copied
  const brightenAllStars = () => {
    setAllStarsBrightened(true);
    
    // Set all stars to brightened state
    setStars(prevStars => 
      prevStars.map(star => ({
        ...star,
        brightened: true,
        shooting: false
      }))
    );
    
    // Reset after the effect
    setTimeout(() => {
      setAllStarsBrightened(false);
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          brightened: false
        }))
      );
    }, 2000);
  };

  const messageTemplates: MessageTemplate[] = [
    {
      id: 1,
      text: "Hey, something's happening online and I don't really know what to do. It's kinda overwhelming and I feel like I'm losing control. I think I need your help.",
      emoji: ''
    },
    {
      id: 2,
      text: "Hey, I'm dealing with something online and it's getting a bit too much. I've tried handling it on my own but I'm kinda stuck. Can I talk to you about it?",
      emoji: ''
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSelectedTemplate(text);
    // Activate the star brightening effect instead of confetti
    brightenAllStars();

    setTimeout(() => {
      setSelectedTemplate('');
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8 pt-32 pb-32 relative"> {/* Increased top padding */}
      {/* Sky background with stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/sky.png" 
          alt="Sky background" 
          className="w-full h-full object-cover"
        />
        
        {/* Interactive stars layer */}
        <div className="absolute inset-0">
          {/* CSS for stars, bubbles, and animations */}
          <style>{`
            @keyframes twinkle {
              0% { opacity: 0.5; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.1); }
              100% { opacity: 0.5; transform: scale(0.8); }
            }
            
            @keyframes shoot {
              0% { 
                transform: translate(0px, 0px) scale(1);
                opacity: 1;
                box-shadow: 0 0 20px 5px var(--star-color), 0 0 40px 10px var(--star-color);
              }
              100% { 
                transform: translate(var(--move-x), var(--move-y)) scale(0);
                opacity: 0;
                box-shadow: 0 0 0 0 transparent;
              }
            }
            
            @keyframes brighten {
              0% { 
                transform: scale(1);
                box-shadow: 0 0 10px 2px var(--star-color), 0 0 20px 5px rgba(255, 255, 255, 0.4);
              }
              50% { 
                transform: scale(2);
                box-shadow: 0 0 30px 10px var(--star-color), 0 0 50px 20px rgba(255, 255, 255, 0.8);
              }
              100% { 
                transform: scale(1);
                box-shadow: 0 0 10px 2px var(--star-color), 0 0 20px 5px rgba(255, 255, 255, 0.4);
              }
            }
            
            .star {
              position: absolute;
              background-color: var(--star-color);
              border-radius: 50%;
              box-shadow: 0 0 10px 2px var(--star-color), 0 0 20px 5px rgba(255, 255, 255, 0.4);
              z-index: 2;
            }
            
            .star::before {
              content: '';
              position: absolute;
              top: -100%;
              left: -100%;
              right: -100%;
              bottom: -100%;
              border-radius: 50%;
              background: radial-gradient(circle, var(--star-color) 0%, rgba(255,255,255,0) 70%);
              opacity: 0.4;
            }
            
            .shooting-star {
              animation: shoot 3s forwards; /* Slower animation */
              z-index: 3;
            }
            
            .brightened-star {
              animation: brighten 2s ease-in-out;
              z-index: 4;
            }
            
            /* Cross shape for stars */
            .star::after {
              content: '';
              position: absolute;
              top: 50%;
              left: -50%;
              right: -50%;
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, var(--star-color) 50%, transparent 100%);
              box-shadow: 0 0 10px 1px var(--star-color);
              transform: rotate(45deg);
              opacity: 0.7;
            }
            
            /* Tail for shooting stars */
            .shooting-star::before {
              background: linear-gradient(to left, var(--star-color), transparent);
              opacity: 0.7;
              top: 0;
              left: -300%;
              right: 0;
              bottom: 0;
              border-radius: 0;
            }
            
            /* Floating animation for character */
            @keyframes float {
              0% {
                transform: translateY(0px) rotate(0deg);
              }
              25% {
                transform: translateY(-10px) rotate(1deg);
              }
              50% {
                transform: translateY(0px) rotate(0deg);
              }
              75% {
                transform: translateY(10px) rotate(-1deg);
              }
              100% {
                transform: translateY(0px) rotate(0deg);
              }
            }
            
            @keyframes subtle-drift {
              0% {
                transform: translate(0px, 0px);
              }
              33% {
                transform: translate(5px, -5px);
              }
              66% {
                transform: translate(-5px, 5px);
              }
              100% {
                transform: translate(0px, 0px);
              }
            }
            
            .floating {
              animation: float 8s ease-in-out infinite;
            }
            
            .drifting {
              animation: subtle-drift 15s ease-in-out infinite;
            }
            
            /* Pulsing glow effect */
            @keyframes glow-pulse {
              0% {
                opacity: 0.1;
                transform: scale(0.9);
              }
              50% {
                opacity: 0.3;
                transform: scale(1.1);
              }
              100% {
                opacity: 0.1;
                transform: scale(0.9);
              }
            }
            
            .glow-effect {
              animation: glow-pulse 8s ease-in-out infinite;
            }
            
            /* Space bubble animations */
            @keyframes space-float {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(var(--float-x1), var(--float-y1)) rotate(5deg); }
              50% { transform: translate(var(--float-x2), var(--float-y2)) rotate(-2deg); }
              75% { transform: translate(var(--float-x3), var(--float-y3)) rotate(3deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
            
            @keyframes bubble-wobble {
              0% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
              50% { border-radius: 40% 60% 70% 30% / 50% 60% 30% 60%; }
              100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
            }
            
            @keyframes mini-float {
              0% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(var(--mini-x), var(--mini-y)) scale(1.1); }
              100% { transform: translate(0, 0) scale(1); }
            }
            
            @keyframes bubble-pop {
              0% { 
                transform: scale(1);
                opacity: 1;
              }
              20% { 
                transform: scale(1.2);
                opacity: 1;
              }
              100% { 
                transform: scale(1.5);
                opacity: 0;
              }
            }
            
            .space-bubble {
              border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
              animation: space-float 12s ease-in-out infinite, bubble-wobble 8s ease-in-out infinite;
              background: linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(202,234,255,0.9) 50%, rgba(151,205,255,0.8) 100%);
              backdrop-filter: blur(5px);
              box-shadow: inset 0 0 15px rgba(255,255,255,0.8), 0 0 15px rgba(120,190,255,0.5);
              border: 1px solid rgba(255,255,255,0.6);
            }
            
            .mini-bubble {
              position: absolute;
              border-radius: 50%;
              animation: mini-float var(--bubble-speed) ease-in-out infinite;
              background: linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(202,234,255,0.7) 100%);
              box-shadow: inset 0 0 5px rgba(255,255,255,0.8), 0 0 8px rgba(120,190,255,0.3);
              border: 1px solid rgba(255,255,255,0.4);
            }
            
            .popping {
              animation: bubble-pop 1s forwards;
            }
            
            /* Custom rotating bubble animations */
            @keyframes rotate {
              0% { transform: rotate(1turn); }
            }
            
            @keyframes rotateBefore {
              0% { transform: rotate(-2turn); }
            }
            
            @keyframes rotateAfter {
              0% { transform: rotate(2turn); }
            }
            
            .custom-bubble {
              width: 200px;
              height: 200px;
              background: hsl(212, 100%, 71%);
              border: 18px solid hsl(212, 100%, 81%);
              position: relative;
              overflow: visible;
              border-radius: 48% 40% 62% 47% / 61% 49% 64% 43%;
              z-index: 1;
              margin: 0 auto;
            }
            
            .custom-bubble:before {
              content: '';
              position: absolute;
              top: 20px;
              left: 20px;
              width: calc(100% - 60px);
              height: calc(100% - 60px);
              background: hsl(212, 100%, 51%);
              border: 13px solid hsl(212, 100%, 61%);
              border-radius: 41% 40% 50% 55% / 49% 52% 51% 43%;
              z-index: -2;
              animation: rotateBefore 35s infinite linear;
            }
            
            .custom-bubble:after {
              content: '';
              position: absolute;
              top: 40px;
              left: 40px;
              width: calc(100% - 100px);
              height: calc(100% - 100px);
              background: hsl(212, 100%, 31%);
              border: 10px solid hsl(212, 100%, 41%);
              border-radius: 42% 63% 51% 60% / 47% 62% 42% 52%;
              animation: rotateAfter 35s infinite linear;
            }
          `}</style>

          {/* Render the stars */}
          {stars.map((star) => (
            <div
              key={star.id}
              className={`star ${star.shooting ? 'shooting-star' : ''} ${star.brightened || allStarsBrightened ? 'brightened-star' : ''}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                '--star-color': star.color,
                animation: star.shooting 
                  ? 'shoot 3s forwards' 
                  : (star.brightened || allStarsBrightened) 
                    ? 'brighten 2s ease-in-out' 
                    : `twinkle ${star.twinkleSpeed}s infinite ease-in-out`,
                '--move-x': `${star.shootingDirection.x * 300}px`,
                '--move-y': `${star.shootingDirection.y * 300}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Main content container with character and messages - moved down with more top margin */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row mt-20">
        {/* Character on the left side with floating animation */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center mt-8 md:mt-0">
          <div className="relative drifting mb-20"> {/* Added margin to move character down */}
            {/* Space bubbles above character */}
            <div className="absolute -top-30 left-0 right-0 flex flex-col items-center space-y-8">
              {/* First bubble */}
              <div className="relative w-64 h-32 flex items-center justify-center space-bubble"
                   style={{
                     '--float-x1': '10px',
                     '--float-y1': '-15px',
                     '--float-x2': '-15px',
                     '--float-y2': '5px',
                     '--float-x3': '5px',
                     '--float-y3': '-8px',
                   } as React.CSSProperties}>
                     
                {/* Mini decorative bubbles around the first bubble */}
                {bubbles.slice(0, 7).map((bubble) => (
                  <div 
                    key={`top-${bubble.id}`}
                    className={`mini-bubble ${bubble.popping ? 'popping' : ''}`}
                    style={{
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      left: `${50 + bubble.x}%`,
                      top: `${50 + bubble.y}%`,
                      '--bubble-speed': `${bubble.speed}s`,
                      '--mini-x': `${bubble.x / 2}px`,
                      '--mini-y': `${bubble.y / 2}px`,
                    } as React.CSSProperties}
                  />
                ))}
                
                <p className="text-center text-blue-900 font-medium px-6 z-10">
                  You know who your safe people are, right?
                </p>
              </div>
              
              {/* Second bubble */}
              <div className="relative w-72 h-40 flex items-center justify-center space-bubble"
                   style={{
                     '--float-x1': '-12px',
                     '--float-y1': '10px',
                     '--float-x2': '8px',
                     '--float-y2': '-12px',
                     '--float-x3': '-5px',
                     '--float-y3': '8px',
                   } as React.CSSProperties}>
                     
                {/* Mini decorative bubbles around the second bubble */}
                {bubbles.slice(7).map((bubble) => (
                  <div 
                    key={`bottom-${bubble.id}`}
                    className={`mini-bubble ${bubble.popping ? 'popping' : ''}`}
                    style={{
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      left: `${50 + bubble.x}%`,
                      top: `${(50 + bubble.y) - 0}%`,
                      '--bubble-speed': `${bubble.speed}s`,
                      '--mini-x': `${bubble.x / 2}px`,
                      '--mini-y': `${bubble.y / 2}px`,
                    } as React.CSSProperties}
                  />
                ))}
                
                <p className="text-center text-blue-900 font-medium px-6 z-10">
                  They are grown-ups who you know got your back no matter what.
                </p>
              </div>
            </div>
            
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 glow-effect -z-10"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-cyan-300 rounded-full blur-xl opacity-30 -z-10 glow-effect" 
                 style={{animationDelay: '-4s'}}></div>
            
            {/* Character with floating animation */}
            <div className="floating mt-38"> {/* Added margin-top to move character down */}
              <img 
                src="/character-in-space.gif" 
                alt="Character in space" 
                className="max-h-72 md:max-h-80 object-contain relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Messages section on the right side */}
        <div className="w-full md:w-2/3">

          {/* Message templates in chat bubbles */}
          <div className="flex flex-col items-center gap-8 max-w-md mx-auto mb-12">
            {messageTemplates.map((template) => (
              <div key={template.id} className="w-full">
                <div
                  className="bg-white rounded-2xl p-6 cursor-pointer shadow-md transition-all hover:shadow-lg hover:scale-105 relative overflow-hidden border-2 border-transparent hover:border-blue-400"
                  onClick={() => copyToClipboard(template.text)}
                >
                  <div className="flex items-start gap-4">
                    <div>
                      <p className="text-base text-gray-800">{template.text}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                        <Copy size={14} />
                        <span>Tap to copy</span>
                      </div>
                    </div>
                  </div>

                  {selectedTemplate === template.text && (
                    <div className="absolute inset-0 bg-green-500/90 rounded-2xl flex items-center justify-center text-white">
                      <div className="flex flex-col items-center">
                        <CheckCircle size={32} />
                        <span className="mt-1 font-medium">Copied!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom rotating bubble for send visualization */}
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 text-center z-50">
  <div className="custom-bubble flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="text-white font-medium text-center p-2 max-w-[300px]">
        <p>Tap to copy and paste it to whoever you want help from, whenever you ready</p>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default SafePeople;