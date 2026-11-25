export type SimulationType =
  | "memory"
  | "execution"
  | "decision"
  | "loop"
  | "array"
  | "linked-list"
  | "stack"
  | "queue"
  | "hash-table"
  | "tree"
  | "bst"
  | "heap"
  | "graph"
  | "search"
  | "sorting"
  | "recursion"
  | "backtracking"
  | "greedy"
  | "dynamic-programming"
  | "trie"
  | "string-matching"
  | "bloom-filter"
  | "disjoint-set"
  | "segment-tree"
  | "quickselect"
  | "object-oriented"
  | "collections"
  | "exception"
  | "generics"
  | "file-io";

export interface ConceptSimulation {
  id: string;
  title: string;
  explanation: string;
  type: SimulationType;
  operations: string[];
}

export interface ChapterSimulation {
  lessonId: string;
  simulations: ConceptSimulation[];
}
