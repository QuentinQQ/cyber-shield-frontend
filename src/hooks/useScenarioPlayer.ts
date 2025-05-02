import { useState, useRef } from "react";
import scenarioData from "../data/scenarioGraphData";
import { MediaType, ScenarioNode } from "../types/scenario.types";

/**
 * Custom hook to manage the scenario-based interactive video game flow.
 * Provides control over starting, resetting, progressing through media nodes,
 * and selecting options.
 *
 * @returns {{
 *  started: boolean,
 *  currentNode: ScenarioNode,
 *  showOptions: boolean,
 *  videoRef: React.RefObject<HTMLVideoElement>,
 *  startScenario: () => void,
 *  resetScenario: () => void,
 *  handleMediaEnd: () => void,
 *  handleOptionSelect: (optId: string) => void,
 *  handleContinue: () => void
 * }}
 */
export function useScenarioPlayer() {
  // Whether the user has started the scenario
  const [started, setStarted] = useState(false);

  // Current scenario node ID (used to fetch node data)
  const [currentId, setCurrentId] = useState("start");

  // Whether to show option buttons on screen
  const [showOpts, setShowOpts] = useState(false);

  // Ref to control the HTML video element (used in VideoPlayer component)
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Internal helper to move to a specific node in the scenario.
   *
   * @param id - The ID of the target scenario node.
   */
  const goTo = (id: string) => {
    if (!scenarioData[id]) {
      console.error("Node not found:", id);
      return;
    }
    setShowOpts(false);
    setCurrentId(id);
  };

  /**
   * Starts the scenario from the first video node.
   * This should be called once the user clicks the "Start" button.
   */
  const startScenario = () => {
    setStarted(true);
    goTo("A002"); // First playable node (skip intro image)
  };

  /**
   * Resets the entire scenario to the starting state.
   * Useful for "Try Again" or restart functionality.
   */
  const resetScenario = () => {
    setStarted(false);
    setCurrentId("start");
    setShowOpts(false);

    // Optional small delay before re-starting for smoother UX
    setTimeout(startScenario, 300);
  };

  /**
   * Called when the current media (video or image) ends.
   * Determines whether to show options or move automatically to next node.
   */
  const handleMediaEnd = () => {
    const node = scenarioData[currentId];

    // If this node has options, show them
    if (node.options?.length) {
      setShowOpts(true);
      return;
    }

    // Otherwise, move to the next node if it exists
    if (node.nextNodeId) {
      setTimeout(() => goTo(node.nextNodeId!), 500);
    }
  };

  /**
   * Called when the user selects an option.
   * Navigates to the next node linked to that option.
   *
   * @param optId - The ID of the selected option (e.g., "A", "B_2").
   */
  const handleOptionSelect = (optId: string) => {
    const option = scenarioData[currentId].options?.find((o) => o.id === optId);
    if (option?.nextNodeId) {
      goTo(option.nextNodeId);
    }
  };

  /**
   * Called when the user clicks a "Continue" button from a text-only or image node.
   * Moves directly to the nextNodeId if it exists.
   */
  const handleContinue = () => {
    const node = scenarioData[currentId];
    if (node.nextNodeId) {
      goTo(node.nextNodeId);
    }
  };

  // Return all necessary data and methods for the player component
  return {
    started,
    currentNode: scenarioData[currentId],
    showOptions: showOpts,
    videoRef,

    // Public methods
    startScenario,
    resetScenario,
    handleMediaEnd,
    handleOptionSelect,
    handleContinue,
  };
}

/**
 * Re-export media type enum for convenience.
 */
export { MediaType };

/**
 * Re-export scenario node type for external components.
 */
export type { ScenarioNode };
