
/**
 * @hook useMockupSize
 * @description
 * Calculates the optimal width for a phone mockup based on the available viewport height
 * while maintaining the device's aspect ratio (9:19.5 for iPhone X/11/12/13).
 *
 * @returns {{ width: number; height: number }} Optimal dimensions for mockup
 */
import { useEffect, useState } from "react";

export const useMockupSize = () => {
  const [size, setSize] = useState({ width: 375, height: 812 });

  useEffect(() => {
    const update = () => {
      // Get available viewport height (minus space for header, timer, and instructions)
      const availableHeight = window.innerHeight - 200; // Adjust this value based on your layout
      const aspectRatio = 9/19.5; // iPhone X/11/12/13 aspect ratio (width:height)
      
      // Calculate width based on available height and aspect ratio
      let calculatedWidth = Math.floor(availableHeight * aspectRatio);
      
      // Set minimum and maximum width constraints
      calculatedWidth = Math.max(280, Math.min(calculatedWidth, 375));
      
      // Calculate corresponding height based on aspect ratio
      const calculatedHeight = Math.floor(calculatedWidth / aspectRatio);
      
      setSize({ 
        width: calculatedWidth, 
        height: calculatedHeight
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
};
// /**
//  * @hook useMockupSize
//  * @description
//  * Returns the screen width and height to be used inside phone mockup component
//  * based on current window.innerWidth. Adjusts responsively.
//  *
//  * @returns {{ width: number; height: number }} Screen dimensions for mockup device
//  */
// import { useEffect, useState } from "react";

// export const useMockupSize = () => {
//   const [size, setSize] = useState({ width: 375, height: 667 });

//   useEffect(() => {
//     const update = () => {
//       const vw = window.innerWidth;
//       if (vw >= 1280) {
//         setSize({ width: 375, height: 667 });
//       } else if (vw >= 768) {
//         setSize({ width: 320, height: 568 });
//       } else {
//         setSize({ width: 280, height: 500 });
//       }
//     };

//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   return size;
// };
