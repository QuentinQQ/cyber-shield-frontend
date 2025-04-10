import { motion } from "framer-motion";
import PrimaryButton from "@/components/PrimaryButton";
import SectionWrapper from "@/components/SectionWrapper";
import happyImg from "@/assets/welcomePage/hero-happy.svg";
import angryImg from "@/assets/welcomePage/hero-angry.svg";
import { useHomePage } from "@/hooks/useHomePage";

const WelcomeSection: React.FC = () => {
  const { goToGame } = useHomePage();
  
  return (
    <SectionWrapper id="welcome" withGrid gridRows={3} headerHeight={80}>
      {/* Row 1: Top Image - left to right */}
      <div className="relative flex items-center justify-end px-20 overflow-hidden">
        <motion.img
          src={angryImg}
          alt="Hero Angry"
          initial={{ x: -800, opacity: 0, rotate: 360 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1,
            rotate: { type: "spring", stiffness: 100 },
          }}
          className="w-40 sm:w-52 md:w-60"
        />
      </div>

      {/* Row 2: Center text and button */}
      <div className="flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, type: "spring", stiffness: 100, damping: 10 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold max-w-xl text-white"
        >
          "Remember, Words Can Wound"
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2, delay: 0.3, type: "spring", stiffness: 100, damping: 10 }}
          className="mt-6"
        >
          <PrimaryButton variant="cta" rotate onClick={goToGame}>
            Let's Play A Game
          </PrimaryButton>
        </motion.div>
      </div>

      {/* Row 3: Bottom Image - right to left */}
      <div className="relative flex items-center px-20 justify-start overflow-hidden">
        <motion.img
          src={happyImg}
          alt="Hero Happy"
          initial={{ x: 800, opacity: 0, rotate: 360 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1,
            rotate: { type: "spring", stiffness: 100 },
            damping: 10,
          }}
          className="w-40 sm:w-52 md:w-60"
        />
      </div>
    </SectionWrapper>
  );
};

export default WelcomeSection;