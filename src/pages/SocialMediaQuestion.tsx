import React from 'react';
import { TeleportBubble } from "@/components/TeleportBubble";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        { text: "Did you know that in Australia, 37% of kids using Facebook have experienced cyberbullying?", color: "#D32F2F", delay: 4000 },
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
        { text: "I didn’t expect it, but 31% of Aussie teens have been bullied on this app.", color: "#D32F2F", delay: 4000 },
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
      }, 19000);
    }
  }, [showResult, selected]);


  useEffect(() => {
  if (showResult && selected === "whatsapp") {
    const textSequence: TextItem[] = [
      { text: "Group chats, stickers, and endless messages? Yep, this one’s for me.", color: " #1e3a8a", delay: 0 },
      { text: "Okay… just found out that 18% of kids have been targeted in chats. Not so friendly after all.", color: "#D32F2F ", delay: 4000 },
      { text: "And it gets worse — nearly 1 in 5 teens have seen bullying here, even if it wasn’t about them.", color: "#A349A4", delay: 8300 },
      { text: "Guess bullying can hide anywhere — even in everyday apps like this — speak up if you see it.", color: "#1e3a8a", delay: 14000 }
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
      { text: "Whoa… 34% of teens got bullied on Snapchat? That’s way more than I expected.", color: "#D32F2F", delay: 4000 },
      { text: "Okay… not just fun and filters.", color: "#1e3a8a", delay: 8300 },
      { text: "Makes sense. Use it, enjoy it — but speak up if it crosses the line. Staying silent just lets it keep going", color: "#1e3a8a", delay: 11000 }
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
    }, 16000);
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
        {/* <select
            className="p-2 rounded text-blue-900 font-semibold"
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="snapchat">Snapchat</option>
          </select> */}
          <Select onValueChange={(value) => setSelected(value)}>
            <SelectTrigger className="w-[200px] bg-white text-blue-900 font-semibold">
              <SelectValue placeholder="-- Choose --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="snapchat">Snapchat</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            className={[
              'relative font-bold rounded-full px-8 py-1 shadow-lg z-10',
              'bg-[#C2E764] text-black -rotate-6 hover:rotate-0',
              !selected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            ].join(' ')}
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
