export interface Chapter {
  id: string;
  title: string;
  description: string;
  moduleId: number;
}

export const curriculum = [
  {
    moduleId: 1,
    chapters: [
      ["java-intro", "Introduction to Programming", "Programming concepts and how programs execute."],
      ["java-setup", "Java Development Environment", "JDK, JVM, JRE and IDE setup."],
      ["java-syntax", "Java Syntax and Structure", "Java program structure, comments and statements."],
      ["java-variables", "Variables and Data Types", "Primitive types, reference types and variables."],
      ["java-operators", "Operators and Expressions", "Arithmetic, logical, relational and bitwise operators."],
      ["java-input", "Input and Output", "Scanner, output formatting and user input."],
      ["java-conditionals", "Decision Making", "If, else, nested conditions and switch."],
      ["java-loops", "Loops and Iteration", "For, while, do-while and nested loops."],
      ["java-methods", "Methods and Functions", "Parameters, return values and method overloading."],
      ["java-arrays", "Arrays", "One-dimensional and multidimensional arrays."],
      ["java-strings", "Strings", "String methods, immutability and StringBuilder."],
      ["java-oop", "Object-Oriented Programming", "Classes, objects, fields and methods."],
      ["java-constructors", "Constructors and Initialization", "Constructors, this keyword and initialization."],
      ["java-encapsulation", "Encapsulation", "Access modifiers, getters and setters."],
      ["java-inheritance", "Inheritance", "Extending classes and super keyword."],
      ["java-polymorphism", "Polymorphism", "Overloading, overriding and dynamic dispatch."],
      ["java-abstraction", "Abstraction and Interfaces", "Abstract classes and interfaces."],
      ["java-static", "Static and Final", "Static members, constants and final keyword."],
      ["java-exceptions", "Exception Handling", "Try, catch, finally, throw and throws."],
      ["java-generics", "Generics", "Generic classes, methods and type safety."],
      ["java-collections", "Java Collections Framework", "List, Set, Map and their implementations."],
      ["java-list", "ArrayList and LinkedList", "List operations and performance."],
      ["java-stack-queue", "Stacks and Queues in Java", "Deque, Stack and Queue implementations."],
      ["java-map-set", "HashMap and HashSet", "Hashing, maps, sets and collision basics."],
      ["java-io", "File Handling and Advanced Java", "File I/O, streams and basic serialization."]
    ] as string[][]
  },
  {
    moduleId: 2,
    chapters: [
      ["ds-arrays", "Arrays and Array Operations", "Traversal, insertion, deletion and complexity."],
      ["ds-linked-lists", "Linked Lists", "Singly, doubly and circular linked lists."],
      ["ds-stacks", "Stacks", "Stack operations and practical applications."],
      ["ds-queues", "Queues", "Circular queues, deques and priority queues."],
      ["ds-hashing", "Hashing", "Hash functions, collisions and hash tables."],
      ["ds-trees", "Trees and Binary Trees", "Tree terminology and binary tree traversal."],
      ["ds-bst", "Binary Search Trees", "Search, insert and delete operations."],
      ["ds-heaps", "Heaps and Priority Queues", "Min heaps, max heaps and heap operations."],
      ["ds-graphs", "Graph Representations", "Adjacency lists, matrices and graph basics."],
      ["ds-search-sort", "Searching and Sorting", "Binary search and fundamental sorting algorithms."]
    ] as string[][]
  },
  {
    moduleId: 3,
    chapters: [
      ["adv-recursion", "Recursion and Recurrence", "Recursive thinking, call stacks and recurrences."],
      ["adv-backtracking", "Backtracking", "Subsets, permutations and constraint search."],
      ["adv-greedy", "Greedy Algorithms", "Greedy choice property and optimization."],
      ["adv-dp", "Dynamic Programming", "Memoization, tabulation and state transitions."],
      ["adv-graphs", "Advanced Graph Algorithms", "BFS, DFS, shortest paths and spanning trees."]
    ] as string[][]
  },
  {
    moduleId: 4,
    chapters: [
      ["algo-trie", "Trie and Prefix Search", "Prefix trees and autocomplete."],
      ["algo-kmp", "String Matching with KMP", "Prefix functions and linear-time pattern search."],
      ["algo-bloom", "Bloom Filters", "Probabilistic membership testing."],
      ["algo-dsu", "Disjoint Set Union", "Union by rank and path compression."],
      ["algo-segment", "Segment Trees", "Range queries and point updates."],
      ["algo-quickselect", "QuickSelect", "Selection and kth-element algorithms."]
    ] as string[][]
  }
].flatMap(group =>
  group.chapters.map(([id, title, description]) => ({
    id,
    title,
    description,
    moduleId: group.moduleId
  }))
) satisfies Chapter[];

export const moduleChapterCounts = {
  1: 25,
  2: 10,
  3: 5,
  4: 6
} as const;
