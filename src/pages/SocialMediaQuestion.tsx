import React from 'react';
import { TeleportBubble } from "@/components/TeleportBubble";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TextItem {
  text: string;
  color: string;
  delay: number;
}

const SocialMediaQuestion: React.FC = () => {
  const [selected, setSelected] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("white");
  const [gifKey, setGifKey] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (showResult && selected === "facebook") {
      const textSequence: TextItem[] = [
        { text: "A lot of my friends said Facebook was cool… I want to download this one!", color: " #1e3a8a", delay: 0 },
        { text: "Did you know that in Australia, 37% of kids using Facebook have experienced cyberbullying?", color: "red", delay: 4000 },
        { text: "And 47% — almost half — have seen it happen to someone else.", color: "#A349A4", delay: 8300 },
        { text: "Just because Facebook is popular doesn’t mean it’s always safe — use it wisely.", color: "#1e3a8a", delay: 12000 },
        { text: "If something feels wrong, report it and say someone you trust. Don’t stay silent.", color: "#1e3a8a", delay: 15000 }
      ];

      textSequence.forEach(({ text, color, delay }) => {
        setTimeout(() => {
          setCurrentText(text);
          setTextColor(color);
        }, delay);
      });

      setTimeout(() => {
        setShowResult(false);
        setCurrentText("");
        setSelected("");
      }, 19000);
    }
  }, [showResult, selected]);

  useEffect(() => {
    if (showResult && selected === "instagram") {
      const textSequence: TextItem[] = [
        { text: "Instagram looks fun! Time to install it and check it out!", color: " #1e3a8a", delay: 0 },
        { text: "I didn’t expect it, but 31% of Aussie teens have been bullied on this app.", color: "red", delay: 4000 },
        { text: "34% of kids saw others being bullied — and many didn’t know what to do.", color: "#A349A4", delay: 8300 },
        { text: "Social media isn’t bad — but silence can be. ", color: "#1e3a8a", delay: 12000 },
        { text: "You’re not alone. There are tools to help — and people who care.", color: "#1e3a8a", delay: 15000 }
      ];

      textSequence.forEach(({ text, color, delay }) => {
        setTimeout(() => {
          setCurrentText(text);
          setTextColor(color);
        }, delay);
      });

      setTimeout(() => {
        setShowResult(false);
        setCurrentText("");
        setSelected("");
      }, 18000);
    }
  }, [showResult, selected]);


  useEffect(() => {
  if (showResult && selected === "whatsapp") {
    const textSequence: TextItem[] = [
      { text: "Texting, chatting, sharing memes? Sounds fun — I want this one!", color: " #1e3a8a", delay: 0 },
      { text: "Chats aren’t always friendly. 18% of kids have been targeted here.", color: "red", delay: 4000 },
      { text: "Nearly 1 in 5 teens witnessed bullying in chats — even if it wasn’t about them.", color: "#A349A4", delay: 8300 },
      { text: "Even in simple apps like WhatsApp, bullying can hide — speak up if you see it.", color: "#1e3a8a", delay: 12000 },
      { text: "It’s okay to talk about it. That’s how things get better.", color: "#1e3a8a", delay: 16000 }
    ];

    textSequence.forEach(({ text, color, delay }) => {
      setTimeout(() => {
        setCurrentText(text);
        setTextColor(color);
      }, delay);
    });

    setTimeout(() => {
      setShowResult(false);
      setCurrentText("");
      setSelected("");
    }, 18000);
  }
}, [showResult, selected]);

useEffect(() => {
  if (showResult && selected === "snapchat") {
    const textSequence: TextItem[] = [
      { text: "Let’s see what the filters do to my antenna!", color: " #1e3a8a", delay: 0 },
      { text: "Snapchat’s fast, but bullying still finds its way. 34% experienced it.", color: "red", delay: 4000 },
      { text: "More kids in Australia saw bullying on Snapchat than in most other countries", color: "#1e3a8a", delay: 8300 },
      { text: "Snapchat can be fun — but if something feels off, report it.", color: "#1e3a8a", delay: 12000 },
      { text: "This doesn't mean you need to stop using it. Just remember, even cool apps need safe habits.", color: "#1e3a8a", delay: 15000 }
    ];

    textSequence.forEach(({ text, color, delay }) => {
      setTimeout(() => {
        setCurrentText(text);
        setTextColor(color);
      }, delay);
    });

    setTimeout(() => {
      setShowResult(false);
      setCurrentText("");
      setSelected("");
    }, 18000);
  }
}, [showResult, selected]);

  // Navigation handler for teleport button
  const handleTeleportToNext = () => {
    navigate("/story");
  };

  const handleTeleportToBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start relative"
      style={{ backgroundImage: "url('/space1.png')" }}
    >
      {!showResult && (
        <img
          src="/gleepo1.gif"
          alt="Gleepo"
          className="absolute bottom-4 left-4 w-130 h-130"
        />
      )}

      <h1 className="pt-10 text-white text-3xl font-bold text-center">
        <span className="bg-blue-900 bg-opacity-90 px-4 py-1 rounded">
          What is your favorite social media platform?
        </span>
      </h1>

      {!showResult && (
        <div className="flex flex-col items-center mt-4 bg-cyan-300 bg-opacity-80 p-4 rounded z-10">
        <select
            className="p-2 rounded text-blue-900 font-semibold"
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="snapchat">Snapchat</option>
          </select>
          <button
          className="mt-4 px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={!selected}
          onClick={() => {
            setShowResult(false);
            setCurrentText("");
            setGifKey(Date.now());
            setTimeout(() => setShowResult(true), 20);
          }}
          >
            Show
          </button>
        </div>
      )}

      {showResult && selected === "facebook" && (
        <div className="flex items-start justify-center h-full pt-20 gap-8">
        <img key={gifKey} src={`/facebook1.gif?${gifKey}`} alt="Facebook" className="w-[41rem] h-[41rem] object-contain translate-x-[-3cm]" />
        <div className="bg-cyan-300 bg-opacity-90 p-4 rounded w-[28rem] text-2xl fixed" style={{ top: "calc(50% - 1cm)", right: "6%" }}
    >
            <p style={{ color: textColor, fontWeight: 'bold' }}>{currentText}</p>
          </div>
        </div>
      )}


      {showResult && selected === "instagram" && (
        <div className="flex items-start justify-center h-full pt-20 gap-8">
        <img key={gifKey} src={`/insta1.gif?${gifKey}`} alt="Instagram" className="w-[41rem] h-[41rem] object-contain translate-x-[-3cm]" />
        <div className="bg-cyan-300 bg-opacity-90 p-4 rounded w-[28rem] text-2xl fixed" style={{ top: "calc(50% - 1cm)", right: "6%" }}
    >
            <p style={{ color: textColor, fontWeight: 'bold' }}>{currentText}</p>
          </div>
        </div>
      )}

        {showResult && selected === "whatsapp" && (
        <div className="flex items-start justify-center h-full pt-20 gap-8">
        <img key={gifKey} src={`/whatsapp1.gif?${gifKey}`} alt="WhatsApp" className="w-[41rem] h-[41rem] object-contain translate-x-[-3cm]" />
        <div className="bg-cyan-300 bg-opacity-90 p-4 rounded w-[28rem] text-2xl fixed" style={{ top: "calc(50% - 1cm)", right: "6%" }}
    >
            <p style={{ color: textColor, fontWeight: 'bold' }}>{currentText}</p>
          </div>
        </div>
      )}

        {showResult && selected === "snapchat" && (
        <div className="flex items-start justify-center h-full pt-20 gap-8">
        <img key={gifKey} src={`/snapchat1.gif?${gifKey}`} alt="WhatsApp" className="w-[41rem] h-[41rem] object-contain translate-x-[-3cm]" />
        <div className="bg-cyan-300 bg-opacity-90 p-4 rounded w-[28rem] text-2xl fixed" style={{ top: "calc(50% - 1cm)", right: "6%" }}
    >
            <p style={{ color: textColor, fontWeight: 'bold' }}>{currentText}</p>
          </div>
        </div>
      )}

{/* Teleport Bubble */}
      <TeleportBubble onClick={handleTeleportToNext} color="blue" position="right" text='Voices'/>
      <TeleportBubble onClick={handleTeleportToBack} color="purple" position="left" text='Back'/>
    </div>
  );
}

export default SocialMediaQuestion;
