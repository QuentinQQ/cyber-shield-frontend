import { useState } from 'react';

interface MessageTemplate {
  id: number;
  text: string;
}

const SafePeople = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const messageTemplates: MessageTemplate[] = [
    {
      id: 1,
      text: "Hey, something's happening online and I don't really know what to do. It's kinda overwhelming and I feel like I'm losing control. I think I need your help."
    },
    {
      id: 2,
      text: "Hey, I'm dealing with something online and it's getting a bit too much. I've tried handling it on my own but I'm kinda stuck. Can I talk to you about it?"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSelectedTemplate(text);
    setTimeout(() => setSelectedTemplate(''), 2000);
  };

  return (
    <div className="bg-sky-200 min-h-screen p-4">
      {/* Header with shaking button */}
      <header className="flex justify-center items-center mb-8">
        <button className="bg-orange-300 rounded-full py-2 px-8 text-black text-2xl cursor-pointer hover:animate-shake transition-transform hover:scale-105">
          Don't Wait, Get Help
        </button>
      </header>

      {/* Main title */}
      <h1 className="text-3xl text-center mb-6 font-semibold text-gray-800">
        Let's see who are the safe people in your life 😊
      </h1>

      {/* People circles */}
      <div className="flex flex-wrap justify-center items-center gap-12 mb-12">
        <div className="relative flex flex-col items-center">
          <div className="bg-purple-300 rounded-full w-40 h-40 shadow-md"></div>
          <div className="absolute -bottom-4 bg-orange-400 rounded-full py-2 px-4 text-black font-medium shadow-sm">
            Parents who love you so much
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="bg-purple-300 rounded-full w-40 h-40 shadow-md"></div>
          <div className="absolute -bottom-4 bg-orange-400 rounded-full py-2 px-4 text-black font-medium shadow-sm">
            Your favorite teacher
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="bg-purple-300 rounded-full w-40 h-40 shadow-md"></div>
          <div className="absolute -bottom-4 bg-orange-400 rounded-full py-2 px-4 text-black font-medium shadow-sm">
            Someone you trust so much
          </div>
        </div>
      </div>

      {/* Help message box */}
      <div className="bg-blue-100 rounded-xl p-6 shadow-lg max-w-4xl mx-auto mb-10">
        <p className="text-lg text-gray-700 leading-relaxed">
          Feeling stuck and need a hand? Don't stress! Here are some easy ways to ask for help. 
          Just pick your fave, copy, and paste! You've got this, and I'm cheering you on!
        </p>
      </div>

      {/* Message templates */}
      <div className="flex flex-wrap justify-center gap-8">
        {messageTemplates.map((template) => (
          <div key={template.id} className="relative w-full sm:w-auto">
            <div className="bg-orange-400 rounded-full py-1 px-3 text-black inline-flex items-center mb-2">
              Just copy and paste <span className="ml-2">→</span>
            </div>
            <div 
              className="bg-green-300 max-w-sm min-h-[14rem] rounded-xl p-4 cursor-pointer shadow-md transition hover:bg-green-200 relative"
              onClick={() => copyToClipboard(template.text)}
            >
              <p className="text-base text-gray-800">{template.text}</p>
              {selectedTemplate === template.text && (
                <div className="absolute inset-0 bg-green-500/30 rounded-xl flex items-center justify-center">
                  <span className="bg-white px-3 py-1 rounded shadow">Copied!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafePeople;