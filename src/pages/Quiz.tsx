import React from "react";
import Infographic from "@/components/infographic/Infographic";
import PageWrapper from "@/components/PageWrapper";

/**
 * @component QuizPage
 * @description
 * Page that renders the cyberbullying statistics infographic.
 * Uses a gradient background and centers the content.
 * 
 * @returns {JSX.Element} The rendered quiz page
 */
const QuizPage: React.FC = () => {
  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Cyberbullying Statistics
        </h1>
        <Infographic />
      </div>
    </PageWrapper>
  );
};

export default QuizPage;