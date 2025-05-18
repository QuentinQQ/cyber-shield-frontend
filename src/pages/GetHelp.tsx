import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Phone,
  Heart,
  School,
  UserCheck,
  MonitorSmartphone,
  Shield,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { TeleportBubble } from "@/components/TeleportBubble";
import { useNavigate } from "react-router-dom";

interface ContentItem {
  label: string;
  type?: "link";
  href?: string;
}

interface HelpStep {
  id: string;
  icon: React.ReactNode;
  emoji: string;
  title: string;
  subtitle: string;
  content: ContentItem[];
  color: string;
  borderColor: string;
  textColor: string;
  buttonColor: string;
}

interface HelpCardProps {
  step: HelpStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const HELP_STEPS: HelpStep[] = [
  {
    id: "emergency",
    icon: <Phone className="text-red-500" size={24} />,
    emoji: "🚨",
    title: "Emergency Help",
    subtitle: "When you need help right away",
    content: [
      { label: "Call 000 for any dangerous situation" },
      { label: "Tell a trusted adult immediately" },
    ],
    color: "bg-red-100",
    borderColor: "border-red-300",
    textColor: "text-red-700",
    buttonColor: "bg-red-600 hover:bg-red-700",
  },
  {
    id: "talk",
    icon: <Heart className="text-pink-500" size={24} />,
    emoji: "💬",
    title: "Talk to Someone",
    subtitle: "When you're feeling sad or worried",
    content: [
      { label: "Call Kids Helpline: 1800 55 1800" },
      { label: "Text Lifeline: 0477 13 11 14" },
      {
        label: "Chat online with Lifeline",
        type: "link",
        href: "https://www.lifeline.org.au/crisis-chat/",
      },
    ],
    color: "bg-pink-100",
    borderColor: "border-pink-300",
    textColor: "text-pink-700",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    id: "stress",
    icon: <UserCheck className="text-purple-500" size={24} />,
    emoji: "😔",
    title: "Feeling Stressed?",
    subtitle: "Get support for your mental health",
    content: [
      { label: "Talk to Kids Helpline: 1800 55 1800" },
      {
        label: "Visit Headspace Website",
        type: "link",
        href: "https://headspace.org.au",
      },
      {
        label: "Check out ReachOut's tips",
        type: "link",
        href: "https://au.reachout.com/",
      },
    ],
    color: "bg-purple-100",
    borderColor: "border-purple-300",
    textColor: "text-purple-700",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    id: "bullying",
    icon: <School className="text-blue-500" size={24} />,
    emoji: "👊",
    title: "School Bullying",
    subtitle: "Help with problems at school",
    content: [
      { label: "Talk to a teacher you trust" },
      { label: "Visit your school counselor" },
      { label: "Ask parents to contact the principal" },
    ],
    color: "bg-blue-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    id: "online",
    icon: <MonitorSmartphone className="text-green-500" size={24} />,
    emoji: "💻",
    title: "Online Bullying",
    subtitle: "Help with social media & online problems",
    content: [
      {
        label: "Report on Instagram",
        type: "link",
        href: "https://help.instagram.com/",
      },
      {
        label: "Report on TikTok",
        type: "link",
        href: "https://www.tiktok.com/safety",
      },
      {
        label: "Report on YouTube",
        type: "link",
        href: "https://support.google.com/youtube/answer/2802268",
      },
      {
        label: "Report on Snapchat",
        type: "link",
        href: "https://support.snapchat.com/",
      },
      {
        label: "Report to eSafety Commissioner",
        type: "link",
        href: "https://www.esafety.gov.au/report",
      },
    ],
    color: "bg-green-100",
    borderColor: "border-green-300",
    textColor: "text-green-700",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    id: "discrimination",
    icon: <Shield className="text-yellow-500" size={24} />,
    emoji: "✊",
    title: "Being Treated Unfairly?",
    subtitle: "Help with discrimination",
    content: [
      { label: "Talk to a trusted adult or teacher" },
      { label: "Contact Kids Helpline: 1800 55 1800" },
      {
        label: "Visit Human Rights Commission",
        type: "link",
        href: "https://humanrights.gov.au",
      },
    ],
    color: "bg-yellow-100",
    borderColor: "border-yellow-300",
    textColor: "text-yellow-700",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700",
  },
];

const MOBILE_BREAKPOINT = 768;

const GetHelp: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const handleTeleportBack = () => {
    navigate(-1);
  };

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  // Confetti animation function
  const startConfetti = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Colors for confetti
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', 
      '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
      '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
    ];
    
    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      rotation: number;
      shape: string;
    }> = [];
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 6.28,
        rotation: Math.random() * 0.2 - 0.1,
        shape: Math.random() > 0.5 ? 'square' : 'circle'
      });
    }
    
    // Animation function
    let animationFrame: number;
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.y += p.speed;
        p.angle += p.rotation;
        
        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        
        if (p.shape === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
        
        // Reset particles that fall off screen
        if (p.y > canvas.height) {
          p.y = Math.random() * -100;
          p.x = Math.random() * canvas.width;
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // After 2 seconds, stop animation
    setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000); // Changed from 2000 to 5000 ms (5 seconds duration)
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Start confetti on component mount
    startConfetti();
    
    // Set interval for confetti every 8 seconds
    confettiIntervalRef.current = setInterval(() => {
      startConfetti();
    }, 8000);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
      }
    };
  }, [checkMobile, startConfetti]);

  const handleCardClick = (index: number) => {
    if (activeStep === index) {
      // If clicking the already active card, close it
      setActiveStep(null);
      setShowDetails(false);
    } else {
      // If clicking a different card, open it
      setActiveStep(index);
      setShowDetails(true); // Automatically show details when opening a card
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderContentItem = (item: ContentItem, index: number) => {
    if (item.type === "link") {
      return (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline flex items-center hover:text-blue-800 transition-colors"
        >
          {item.label}
          <ExternalLink size={14} className="ml-1" />
        </a>
      );
    }
    return <p key={index} className="mb-2">{item.label}</p>;
  };

  // Character Dialog Component from ScenarioGame
  interface CharacterDialogProps {
    content: React.ReactNode;
    isVisible: boolean;
    className?: string;
    customStyle?: React.CSSProperties;
  }

  const CharacterDialog: React.FC<CharacterDialogProps> = ({ content, isVisible, className = "", customStyle = {} }) => {
    return isVisible ? (
      <div
        className={`speech-bubble relative ${className}`}
        style={{
          position: "relative",
          margin: "0.5em 0",
          padding: "1em",
          width: "15em", 
          minHeight: "4em",
          borderRadius: "0.25em",
          transform: "rotate(-4deg) rotateY(15deg)",
          background: "#629bdd",
          fontFamily: "Century Gothic, Verdana, sans-serif",
          fontSize: "1.5rem",
          textAlign: "center",
          zIndex: 2,
          ...customStyle,
        }}
      >
        {/* Content */}
        <div 
          className="text-lg font-medium text-gray-800 z-10 relative"
          style={{ position: "relative", zIndex: 5 }}
        >
          {content}
        </div>
      </div>
    ) : null;
  };

  // Character animation component
  const CharacterAnimation = () => {
    const [showSpeechBubble, setShowSpeechBubble] = useState(true);
    
    // Hide speech bubble after 5 seconds when component mounts
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSpeechBubble(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }, []);
    
    // Handle character click to show speech bubble again
    const handleCharacterClick = () => {
      setShowSpeechBubble(true);
      
      // Hide speech bubble again after 5 seconds
      const timer = setTimeout(() => {
        setShowSpeechBubble(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    };
    
    return (
      <div className="absolute left-0 top-55 z-20">
        <style>{`
          /* Global styles for the speech bubble */
          .speech-bubble:before, .speech-bubble:after {
            position: absolute;
            z-index: -1;
            content: '';
          }
          
          .speech-bubble:after {
            top: 0; 
            right: 0; 
            bottom: 0; 
            left: 0;
            border-radius: inherit;
            transform: rotate(2deg) translate(.35em, -.15em) scale(1.02);
            background: #f4fbfe;
          }
          
          .speech-bubble:before {
            border: solid 0 transparent;
            border-right: solid 3.5em #f4fbfe;
            border-bottom: solid .25em #629bdd;
            bottom: .25em; 
            left: 1.25em;
            width: 0; 
            height: 1em;
            transform: rotate(45deg) skewX(75deg);
          }
        `}</style>
        
       {showSpeechBubble && (
          <CharacterDialog
            content={
              <div className="flex flex-col items-center space-y-1">
                <div className="text-xl font-extrabold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                    Good on ya!
                  </span> 
                  <span className="text-yellow-400">🌟</span>
                </div>
                <div>
                  <span className="text-blue-500 font-bold">Finished the trek like a champion!</span> 
                </div>
                <div className="text-amber-600 text-sm mt-1">
                  Need more help? Check out these legends below!
                </div>
              </div>
            }
            isVisible={true}
            className="ml-4"
            customStyle={{
              top: "-100px",
              left: "40px",
              position: "absolute",
              width: "18em",
              padding: "1.2em 1em",
              background: "linear-gradient(145deg, #6ea5e3, #5e90c9)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          />
        )}
        
        
        <img 
          src="/gethelp-char.gif" 
          alt="Helper character" 
          className="h-80 md:h-105 cursor-pointer"
          onClick={handleCharacterClick}
        />
      </div>
    );
  };

  const MobileView: React.FC = () => (
    <div 
      style={{
        backgroundImage: "url('/gethelp-screen.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      className="min-h-screen relative p-4"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/gethelp-screen.png')", zIndex: 0 }}
      ></div>
      
      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
      
      {/* Character animation */}
      <CharacterAnimation />

      
      <div className="pb-40"> {/* Added padding at the bottom to make room for the character */}
        {HELP_STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`${step.color} ${step.borderColor} border rounded-lg mb-4 transition-all relative z-10`}
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2 mr-3">{step.icon}</div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.subtitle}</p>
                </div>
              </div>
              {activeStep === index ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {activeStep === index && (
              <div className="p-4 pt-0 space-y-2">
                {step.content.map((item, i) => renderContentItem(item, i))}
              </div>
            )}
          </div>
        ))}
      </div>
      <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" />
    </div>
  );

  const DesktopView: React.FC = () => {
    const topRowSteps = HELP_STEPS.slice(0, 3);
    const bottomRowSteps = HELP_STEPS.slice(3);

    return (
      <div 
        style={{
          backgroundImage: "url('/gethelp-screen.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        className="min-h-screen relative p-8"
      >
        {/* Confetti canvas */}
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
        
        {/* Character animation */}
        <CharacterAnimation />
        
        <div className="text-center text-Black mb-10 relative z-10">
          <h1 className="text-4xl font-bold">Get Help</h1>
          <p className="text-lg">We're here for you whenever you need support</p>
        </div>

        {/* Cards in two rows */}
        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Top row */}
          <div className="flex justify-center gap-6">
            {topRowSteps.map((step, index) => (
              <HelpCard 
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === index}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          
          {/* Bottom row */}
          <div className="flex justify-center gap-6">
            {bottomRowSteps.map((step, index) => {
              const actualIndex = index + 3;
              return (
                <HelpCard 
                  key={step.id}
                  step={step}
                  index={actualIndex}
                  isActive={activeStep === actualIndex}
                  onClick={() => handleCardClick(actualIndex)}
                />
              );
            })}
          </div>
        </div>

        {/* Details Panel - only show if a card is active */}
        {activeStep !== null && (
          <div className="mt-12 max-w-3xl mx-auto">
            <button
              onClick={toggleDetails}
              className={`w-full ${HELP_STEPS[activeStep].buttonColor} text-white p-3 rounded-t-lg font-medium flex justify-between items-center transition-colors relative z-10`}
            >
              <span>More About {HELP_STEPS[activeStep].title}</span>
              {showDetails ? <ChevronUp /> : <ChevronDown />}
            </button>

            {showDetails && (
              <div className="bg-white rounded-b-lg p-6 shadow-lg relative z-10">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${HELP_STEPS[activeStep].color} mr-4`}
                  >
                    {HELP_STEPS[activeStep].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {HELP_STEPS[activeStep].title}
                    </h2>
                    <p className="text-gray-600">
                      {HELP_STEPS[activeStep].subtitle}
                    </p>
                  </div>
                </div>

                <p className={`${HELP_STEPS[activeStep].textColor} mb-4`}>
                  Getting help for {HELP_STEPS[activeStep].title.toLowerCase()} is
                  important. Here are resources that can support you:
                </p>

                <ul
                  className={`${HELP_STEPS[activeStep].color} p-4 rounded-lg space-y-2`}
                >
                  {HELP_STEPS[activeStep].content.map((item, i) => (
                    <li key={i} className="ml-4 pl-2">
                      {renderContentItem(item, i)}
                    </li>
                  ))}
                  <li className="ml-4 pl-2 font-medium">
                    Remember you're not alone - there are people who care and want to
                    help.
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" />
      </div>
    );
  };

  const HelpCard: React.FC<HelpCardProps> = ({ step, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer w-64 flex-shrink-0 rounded-lg p-4 border-2 ${step.borderColor} ${step.color} shadow-md transition-all duration-300 hover:scale-105 ${
        isActive ? "border-4 border-blue-500 scale-105" : ""
      }`}
    >
      <div className="bg-white p-2 rounded-full mb-2 w-fit mx-auto">
        {step.icon}
      </div>
      <h3 className="font-bold text-center">{step.title}</h3>
      <p className="text-sm text-center text-gray-600">{step.subtitle}</p>
    </div>
  );

  return (
    <div className="relative">
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};

export default GetHelp;