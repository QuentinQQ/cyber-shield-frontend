import React from "react";
import Infographic from "@/components/infographic/Infographic";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import { motion } from "framer-motion";
import { useQuizPage } from "@/hooks/useQuizPage";

const QuizPage: React.FC = () => {
  const { goToScenario } = useQuizPage();

  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Cyberbullying Statistics
        </h1>

        <Infographic />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2.2,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="mt-10 flex justify-center"
        >
          <PrimaryButton variant="cta" rotate onClick={goToScenario}>
            NEXT: Let's play a Scenario Game
          </PrimaryButton>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default QuizPage;
