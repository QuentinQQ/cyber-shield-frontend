import { useState } from 'react';
import { Copy, CheckCircle, Heart, Send, Smile, Users, MessageCircle } from 'lucide-react';

interface MessageTemplate {
  id: number;
  text: string;
  emoji: string;
}

const SafePeople = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [activeSection, setActiveSection] = useState<'people' | 'messages'>('people');
  const [showConfetti, setShowConfetti] = useState(false);

  const messageTemplates: MessageTemplate[] = [
    {
      id: 1,
      emoji: "😓",
      text: "Hey, something's happening online and I don't really know what to do. It's kinda overwhelming and I feel like I'm losing control. I think I need your help."
    },
    {
      id: 2,
      emoji: "🤔",
      text: "Hey, I'm dealing with something online and it's getting a bit too much. I've tried handling it on my own but I'm kinda stuck. Can I talk to you about it?"
    }
  ];

  const safePeople = [
    {
      id: 1,
      title: "Parents",
      description: "They love you and want to keep you safe",
      color: "bg-purple-400",
      icon: <Heart size={40} color="white" />
    },
    {
      id: 2,
      title: "Teachers",
      description: "Your favorite teacher always has your back",
      color: "bg-blue-400",
      icon: <Users size={40} color="white" />
    },
    {
      id: 3,
      title: "Trusted Friend",
      description: "Someone you know will listen without judgment",
      color: "bg-green-400",
      icon: <Smile size={40} color="white" />
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSelectedTemplate(text);
    setShowConfetti(true);

    setTimeout(() => {
      setSelectedTemplate('');
      setShowConfetti(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 to-blue-200 min-h-screen p-8">
      {/* Fun animated header with button resembling the image */}
      <header className="flex justify-center items-center mb-12 pt-8">
        <style>{`
          @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(-1deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(1deg); }
            100% { transform: rotate(0deg); }
          }
          .shake-animate:hover {
            animation: shake 0.5s infinite;
          }
        `}</style>
        <button
          className="bg-[#c2e764] text-black font-bold text-xl py-4 px-10 rounded-full shadow-lg transform -rotate-2 hover:scale-105 transition-transform duration-300 shake-animate"
        >
          <span className="animate-pulse">🆘</span>
          <span className="mx-2">Get Help Now</span>
          <span className="animate-pulse">🆘</span>
        </button>
      </header>

      {/* Navigation button - replaces the toggle */}
      <div className="flex justify-center mb-10">
        {activeSection === 'people' ? (
          <button
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-md flex items-center gap-2 mx-auto"
            onClick={() => setActiveSection('messages')}
          >
            <MessageCircle size={20} />
            Next: Get Help Messages
          </button>
        ) : (
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-md flex items-center gap-2 mx-auto"
            onClick={() => setActiveSection('people')}
          >
            <Users size={20} />
            Back to Safe People
          </button>
        )}
      </div>

      {/* Conditionally render sections */}
      {activeSection === 'people' ? (
        <>
          {/* Main title with emoji and smaller text */}
          <h1 className="text-2xl md:text-3xl text-center mb-4 font-bold text-gray-800 flex items-center justify-center gap-2">
            <span>Your Safe People</span> <span className="text-3xl">🛡️</span>
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto">
            These are the people who've got your back when things get tough online
          </p>

          {/* People circles with icons and hover effects - more spread out */}
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mb-16">
            {safePeople.map(person => (
              <div key={person.id} className="relative flex flex-col items-center group my-4">
                <div className={`${person.color} rounded-full w-32 h-32 md:w-40 md:h-40 shadow-md flex items-center justify-center transition-transform group-hover:scale-110 cursor-pointer`}>
                  {person.icon}
                </div>
                <div className="absolute -bottom-4 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full py-2 px-4 text-black font-medium shadow-sm group-hover:bg-orange-500 transition-colors">
                  {person.title}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-black text-white p-2 rounded text-sm">
                  {person.description}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Message section */}
          <h1 className="text-2xl md:text-3xl text-center mb-4 font-bold text-gray-800 flex items-center justify-center gap-2">
            <span>Ready-to-Send Messages</span> <span className="text-3xl">💬</span>
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto">
            Tap a message to copy it, then paste it to whoever you need help from
          </p>

          {/* Message templates in chat bubbles - more vertically spaced */}
          <div className="flex flex-col items-center gap-8 max-w-md mx-auto mb-16">
            {messageTemplates.map((template) => (
              <div key={template.id} className="w-full">
                <div
                  className="bg-white rounded-2xl p-6 cursor-pointer shadow-md transition-all hover:shadow-lg hover:scale-102 relative overflow-hidden border-2 border-transparent hover:border-blue-400"
                  onClick={() => copyToClipboard(template.text)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{template.emoji}</div>
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

          {/* Send visualization */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-pulse">
                <Send size={20} className="text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Send your message when you're ready</p>
            </div>
          </div>
        </>
      )}

      {/* Confetti effect when copying */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-1/4 animate-fall-slow text-2xl">🎉</div>
          <div className="absolute top-0 left-1/2 animate-fall-medium text-2xl">🎊</div>
          <div className="absolute top-0 right-1/4 animate-fall-fast text-2xl">🎉</div>
          <div className="absolute top-0 left-1/3 animate-fall-slow text-2xl delay-300">🎊</div>
          <div className="absolute top-0 right-1/3 animate-fall-medium text-2xl delay-150">🎉</div>
        </div>
      )}
    </div>
  );
};

export default SafePeople;