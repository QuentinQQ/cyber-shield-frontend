import { MediaType, ScenarioNode } from "../types/scenario.types";

const scenarioData: Record<string, ScenarioNode> = {
  start: {
    id: "start",
    type: MediaType.IMAGE,
    src: "/scenarioGame/scenarioStart.png",
  },

  A002: {
    id: "A002",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A002.mp4",
    options: [
      { id: "A", text: "He deserves it bro", nextNodeId: "A004" },
      { id: "B", text: "I think he needs help", nextNodeId: "A005" },
      {
        id: "C",
        text: "He should talk to teacher, I heard …",
        nextNodeId: "A005",
      },
    ],
  },

  A004: {
    id: "A004",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A004.mp4",
    options: [
      {
        id: "A_1",
        text: "I don’t like this kid, he is asking for it",
        nextNodeId: "A008",
      },
      {
        id: "B_1",
        text: "Maybe I shouldn’t say that, God bless him",
        nextNodeId: "A007",
      },
    ],
  },

  A005: {
    id: "A005",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A005.mp4",
    options: [
      { id: "A_2", text: "I rather not to say man", nextNodeId: "A007" },
      { id: "B_2", text: "Bill’s parents are divorced …", nextNodeId: "A008" },
    ],
  },

  A007: {
    id: "A007",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A007.mp4",
    nextNodeId: "A014",
  },
  A008: {
    id: "A008",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A008.mp4",
    nextNodeId: "A014",
  },

  A014: {
    id: "A014",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A014.mp4",
    options: [
      {
        id: "A_3",
        text: "Keep your heads down and walk away",
        nextNodeId: "A015",
      },
      { id: "B_3", text: "Beat him", nextNodeId: "A015" },
    ],
  },

  A015: {
    id: "A015",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A015.mp4",
    nextNodeId: "A016",
  },

  A016: {
    id: "A016",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A016.mp4",
    options: [
      {
        id: "A_4",
        text: "Start the war, post hate comments on Donny",
        nextNodeId: "A017",
      },
      { id: "B_4", text: "Spread the rumour about Bill", nextNodeId: "A009" },
      {
        id: "C_4",
        text: "Talk to Bill, we should ask for help",
        nextNodeId: "A011",
      },
    ],
  },

  A017: {
    id: "A017",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A017.mp4",
  },

  A009: {
    id: "A009",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A009.mp4"
  },

  A011: {
    id: "A011",
    type: MediaType.VIDEO,
    src: "/scenarioGame/A011.mp4",
  },
};
export default scenarioData;
