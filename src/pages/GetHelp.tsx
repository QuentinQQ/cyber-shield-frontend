import React, { useState } from 'react';
import HelpCard from '../components/HelpCard';
import { motion } from 'framer-motion';

const GetHelp = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const helpDetails = [
    {
      icon: "🚨",
      title: "Immediate Danger?",
      details: [{ label: "Call 000 for emergencies." }],
    },
    {
      icon: "💬",
      title: "Feeling Down? Reach Out",
      details: [
        { label: "Call Lifeline: 13 11 14" },
        { label: "Text Lifeline: 0477 13 11 14" },
        { label: "Chat online with Lifeline", type: "link", href: "https://www.lifeline.org.au/crisis-chat/" },
      ],
    },
    {
      icon: "😔",
      title: "Not Feeling Like Yourself?",
      details: [
        { label: "Find a local counselor or contact Kids Helpline: 1800 55 1800." },
        { label: "Explore Headspace: 1800 650 890", type: "link", href: "https://headspace.org.au" },
        { label: "Visit ReachOut", type: "link", href: "https://au.reachout.com/" },
      ],
    },
    {
      icon: "👊",
      title: "Getting Bullied at School?",
      details: [
        { label: "Talk to a teacher or school counselor." },
        { label: "Contact the school principal." },
        { label: "Reach Department of Education", type: "link", href: "https://www.education.gov.au/" },
      ],
    },
    {
      icon: "💻",
      title: "Cyberbullying Online?",
      details: [
        { label: "Report on YouTube", type: "link", href: "https://support.google.com/youtube/answer/2802268" },
        { label: "Report on Instagram", type: "link", href: "https://help.instagram.com/" },
        { label: "Report on Facebook", type: "link", href: "https://www.facebook.com/help/" },
        { label: "eSafety: 1800 880 176", type: "link", href: "https://www.esafety.gov.au/" },
      ],
    },
    {
      icon: "✊",
      title: "Facing Discrimination?",
      details: [
        { label: "Talk to school principal or supervisor." },
        { label: "Department of Education", type: "link", href: "https://www.education.gov.au/" },
        { label: "Human Rights Commission", type: "link", href: "https://humanrights.gov.au" },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full p-6 space-y-8 bg-gradient-to-b from-[#0064C5] to-[#1E90FF] text-black flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-4">Get Help When You Need It</h1>

      {/* Radial layout container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-[600px] h-[600px] mt-10"
      >
        {helpDetails.map((card, index) => {
          const angle = (index / helpDetails.length) * 2 * Math.PI;
          const radius = 220; // Increased spacing from center

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px - 96px / 2)`, // adjust for card size (w-48 = 192px)
                top: `calc(50% + ${y}px - 96px / 2)`,
              }}
              initial={{ scale: 0.95 }}
              animate={{ scale: activeCard === index ? 1.05 : 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            >
              <HelpCard
                icon={card.icon}
                title={card.title}
                details={card.details}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default GetHelp;
