import { MediaType, ScenarioNode } from "../types/scenario.types";

const scenarioData: Record<string, ScenarioNode> = {
  start: {
    id: "start",
    type: MediaType.IMAGE,
    src: "/scenarioGame/scenarioStart.png",
    nextNodeId: "A001"
  },

  // First decision point - Identifying cyberbullying
  A001: {
    id: "A001",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A001.mp4",
    options: [
      { 
        id: "A", 
        text: "That's really mean. That's cyberbullying.", 
        nextNodeId: "A003" 
      },
      { 
        id: "B", 
        text: "Maybe they're just joking. Are you sure it's that bad?", 
        nextNodeId: "A002" 
      },
      { 
        id: "C", 
        text: "You should just ignore them.", 
        nextNodeId: "A002" 
      }
    ]
  },

  // Feedback for wrong choice in first decision
  A002: {
    id: "A002",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A002.mp4",
    nextNodeId: "A001"
  },

  // Second decision point - Understanding cyberbullying
  A003: {
    id: "A003",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A003.mp4",
    options: [
      {
        id: "A_1",
        text: "It is your friend share funny videos with you.",
        nextNodeId: "A004"
      },
      {
        id: "B_1",
        text: "It's when someone uses the internet or their phone to hurt or embarrass someone. It could be mean messages, spreading rumors, posting private stuff, or leaving someone out on purpose.",
        nextNodeId: "A005"
      },
      {
        id: "C_1",
        text: "It's when your friend asked you out and he didn't show up.",
        nextNodeId: "A004"
      }
    ]
  },

  // Feedback for wrong choice in second decision
  A004: {
    id: "A004",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A004.mp4",
    nextNodeId: "A003"
  },

  // Third decision point - Handling cyberbullying
  A005: {
    id: "A005",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A005.mp4",
    options: [
      {
        id: "A_2",
        text: "Let's block them and delete the messages.",
        nextNodeId: "A006"
      },
      {
        id: "B_2",
        text: "We can save the messages, and you can talk to a teacher or your parent.",
        nextNodeId: "A007"
      },
      {
        id: "C_2",
        text: "You should just leave the group and move on.",
        nextNodeId: "A006"
      }
    ]
  },

  // Feedback for wrong choice in third decision
  A006: {
    id: "A006",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A006.mp4",
    nextNodeId: "A005"
  },

  // Fourth decision point - Supporting the victim
  A007: {
    id: "A007",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A007.mp4",
    options: [
      {
        id: "A_3",
        text: "You won't be alone. I'll go with you.",
        nextNodeId: "A009"
      },
      {
        id: "B_3",
        text: "Then maybe just don't say anything.",
        nextNodeId: "A008"
      },
      {
        id: "C_3",
        text: "Try to act like you don't care. That always works.",
        nextNodeId: "A008"
      }
    ]
  },

  // Feedback for wrong choice in fourth decision
  A008: {
    id: "A008",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A008.mp4",
    nextNodeId: "A007"
  },

  // Final decision point - Taking action
  A009: {
    id: "A009",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A009.mp4",
    options: [
      {
        id: "A_4",
        text: "Tell an Adult",
        nextNodeId: "A010"
      },
      {
        id: "B_4",
        text: "Be a supportive friend",
        nextNodeId: "A011"
      }
    ]
  },

  // Path 1 - Telling an adult
  A010: {
    id: "A010",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A010.mp4",
    nextNodeId: "A012"
  },

  // Path 2 - Being supportive
  A011: {
    id: "A011",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A011.mp4",
    nextNodeId: "A012"
  },

  // Final conclusion
  A012: {
    id: "A012",
    type: MediaType.VIDEO,
    src: "/scenarioGame/iteration3/A012.mp4"
  }
};

export default scenarioData;
