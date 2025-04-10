/**
 * Media type enum for scenario nodes
 */
export enum MediaType {
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text',
}

/**
 * Interface for scenario options
 */
export interface ScenarioOption {
  id: string;
  text: string;
  nextNodeId: string;
}

/**
 * Interface for scenario nodes
 */
export interface ScenarioNode {
  id: string;
  type: MediaType;
  src: string;
  title?: string;
  caption?: string;
  options?: ScenarioOption[];
  nextNodeId?: string;
}

/**
 * Type for the entire scenario graph
 */
export type ScenarioGraph = Record<string, ScenarioNode>;