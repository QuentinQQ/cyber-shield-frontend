/**
 * @hook useMockupSize
 * @description
 * Returns the screen width and height to be used inside phone mockup component
 * based on current window.innerWidth. Adjusts responsively.
 *
 * @returns {{ width: number; height: number }} Screen dimensions for mockup device
 */
import { useEffect, useState } from "react";

export const useMockupSize = () => {
  const [size, setSize] = useState({ width: 375, height: 667 }); // Default to iPhone X size

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw >= 1280) {
        setSize({ width: 375, height: 667 });
      } else if (vw >= 768) {
        setSize({ width: 320, height: 568 });
      } else {
        setSize({ width: 280, height: 500 });
      }
    };

    update(); // initialize on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
};
