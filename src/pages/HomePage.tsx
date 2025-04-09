import React from "react";
import WelcomeSection from "@/sections/HomePage/WelcomeSection";
import PlayGameSection from "@/sections/HomePage/PlayGame";

const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] -z-10" />

      {/* Main content */}
      <main className="snap-y snap-mandatory h-screen overflow-y-auto">
        <WelcomeSection />
        <PlayGameSection />
      </main>
    </div>
  );
};

export default HomePage;