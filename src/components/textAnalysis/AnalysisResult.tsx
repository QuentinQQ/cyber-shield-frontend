import React from "react";
import { AnalyzeResponse } from "@/types/textAnalysis.type";

// We're using the detector images from the public directory
// No need to import them, we'll use the path directly

interface Props {
  result: AnalyzeResponse;
  originalText: string;
  onCheckAnother: () => void;
}

const AnalysisResult: React.FC<Props> = ({ result, originalText, onCheckAnother }) => {
  // Determine which image to display based on bullying_level
  const getDetectorImage = () => {
    switch (result.bullying_level) {
      case 1:
        return "/textAnalysis/green_zone.png";
      case 2:
        return "/textAnalysis/yellow_zone.png";
      case 3:
        return "/textAnalysis/orange_zone.png";
      case 4:
        return "/textAnalysis/red_zone.png";
      default:
        return "/textAnalysis/green_zone.png";
    }
  };

  return (
    <div className="mt-6 p-6 text-white">
      <h2 className="text-xl font-bold mb-4 text-center text-cyan-300">
        Message Analysis Results
      </h2>
      
      {/* Original text display */}
      <div className="mb-6 p-4 bg-indigo-900/100 rounded-lg border border-indigo-400/50">
        <div className="text-cyan-300 text-sm font-medium mb-2">Your Message:</div>
        <p className="text-white/90 italic">{originalText}</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Detector image */}
        <div className="w-48 h-48 flex-shrink-0">
          <img 
            src={getDetectorImage()} 
            alt={`Bullying detector showing ${result.zone}`} 
            className="w-full h-full object-contain"
          />
          <p className="text-xs text-center mt-1 text-cyan-200">
            Cyberbullying Detection Meter
          </p>
        </div>
        
        {/* Result details */}
        <div className="flex-grow">
          <div className="mb-3 bg-indigo-500/90 p-3 rounded-lg">
            <div className="text-cyan-300 text-sm font-medium mb-1">Risk Zone:</div>
            <h3 className="text-xl font-bold">{result.zone}</h3>
          </div>
          
          <div className="mb-3 bg-indigo-500/90 p-3 rounded-lg">
            <div className="text-cyan-300 text-sm font-medium mb-1">Assessment:</div>
            <p className="text-lg">{result.likelihood}</p>
          </div>
          
          <div className="mb-4 bg-indigo-500/90 p-3 rounded-lg">
            <div className="text-cyan-300 text-sm font-medium mb-1">AI Feedback:</div>
            <p>{result.comment}</p>
          </div>
          
          {result.suggested_text && result.suggested_text !== "None" && (
            <div className="mt-4 p-4 bg-blue-900/50 rounded-lg border border-blue-400">
              <div className="text-cyan-300 text-sm font-medium mb-2">
                Suggested Alternative:
              </div>
              <p className="italic text-cyan-100 pl-2 border-l-2 border-cyan-400">
                {result.suggested_text}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Check Another button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onCheckAnother}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full 
                   shadow-lg hover:from-purple-600 hover:to-indigo-700 transform transition-all 
                   duration-300 hover:scale-105 flex items-center"
        >
          Check Another Message
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
