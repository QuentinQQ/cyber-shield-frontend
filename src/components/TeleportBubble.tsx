import { motion } from "framer-motion";

export const TeleportBubble: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-10 right-20 cursor-pointer z-50"
      onClick={onClick}
      style={{ width: "150px", height: "150px" }}
    >
      <div
        className="teleport-bubble"
        style={{
          width: "150px",
          height: "150px",
          background: "hsl(212, 100%, 71%)",
          border: "13px solid hsl(212, 100%, 81%)",
          position: "relative",
          overflow: "visible",
          borderRadius: "48% 40% 62% 47% / 61% 49% 64% 43%",
          animation: "rotateTeleport 35s infinite linear",
          zIndex: 10,
        }}
      >
        <div
          style={{
            content: "",
            position: "absolute",
            top: "15px",
            left: "15px",
            width: "calc(100% - 45px)",
            height: "calc(100% - 45px)",
            background: "hsl(212, 100%, 51%)",
            border: "10px solid hsl(212, 100%, 61%)",
            borderRadius: "41% 40% 50% 55% / 49% 52% 51% 43%",
            zIndex: -2,
            animation: "rotateTeleportBefore 35s infinite linear",
          }}
        />
        <div
          style={{
            content: "",
            position: "absolute",
            top: "30px",
            left: "30px",
            width: "calc(100% - 75px)",
            height: "calc(100% - 75px)",
            background: "hsl(212, 100%, 31%)",
            border: "7px solid hsl(212, 100%, 41%)",
            borderRadius: "42% 63% 51% 60% / 47% 62% 42% 52%",
            animation: "rotateTeleportAfter 35s infinite linear",
          }}
        />
      </div>
    </motion.div>
  );
};
