import { MediaType, ScenarioNode } from "../types/scenario.types";

/**
 * Scenario graph data containing all nodes and their connections.
 * Each node represents a scene in the interactive scenario with videos/images and options.
 */
const scenarioData: Record<string, ScenarioNode> = {
  /**
   * Start screen showing the intro image
   */
  start: {
    id: "start",
    type: MediaType.IMAGE,
    src: "/scenarioGame/scenarioStart.png",
  },

  /**
   * First introduction video
   */
  A001: {
    id: "A001",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A001.mp4",
    nextNodeId: "A002",
    caption:
      "The character and his friend Harley are on their way home, they were chatting",
  },

  /**
   * Second introduction video, leads to first choice
   */
  A002: {
    id: "A002",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A002.mp4",
    caption:
      "Harley: What do you think of Bill? Donny really kicked his ass in the canteen.",
    options: [
      {
        id: "option_A",
        text: "He deserves it bro",
        nextNodeId: "A004",
      },
      {
        id: "option_B",
        text: "Nah, I wonder why, never heard they have beef",
        nextNodeId: "A005",
      },
      {
        id: "option_C",
        text: "He should talk to teacher, I heard something about his family",
        nextNodeId: "A005",
      },
    ],
  },

  /**
   * Branch 1: Player chose "He deserves it bro"
   * Presents a second choice after video
   */
  A004: {
    id: "A004",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A004.mp4",
    caption:
      "Harley: Hahaha you are sick man",
    options: [
      {
        id: "option_A2",
        text: "I don't like this kid, he is asking for it",
        nextNodeId: "A008",
      },
      {
        id: "option_B2",
        text: "Maybe I shouldn't say that, god bless him",
        nextNodeId: "A007",
      },
    ],
  },

  /**
   * Branch 2: Player chose "Nah, I wonder why" or "He should talk to teacher"
   * Presents a second choice after video
   */
  A005: {
    id: "A005",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A005.mp4",
    caption:
      "Harley: I actually felt sorry about this kid, I wonder whats going on about his family?",
    options: [
      {
        id: "option_A3",
        text: "I rather not to say man",
        nextNodeId: "A007",
      },
      {
        id: "option_B3",
        text: "Bill's parents are divorced....",
        nextNodeId: "A008",
      },
    ],
  },

  /**
   * Outcome 1: A decision path that leads to a more positive direction
   * Will continue to A013 (branches merge back)
   */
  A007: {
    id: "A007",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A007.mp4",
    caption: "Bill just walked pass them silently.",
    nextNodeId: "A013",
  },

  /**
   * Outcome 2: A decision path that leads to a more negative direction
   * Will continue to A013 (branches merge back)
   */
  A008: {
    id: "A008",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A008.mp4",
    caption: "Bill just walked pass them, and gave them a angry look.",
    nextNodeId: "A013",
  },

  /**
   * Branches merged - continuation of the scenario
   */
  A013: {
    id: "A013",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A013.mp4",
    caption: "Donny is tailgating them, and getting closer and closer",
    nextNodeId: "A014",
  },

  /**
   * Continuation - will provide options for next steps
   */
  A014: {
    id: "A014",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A014.png",
    caption: "Harley: Let’s go, we don’t want troubles",
    options: [
      {
        id: "option_A4",
        text: "Keep your head down and walk away",
        nextNodeId: "A015_A",
      },
      {
        id: "option_B4",
        text: "Turn around and confront the students",
        nextNodeId: "A015_B",
      },
    ],
  },

  A015_A: {
    id: "A015_A",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A015.mp4",
    caption: "Donny took the video and mock you.",
    nextNodeId: "A016_1",
  },

  A015_B: {
    id: "A015_B",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A015.mp4",
    caption: "Donny beat you and they took the video",
    nextNodeId: "A016_1",
  },

  A016_1: {
    id: "A016_1",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A016.png",
    caption: "The video went virual among school",
    nextNodeId: "A016_2",
  },
  A016_2: {
    id: "A016_2",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A016_2.png",
    caption:
      "In canteen of the next day, you saw all the students post negative comments on the video, they mock you.",
    options: [
      {
        id: "option_A5",
        text: "Start the war, post hate comments on Donny",
        nextNodeId: "result_A",
      },
      {
        id: "option_B5",
        text: "Spread the rumer about Bill, turn the word on you to Bill",
        nextNodeId: "A009",
      },
      {
        id: "option_C5",
        text: "Talk to Bill, we should ask for help",
        nextNodeId: "A011_1",
      },
    ],
  },

  A009: {
    id: "A009",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A009.png",
    caption: "Bill: I heard what you said yesterday, you guys are the same",
    nextNodeId: "A010",
  },

  A010: {
    id: "A010",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A010.png",
    caption:
      "Bill post a video about his true story, and how he is being an victim of bully, and annonace you are no different from other bullies",
    nextNodeId: "result_B",
  },

  A011_1: {
    id: "A011_1",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A011.png",
    caption: "Bill: Thanks man, I appreciate it, we should ask for help.",
    nextNodeId: "A011_2",
  },

  A011_2: {
    id: "A011_2",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A011.png",
    caption: "You and Bill asked for help from teachers and our website.",
    nextNodeId: "A011_3",
  },

  A011_3: {
    id: "A011_3",
    type: MediaType.IMAGE,
    src: "/scenarioGame/A011.png",
    caption: "You and Bill post a video on how to do when you are being bullied and how to ask for help.",
    nextNodeId: "result_C",
  },

  /**
   * Result A: Player chose to post hate comments
   */
  result_A: {
    id: "result_A",
    type: MediaType.TEXT,
    src: "",
    title:
      "The teacher called both of you and Donny to have a conversation, you are suspended for 1 month from school, you start to have depression, you and Donny are hating each other",
    caption: "",
  },
  /**
   * Result B: Player chose to spread rumors about Bill
   */
  result_B: {
    id: "result_B",
    type: MediaType.TEXT,
    src: "",
    title:
      "People are posting more negative comments against you, you start having depression.",
    caption: "",
  },
  /**
   * Result C: Player chose to talk to Bill
   */
  result_C: {
    id: "result_C",
    type: MediaType.TEXT,
    src: "",
    title: "People stop posting negative comments against you, and start to give you respect.",
    caption: "",
  },
};

export default scenarioData;
