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
 *  wrongOptions: Record<string, string[]>,
 *  isShowingFeedback: boolean,
 *  originalNodeId: string | null,
 *  skipVideoPlayback: boolean,
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

  // Track which options were tried and incorrect for each node
  const [wrongOptions, setWrongOptions] = useState<Record<string, string[]>>({});

  // Keep track of original node ID when showing feedback
  const [originalNodeId, setOriginalNodeId] = useState<string | null>(null);

  // Flag to indicate if we're showing a feedback video
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  // Flag to skip video playback and just show options
  const [skipVideoPlayback, setSkipVideoPlayback] = useState(false);

  // Ref to control the HTML video element (used in VideoPlayer component)
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Internal helper to move to a specific node in the scenario.
   *
   * @param id - The ID of the target scenario node.
   * @param skipVideo - If true, will immediately show options without playing the video
   */
  const goTo = (id: string, skipVideo: boolean = false) => {
    if (!scenarioData[id]) {
      console.error("Node not found:", id);
      return;
    }
    setShowOpts(false);
    setCurrentId(id);
    
    // If skipVideo is true, we will show options immediately
    setSkipVideoPlayback(skipVideo);
    
    // If we're skipping the video, show options immediately
    if (skipVideo) {
      setTimeout(() => {
        setShowOpts(true);
      }, 50);
    }
  };

  /**
   * Starts the scenario from the first video node.
   * This should be called once the user clicks the "Start" button.
   */
  const startScenario = () => {
    setStarted(true);
    setWrongOptions({});
    setOriginalNodeId(null);
    setIsShowingFeedback(false);
    setSkipVideoPlayback(false);
    goTo("A001"); // Start with the first content node
  };

  /**
   * Resets the entire scenario to the starting state.
   * Useful for "Try Again" or restart functionality.
   */
  const resetScenario = () => {
    setStarted(false);
    setCurrentId("start");
    setShowOpts(false);
    setWrongOptions({});
    setOriginalNodeId(null);
    setIsShowingFeedback(false);
    setSkipVideoPlayback(false);

    // Optional small delay before re-starting for smoother UX
    setTimeout(startScenario, 300);
  };

  /**
   * Called when the current media (video or image) ends.
   * Determines whether to show options or move automatically to next node.
   */
  const handleMediaEnd = () => {
    const node = scenarioData[currentId];

    // If this is a feedback video, return to showing options for the original node
    // without replaying the original video
    if (isShowingFeedback && originalNodeId) {
      setIsShowingFeedback(false);
      goTo(originalNodeId, true); // Skip video playback when returning from feedback
      return;
    }

    // Special case for final node A012 - just show options (which will be empty)
    // This triggers the isGameEnded condition in ScenarioGame.tsx
    if (currentId === "A012") {
      setShowOpts(true);
      return;
    }

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
   * Mark an option as a wrong answer.
   */
  const markWrongOption = (nodeId: string, optionId: string) => {
    setWrongOptions(prev => {
      const nodeWrongOptions = prev[nodeId] || [];
      if (!nodeWrongOptions.includes(optionId)) {
        return {
          ...prev,
          [nodeId]: [...nodeWrongOptions, optionId]
        };
      }
      return prev;
    });
  };

  /**
   * Called when the user selects an option.
   * Navigates to the next node linked to that option.
   *
   * @param optId - The ID of the selected option (e.g., "A", "B_2").
   */
  const handleOptionSelect = (optId: string) => {
    const currentNode = scenarioData[currentId];
    const option = currentNode.options?.find((o) => o.id === optId);
    
    if (!option?.nextNodeId) return;
    
    // Check if this option leads to a feedback video
    const feedbackNodes = ["A002", "A004", "A006", "A008"];
    const isFeedbackNode = feedbackNodes.includes(option.nextNodeId);
    
    if (isFeedbackNode) {
      // Mark this as a wrong option
      markWrongOption(currentId, optId);
      
      // Store the original node ID so we can return to it
      setOriginalNodeId(currentId);
      setIsShowingFeedback(true);

      console.log(`User selected incorrect option ${optId} on node ${currentId}. Going to feedback node ${option.nextNodeId}`);
    } else {
      console.log(`User selected correct option ${optId} on node ${currentId}. Going to next node ${option.nextNodeId}`);
    }
    
    // Go to the next node
    goTo(option.nextNodeId);
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
    wrongOptions,
    isShowingFeedback,
    originalNodeId,
    skipVideoPlayback,

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
