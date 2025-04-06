import React from "react";
import Header from "../components/Header";
import WelcomeSection from "@/sections/HomePage/WelcomeSection";

const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] -z-10" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="snap-y snap-mandatory h-screen overflow-y-auto">
        <WelcomeSection />
        
        <section
          id="demo"
          className="h-screen flex items-center justify-center pt-20"
        >
          <h2 className="text-3xl font-bold text-white">Demo Section</h2>
        </section>
      </main>
    </div>
  );
};

export default HomePage;