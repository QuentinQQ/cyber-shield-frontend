import React from "react";
import Infographic from "@/components/infographic/Infographic";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import { motion } from "framer-motion";
import { useQuizPage } from "@/hooks/useQuizPage";

/**
 * Quiz page containing the interactive cyberbullying infographic visualization
 * and a button to navigate to the scenario game.
 * 
 * @page
 * @example
 * <QuizPage />
 */
const QuizPage: React.FC = () => {
  const { goToScenario } = useQuizPage();

  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white">
      <div className="container mx-auto py-10">
        <Infographic />

        {/* Updated button wrapper for fully consistent animation */}
        <div className="mt-10 flex justify-center">
          <div className="relative">
            {/* Shadow beneath the button */}
            <motion.div 
              className="absolute w-full h-4 bg-black/20 rounded-full blur-md bottom-0 left-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                width: ['90%', '60%', '90%'],
                x: ['5%', '20%', '5%']
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 },
                width: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                },
                x: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }
              }}
            />
            
            {/* The PrimaryButton with our standard fade-in rather than spring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5
              }}
            >
              <PrimaryButton variant="cta" rotate onClick={goToScenario}>
                Let's play a Scenario Game
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default QuizPage;