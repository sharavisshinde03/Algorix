import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
} from "lucide-react";
import "./SimulationEngine.css";
import type { ConceptSimulation } from "../../data/simulations/simulationTypes";

interface SimulationEngineProps {
  simulation: ConceptSimulation;
}

type Operation = {
  title: string;
  description: string;
  values: number[];
  activeIndex: number;
  action: string;
};

function createOperations(type: string): Operation[] {
  switch (type) {
    case "array":
      return [
        { title: "Initialize array", description: "Create an array containing four elements.", values: [10, 20, 30, 40], activeIndex: -1, action: "INITIALIZE" },
        { title: "Access an element", description: "Array indexing directly accesses an element at a known position in O(1) time.", values: [10, 20, 30, 40], activeIndex: 2, action: "ACCESS" },
        { title: "Traverse the array", description: "Visit each element sequentially. Traversal takes O(n) time.", values: [10, 20, 30, 40], activeIndex: 0, action: "TRAVERSE" },
        { title: "Insert an element", description: "Insert 25 at index 2. Existing elements must shift to the right.", values: [10, 20, 25, 30, 40], activeIndex: 2, action: "INSERT" },
        { title: "Delete an element", description: "Delete the element at index 1 and shift the remaining elements left.", values: [10, 25, 30, 40], activeIndex: 1, action: "DELETE" },
      ];

    case "linked-list":
      return [
        { title: "Create nodes", description: "Each node stores data and a reference to the next node.", values: [10, 20, 30], activeIndex: -1, action: "CREATE" },
        { title: "Start at head", description: "The head reference points to the first node.", values: [10, 20, 30], activeIndex: 0, action: "HEAD" },
        { title: "Traverse nodes", description: "Follow next references until the final node points to null.", values: [10, 20, 30], activeIndex: 1, action: "TRAVERSE" },
        { title: "Insert a node", description: "Insert 15 between 10 and 20 by updating the relevant references.", values: [10, 15, 20, 30], activeIndex: 1, action: "INSERT" },
        { title: "Delete a node", description: "Remove 20 by linking its predecessor directly to its successor.", values: [10, 15, 30], activeIndex: 1, action: "DELETE" },
      ];

    case "stack":
      return [
        { title: "Initialize stack", description: "An empty stack has no elements.", values: [], activeIndex: -1, action: "INITIALIZE" },
        { title: "Push 10", description: "Push inserts an element at the top of the stack.", values: [10], activeIndex: 0, action: "PUSH" },
        { title: "Push 20", description: "The most recently inserted element becomes the new top.", values: [10, 20], activeIndex: 1, action: "PUSH" },
        { title: "Push 30", description: "The stack now contains three elements.", values: [10, 20, 30], activeIndex: 2, action: "PUSH" },
        { title: "Pop", description: "Pop removes the top element, following LIFO order.", values: [10, 20], activeIndex: 1, action: "POP" },
        { title: "Peek", description: "Peek reads the top element without removing it.", values: [10, 20], activeIndex: 1, action: "PEEK" },
      ];

    case "queue":
      return [
        { title: "Initialize queue", description: "A queue starts empty.", values: [], activeIndex: -1, action: "INITIALIZE" },
        { title: "Enqueue 10", description: "Insert the first element at the rear.", values: [10], activeIndex: 0, action: "ENQUEUE" },
        { title: "Enqueue 20", description: "The new element joins at the rear.", values: [10, 20], activeIndex: 1, action: "ENQUEUE" },
        { title: "Enqueue 30", description: "The queue now has three elements.", values: [10, 20, 30], activeIndex: 2, action: "ENQUEUE" },
        { title: "Dequeue", description: "Remove the front element, following FIFO order.", values: [20, 30], activeIndex: 0, action: "DEQUEUE" },
      ];

    case "search":
    case "sorting":
      return [
        { title: "Initial array", description: "Start with an unsorted collection of values.", values: [40, 10, 30, 20], activeIndex: -1, action: "INITIALIZE" },
        { title: "Compare elements", description: "Compare adjacent values to identify an ordering violation.", values: [10, 40, 30, 20], activeIndex: 0, action: "COMPARE" },
        { title: "Continue ordering", description: "Continue comparing and rearranging elements.", values: [10, 30, 40, 20], activeIndex: 1, action: "SWAP" },
        { title: "Complete sorting", description: "The values are now in ascending order.", values: [10, 20, 30, 40], activeIndex: -1, action: "SORTED" },
      ];

    default:
      return [];
  }
}

export default function SimulationEngine({ simulation }: SimulationEngineProps) {
  const operations = createOperations(simulation.type);

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [customValue, setCustomValue] = useState("50");

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [simulation.id]);

  useEffect(() => {
    if (!playing || operations.length === 0) return;

    const timer = window.setInterval(() => {
      setStep(current => {
        if (current >= operations.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2200 / speed);

    return () => window.clearInterval(timer);
  }, [playing, speed, operations.length]);

  if (operations.length === 0) {
    return (
      <div className="se-unavailable">
        <Sparkles size={24} />
        <h3>Simulation under development</h3>
        <p>{simulation.title}</p>
        <p>This concept needs its dedicated algorithm visualization before it can be presented as an interactive simulation.</p>
      </div>
    );
  }

  const current = operations[step];

  return (
    <section className="simulation-engine">
      <div className="se-heading">
        <span><Sparkles size={14} /> ALGORIX LIVE SIMULATION</span>
        <small>{step + 1} / {operations.length}</small>
      </div>

      <h2>{simulation.title}</h2>

      <div className="se-operation">
        <span>{current.action}</span>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
      </div>

      <div className="se-visualization">
        <AnimatePresence mode="popLayout">
          {current.values.map((value, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, scale: 0.6, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 170, damping: 18 }}
              className={`se-element ${current.activeIndex === index ? "active" : ""}`}
            >
              <small>{index}</small>
              <strong>{value}</strong>
            </motion.div>
          ))}
        </AnimatePresence>

        {current.values.length === 0 && <span className="se-empty">EMPTY</span>}
      </div>

      <div className="se-controls">
        <button onClick={() => { setStep(0); setPlaying(false); }} title="Replay">
          <RotateCcw size={17} />
        </button>
        <button onClick={() => { setStep(Math.max(0, step - 1)); setPlaying(false); }} disabled={step === 0}>
          <SkipBack size={17} />
        </button>
        <button className="se-play" onClick={() => {
          if (step === operations.length - 1 && !playing) setStep(0);
          setPlaying(!playing);
        }}>
          {playing ? <Pause size={17} /> : <Play size={17} />}
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={() => { setStep(Math.min(operations.length - 1, step + 1)); setPlaying(false); }} disabled={step === operations.length - 1}>
          <SkipForward size={17} />
        </button>
        <select value={speed} onChange={event => setSpeed(Number(event.target.value))}>
          <option value={0.5}>0.5×</option>
          <option value={1}>1×</option>
          <option value={1.5}>1.5×</option>
          <option value={2}>2×</option>
        </select>
      </div>

      <div className="se-custom-input">
        <label htmlFor="se-custom-value">Experiment with a value</label>
        <input
          id="se-custom-value"
          type="number"
          value={customValue}
          onChange={event => setCustomValue(event.target.value)}
        />
        <p>Interactive custom operations will be enabled as each visualizer is implemented.</p>
      </div>
    </section>
  );
}
