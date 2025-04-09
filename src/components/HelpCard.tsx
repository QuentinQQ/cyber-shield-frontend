
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type HelpDetail = {
  label: string;
  type?: "link";
  href?: string;
};

type HelpCardProps = {
  icon: React.ReactNode;  
  title: string;
  details: HelpDetail[];  
};

export default function HelpCard({ icon, title, details }: HelpCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-[#F0F6FF] border border-[#CFE3FF] rounded-full p-4 shadow-md transition-all duration-300 ${
        isOpen ? "pb-6" : "hover:shadow-lg"
      } w-48 h-48 flex flex-col items-center justify-center cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-lg font-semibold text-[#1A3D7C] text-center mt-2">{title}</h3>
      </div>
      {isOpen ? (
        <ChevronUp className="text-[#1A3D7C] mt-2" />
      ) : (
        <ChevronDown className="text-[#1A3D7C] mt-2" />
      )}

      {isOpen && (
        <div className="mt-4 space-y-2 text-sm text-[#1A3D7C]">
          {details.map((item, index) => (
            <div key={index}>
              {item.type === "link" && item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F78FF] underline"
                >
                  {item.label}
                </a>
              ) : (
                <p>{item.label}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
