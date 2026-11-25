import { lessonCatalog } from "../lessons/lessonCatalog";
import type {
  ChapterSimulation,
  SimulationType,
  ConceptSimulation,
} from "./simulationTypes";

const simulationTypes: Record<string, SimulationType> = {
  "java-intro": "execution",
  "java-setup": "execution",
  "java-syntax": "execution",
  "java-variables": "memory",
  "java-operators": "execution",
  "java-input": "execution",
  "java-conditionals": "decision",
  "java-loops": "loop",
  "java-methods": "execution",
  "java-arrays": "array",
  "java-strings": "string-matching",
  "java-oop": "object-oriented",
  "java-constructors": "object-oriented",
  "java-encapsulation": "object-oriented",
  "java-inheritance": "object-oriented",
  "java-polymorphism": "object-oriented",
  "java-abstraction": "object-oriented",
  "java-static": "memory",
  "java-exceptions": "exception",
  "java-generics": "generics",
  "java-collections": "collections",
  "java-list": "linked-list",
  "java-stack-queue": "stack",
  "java-map-set": "hash-table",
  "java-io": "file-io",

  "ds-arrays": "array",
  "ds-linked-lists": "linked-list",
  "ds-stacks": "stack",
  "ds-queues": "queue",
  "ds-hashing": "hash-table",
  "ds-trees": "tree",
  "ds-bst": "bst",
  "ds-heaps": "heap",
  "ds-graphs": "graph",
  "ds-search-sort": "sorting",

  "adv-recursion": "recursion",
  "adv-backtracking": "backtracking",
  "adv-greedy": "greedy",
  "adv-dp": "dynamic-programming",
  "adv-graphs": "graph",

  "algo-trie": "trie",
  "algo-kmp": "string-matching",
  "algo-bloom": "bloom-filter",
  "algo-dsu": "disjoint-set",
  "algo-segment": "segment-tree",
  "algo-quickselect": "quickselect",
};

function createConceptSimulation(
  lessonId: string,
  topic: string,
  index: number,
  type: SimulationType,
  explanation: string,
): ConceptSimulation {
  return {
    id: `${lessonId}-concept-${index + 1}`,
    title: topic,
    explanation,
    type,
    operations: [],
  };
}

export const chapterSimulations: Record<string, ChapterSimulation> =
  Object.fromEntries(
    Object.entries(lessonCatalog).map(([lessonId, lesson]) => {
      const type = simulationTypes[lessonId];

      if (!type) {
        throw new Error(`Missing simulation type for ${lessonId}`);
      }

      return [
        lessonId,
        {
          lessonId,
          simulations: lesson.points.map((topic, index) =>
            createConceptSimulation(
              lessonId,
              topic,
              index,
              type,
              lesson.explanation,
            ),
          ),
        },
      ];
    }),
  );

export function getChapterSimulations(lessonId: string) {
  return chapterSimulations[lessonId]?.simulations ?? [];
}

export function getSimulationCoverage() {
  const chapters = Object.values(chapterSimulations);

  return {
    totalChapters: chapters.length,
    totalConcepts: chapters.reduce(
      (total, chapter) => total + chapter.simulations.length,
      0,
    ),
    chaptersWithSimulations: chapters.filter(
      chapter => chapter.simulations.length > 0,
    ).length,
  };
}
