/**
 * @component LoadingOverlay
 * @description
 * A responsive, animated center-aligned loading overlay with bouncing letters.
 * It works well across mobile, tablet, and desktop views.
 *
 * @param {string} [message] - Optional loading message (default: "Loading")
 */

import React from "react";
import clsx from "clsx";

const LoadingOverlay: React.FC<{ message?: string }> = ({ message = "Loading" }) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Background layer: translucent blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/40 pointer-events-none" />

      {/* Center loading card */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div className="bg-white/90 border border-gray-200 shadow-xl rounded-xl px-4 py-3 sm:px-6 sm:py-4 max-w-md w-full flex space-x-1 justify-center text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-800">
          {message.split("").map((char, index) => (
            <span
              key={index}
              className={clsx("inline-block animate-bounce")}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
          <span
            className="animate-bounce"
            style={{ animationDelay: `${message.length * 0.1}s` }}
          >
            ...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
