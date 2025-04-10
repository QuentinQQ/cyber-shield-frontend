import { MediaType, ScenarioNode } from '../types/scenario.types';

/**
 * Scenario graph data containing all nodes and their connections.
 * Each node represents a scene in the interactive scenario with videos/images and options.
 */
const scenarioData: Record<string, ScenarioNode> = {
  /**
   * Start screen showing the intro image
   */
  'start': {
    id: 'start',
    type: MediaType.IMAGE,
    src: '/scenarioGame/scenarioStart.png',
  },
  
  /**
   * First introduction video
   */
  'A001': {
    id: 'A001',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A001.mp4',
    nextNodeId: 'A002',
    caption: "You and your classmates are talking about an incident with Bill, a new student."
  },
  
  /**
   * Second introduction video, leads to first choice
   */
  'A002': {
    id: 'A002',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A002.mp4',
    caption: "Your classmate Donny is making fun of Bill. What do you think about this?",
    options: [
      {
        id: 'option_A',
        text: 'He deserves it bro',
        nextNodeId: 'A004'
      },
      {
        id: 'option_B',
        text: 'Nah, I wonder why, never heard they have beef',
        nextNodeId: 'A005'
      },
      {
        id: 'option_C',
        text: 'He should talk to teacher, I heard something about his family',
        nextNodeId: 'A005'
      }
    ]
  },
  
  /**
   * Branch 1: Player chose "He deserves it bro"
   * Presents a second choice after video
   */
  'A004': {
    id: 'A004',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A004.mp4',
    caption: "Your friends are encouraging bullying behavior. What's your response?",
    options: [
      {
        id: 'option_A2',
        text: 'I don\'t like this kid, he is asking for it',
        nextNodeId: 'A008'
      },
      {
        id: 'option_B2',
        text: 'Maybe I shouldn\'t say that, god bless him',
        nextNodeId: 'A007'
      }
    ]
  },
  
  /**
   * Branch 2: Player chose "Nah, I wonder why" or "He should talk to teacher"
   * Presents a second choice after video
   */
  'A005': {
    id: 'A005',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A005.mp4',
    caption: "Your friend is asking why you think Bill doesn't deserve the treatment.",
    options: [
      {
        id: 'option_A3',
        text: 'I rather not to say man',
        nextNodeId: 'A007'
      },
      {
        id: 'option_B3',
        text: 'Bill\'s parents are divorced....',
        nextNodeId: 'A008'
      }
    ]
  },
  
  /**
   * Outcome 1: A decision path that leads to a more positive direction
   * Will continue to A013 (branches merge back)
   */
  'A007': {
    id: 'A007',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A007.mp4',
    caption: "You've chosen not to participate in the bullying conversation.",
    nextNodeId: 'A013'
  },
  
  /**
   * Outcome 2: A decision path that leads to a more negative direction
   * Will continue to A013 (branches merge back)
   */
  'A008': {
    id: 'A008',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A008.mp4',
    caption: "You've shared personal information about Bill that could be used to hurt him.",
    nextNodeId: 'A013'
  },
  
  /**
   * Branches merged - continuation of the scenario
   */
  'A013': {
    id: 'A013',
    type: MediaType.VIDEO,
    src: '/scenarioGame/A013.mp4',
    caption: "The next day at school, you notice more students talking about Bill.",
    nextNodeId: 'A014'
  },
  
  /**
   * Continuation - will provide options for next steps
   */
  'A014': {
    id: 'A014',
    type: MediaType.IMAGE,
    src: '/scenarioGame/A014.png',
    caption: "You see a video being shared about Bill. You notice him being upset in the corner.",
    options: [
      {
        id: 'option_A4',
        text: 'Keep your head down and walk away',
        nextNodeId: 'A015_A'
      },
      {
        id: 'option_B4',
        text: 'Turn around and confront the students',
        nextNodeId: 'A015_B'
      }
    ]
  }
};

export default scenarioData;