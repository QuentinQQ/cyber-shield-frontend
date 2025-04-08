import React from "react";
import Infographic from "@/components/infographic/Infographic";

const QuizPage: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] -z-10" />

      {/* Main content */}
       <Infographic />
    </div>
  );
};

export default QuizPage;