import React, { useState, useEffect, useCallback } from "react";
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
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, animationDuration: number}>>([]);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);
  
  // Generate stars for the background
  useEffect(() => {
    const generateStars = () => {
      const numberOfStars = 100;
      const newStars = [];
      
      for (let i = 0; i < numberOfStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // % position
          y: Math.random() * 100, // % position
          size: Math.random() * 0.3 + 0.1, // rem size (0.1-0.4rem)
          opacity: Math.random() * 0.7 + 0.3, // opacity between 0.3-1
          animationDuration: Math.random() * 3 + 2 // 2-5 seconds
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);

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

  // CSS for star animation
  const starStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 0,
    pointerEvents: "none"
  } as React.CSSProperties;
  
  // Render the stars
  const StarryBackground: React.FC = () => (
    <div style={starStyles}>
      {stars.map(star => (
        <div 
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s infinite alternate`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: ${Math.random() * 0.3 + 0.1}; }
          100% { opacity: ${Math.random() * 0.7 + 0.3}; }
        }
      `}</style>
    </div>
  );

  const MobileView: React.FC = () => (
    <div className="p-4 bg-gradient-to-b from-[#0064C5] to-[#1E90FF] min-h-screen relative overflow-hidden">
      <StarryBackground />
      <div className="text-center text-white mb-6 relative z-10">
        <h1 className="text-3xl font-bold">Get Help</h1>
        <p className="text-lg">We're here for you whenever you need support</p>
      </div>
      
      {HELP_STEPS.map((step, index) => (
        <div
          key={step.id}
          className={`${step.color} ${step.borderColor} border rounded-lg mb-4 transition-all`}
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
              {step.content.map(renderContentItem)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const DesktopView: React.FC = () => {
    const topRowSteps = HELP_STEPS.slice(0, 3);
    const bottomRowSteps = HELP_STEPS.slice(3);

    return (
      <div className="bg-gradient-to-b from-[#0064C5] to-[#1E90FF] min-h-screen p-8 text-black relative overflow-hidden">
        <StarryBackground />
        <div className="text-center text-white mb-10 relative z-10">
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
              className={`w-full ${HELP_STEPS[activeStep].buttonColor} text-white p-3 rounded-t-lg font-medium flex justify-between items-center transition-colors`}
            >
              <span>More About {HELP_STEPS[activeStep].title}</span>
              {showDetails ? <ChevronUp /> : <ChevronDown />}
            </button>

            {showDetails && (
              <div className="bg-white rounded-b-lg p-6 shadow-lg animate-fadeIn">
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

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default GetHelp;