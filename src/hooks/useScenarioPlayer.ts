import { useState, useRef, useEffect } from "react";
import scenarioData from "../data/scenarioGraphData";
import { MediaType, ScenarioNode } from "../types/scenario.types";

/**
 * @hook useScenarioPlayer
 * @description Manages the state and logic for the scenario player
 */
export function useScenarioPlayer() {
  // Game state
  const [started, setStarted] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [showOptions, setShowOptions] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);

  // References
  const videoRef = useRef<HTMLVideoElement>(null);

  // Current node
  const currentNode = scenarioData[currentNodeId];

  // Effect to show caption when node changes
  useEffect(() => {
    if (currentNode?.caption) {
      setCaption(currentNode.caption);
    } else {
      setCaption(null);
    }
  }, [currentNodeId, currentNode]);

  /**
   * @function startScenario
   * @description Starts the scenario game
   */
  const startScenario = () => {
    console.log("Starting scenario");
    setStarted(true);
    goToNode("A001");
  };

  /**
   * @function resetScenario
   * @description Resets the scenario to start over
   */
  const resetScenario = () => {
    console.log("Resetting scenario");
    setStarted(false);
    setCurrentNodeId("start");
    setShowOptions(false);
    setCaption(null);
    
    // Small delay for visual reset effect
    setTimeout(() => {
      startScenario();
    }, 300);
  };

  /**
   * @function handleMediaEnd
   * @description Handles media end event (videos/images)
   */
  const handleMediaEnd = () => {
    console.log(`Media ended: ${currentNodeId}`);

    // Show options if available
    if (currentNode.options && currentNode.options.length > 0) {
      setShowOptions(true);
      return;
    }

    // Auto-advance to next node if available
    if (currentNode.nextNodeId) {
      // Allow time for caption to be read
      setTimeout(() => {
        goToNode(currentNode.nextNodeId!);
      }, 2000);
    }
  };

  /**
   * @function handleOptionSelect
   * @description Handles option selection
   */
  const handleOptionSelect = (optionId: string) => {
    console.log(`Option selected: ${optionId}`);

    // Hide options
    setShowOptions(false);

    // Find selected option
    const option = currentNode.options?.find(
      (opt: { id: string }) => opt.id === optionId
    );
    if (option && option.nextNodeId) {
      goToNode(option.nextNodeId);
    }
  };

  /**
   * @function handleContinue
   * @description Handles continue button clicks on text screens
   */
  const handleContinue = () => {
    console.log(`Continue from node: ${currentNodeId}`);

    if (currentNode.nextNodeId) {
      goToNode(currentNode.nextNodeId);
    }
  };

  /**
   * @function goToNode
   * @description Navigates to a specific node
   */
  const goToNode = (nodeId: string) => {
    console.log(`Going to node: ${nodeId}`);

    // Reset state
    setShowOptions(false);

    // Check if node exists
    if (!scenarioData[nodeId]) {
      console.error(`Node not found: ${nodeId}`);
      return;
    }

    // Set current node
    setCurrentNodeId(nodeId);
  };

  return {
    started,
    currentNode,
    showOptions,
    caption,
    videoRef,
    startScenario,
    resetScenario,  // Add this new function
    handleMediaEnd,
    handleContinue,
    handleOptionSelect,
  };
}

// Re-export types for convenience
export { MediaType };
export type { ScenarioNode };