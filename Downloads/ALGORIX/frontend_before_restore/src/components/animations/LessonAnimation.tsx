import { useMemo } from "react";
import { lessonCatalog } from "../../data/lessons/lessonCatalog";
import "./LessonAnimation.css";

interface Props {
  lessonId: string;
  lessonTitle: string;
  sceneIndex?: number;
  playing?: boolean;
}

type Kind =
  | "array" | "search" | "sort" | "linked" | "stack" | "queue"
  | "tree" | "heap" | "graph" | "hash" | "trie" | "recursion" | "dp" | "flow";

const values = [14, 28, 35, 49, 63];

function getKind(id: string, title: string, points: string[]): Kind {
  const text = `${id} ${title} ${points.join(" ")}`.toLowerCase();
  if (/binary.?search|linear.?search|searching/.test(text)) return "search";
  if (/bubble.?sort|selection.?sort|insertion.?sort|merge.?sort|quick.?sort|heap.?sort|sorting/.test(text)) return "sort";
  if (/linked.?list|singly.?list|doubly.?list|circular.?list/.test(text)) return "linked";
  if (/\bstack\b|lifo|push and pop/.test(text)) return "stack";
  if (/\bqueue\b|fifo|enqueue|dequeue/.test(text)) return "queue";
  if (/priority.?queue|\bheap\b/.test(text)) return "heap";
  if (/\btrie\b|prefix tree/.test(text)) return "trie";
  if (/binary.?tree|\bbst\b|tree traversal|avl|red.?black tree|segment tree/.test(text)) return "tree";
  if (/\bgraph\b|\bbfs\b|\bdfs\b|dijkstra|bellman.?ford|floyd.?warshall|kruskal|prim|topological/.test(text)) return "graph";
  if (/hash.?table|hashing|hash map|hash set/.test(text)) return "hash";
  if (/recursion|backtracking|call stack/.test(text)) return "recursion";
  if (/dynamic.?programming|\bdp\b|memoization|tabulation/.test(text)) return "dp";
  if (/array|index|contiguous memory/.test(text)) return "array";
  return "flow";
}

function ArrayAnimation({ step, kind }: { step: number; kind: "array" | "search" | "sort" }) {
  const sortValues = [
    [35, 14, 63, 28, 49],
    [14, 35, 63, 28, 49],
    [14, 28, 35, 63, 49],
    [14, 28, 35, 49, 63],
  ];
  const shown = kind === "sort" ? sortValues[step] : values;
  const highlight = kind === "search" ? [2, 1, 2, 2][step] : kind === "sort" ? [0, 1, 3, 4][step] : step;
  const copy = kind === "search"
    ? ["Check the middle value", "Narrow the search range", "Target value is found", "Search complete"]
    : kind === "sort"
      ? ["Compare values", "Swap into order", "Continue sorting", "Array is sorted"]
      : ["Each value has an index", "Access an element", "Update a value", "Traverse the array"];
  return (
    <div className="la-array">
      <div className="la-array-meta"><span>{kind === "search" ? "TARGET" : "ARRAY VALUES"}</span><b>{kind === "search" ? "35" : "INDEXED MEMORY"}</b></div>
      <div className="la-array-cells">
        {shown.map((value, i) => (
          <div className={`la-cell ${i === highlight ? "active" : ""} ${kind === "search" && value === 35 && step >= 2 ? "found" : ""}`} key={`${value}-${i}`} style={{ "--i": i } as React.CSSProperties}>
            <small>{i}</small><strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="la-visual-note">{copy[step]}</div>
    </div>
  );
}

function LinkedAnimation({ step }: { step: number }) {
  return <div className="la-linked"><span className="la-tag">HEAD</span><div className="la-linked-row">{[12,24,37,51].map((v,i)=><div className="la-linked-item" key={v}><div className={`la-node ${i === step ? "active" : ""}`}><b>{v}</b><small>data</small></div>{i<3&&<span className="la-arrow">→</span>}</div>)}<span className="la-null">NULL</span></div><p>{["Begin at head","Follow next pointer","Visit current node","Reach the end"][step]}</p></div>;
}

function StackAnimation({ step }: { step: number }) {
  const items = step === 3 ? [20,30,40] : [10,20,30,40];
  return <div className="la-stack"><div className="la-stack-items">{items.slice().reverse().map((v,i)=><div className={`la-stack-item ${i===0?"active":""}`} key={v}>{v}</div>)}</div><div className="la-side-note"><b>{["LIFO","PUSH 50","POP","TOP"][step]}</b><span>{["Last In, First Out","Insert at the top","Remove the top item","Read top without removal"][step]}</span></div></div>;
}

function QueueAnimation({ step }: { step: number }) {
  const items = step === 2 ? [20,30,40,50] : [10,20,30,40];
  return <div className="la-queue"><div className="la-queue-meta"><span>FRONT ←</span><span>→ REAR</span></div><div className="la-queue-cells">{items.map((v,i)=><div className={`la-cell ${i===(step===2?0:3)?"active":""}`} key={v}>{v}</div>)}</div><p>{["FIFO queue","Enqueue at rear","Dequeue from front","Maintain arrival order"][step]}</p></div>;
}

function TreeAnimation({ step, heap = false }: { step: number; heap?: boolean }) {
  const nodes = [{x:50,y:13,v:heap?90:40},{x:27,y:47,v:heap?70:20},{x:73,y:47,v:heap?60:60},{x:15,y:82,v:heap?35:10},{x:39,y:82,v:heap?50:30},{x:62,y:82,v:heap?25:50},{x:85,y:82,v:heap?15:70}];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
  const active = [0,1,3,4][step];
  return <div className="la-tree"><svg viewBox="0 0 100 100" aria-label={heap?"Heap":"Tree"}>{edges.map(([a,b],i)=><line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}/>)}{nodes.map((n,i)=><g className={i===active?"active":""} key={i}><circle cx={n.x} cy={n.y} r="8"/><text x={n.x} y={n.y+2.5}>{n.v}</text></g>)}</svg><p>{heap?["Root has highest priority","Compare parent and child","Restore heap order","Heap property holds"][step]:["Start at root","Move to a child","Visit a level","Continue traversal"][step]}</p></div>;
}

function GraphAnimation({ step }: { step: number }) {
  const nodes = [{x:15,y:50,v:"A"},{x:42,y:20,v:"B"},{x:42,y:80,v:"C"},{x:75,y:25,v:"D"},{x:83,y:72,v:"E"}];
  const edges = [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4]];
  const visited = [[0],[0,1],[0,1,2],[0,1,2,3,4]][step];
  return <div className="la-graph"><svg viewBox="0 0 100 100" aria-label="Graph traversal">{edges.map(([a,b],i)=><line className={visited.includes(a)&&visited.includes(b)?"visited":""} key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}/>)}{nodes.map((n,i)=><g className={visited.includes(i)?"visited":""} key={n.v}><circle cx={n.x} cy={n.y} r="9"/><text x={n.x} y={n.y+3}>{n.v}</text></g>)}</svg><p>{["Start at source","Visit adjacent vertex","Mark visited nodes","Explore connected vertices"][step]}</p></div>;
}

function HashAnimation({ step }: { step: number }) {
  const buckets = ["18","—","42 · 58","—","73"];
  return <div className="la-hash"><div className="la-hash-formula">hash(key) → bucket</div><div className="la-hash-buckets">{buckets.map((v,i)=><div className={i===[2,3,2,4][step]?"active":""} key={i}><small>{i}</small><b>{v}</b></div>)}</div><p>{["Compute the hash","Locate its bucket","Resolve collision","Retrieve the value"][step]}</p></div>;
}

function TrieAnimation({ step }: { step: number }) {
  return <div className="la-trie"><div className="la-trie-path">{["root","c","a","t"].map((v,i)=><div className={i<=step?"active":""} key={v}>{v}</div>)}</div><p>WORD: <b>{["c","ca","cat","cat ✓"][step]}</b></p><small>Follow character edges to match a prefix.</small></div>;
}

function RecursionAnimation({ step }: { step: number }) {
  const calls = ["factorial(4)","factorial(3)","factorial(2)","factorial(1)"];
  return <div className="la-recursion"><div className="la-call-stack">{calls.slice(0,step+1).reverse().map((v,i)=><div className={i===0?"active":""} key={v}>{v}<small>{step===3&&i===0?"BASE CASE":"call frame"}</small></div>)}</div><p>{["Function calls itself","Create a new call frame","Reach the base case","Return values upward"][step]}</p></div>;
}

function DPAnimation({ step }: { step: number }) {
  const grid = [[0,0,0,0],[0,1,1,1],[0,1,2,2],[0,1,2,3]];
  return <div className="la-dp"><div className="la-dp-grid">{grid.flatMap((row,r)=>row.map((v,c)=><div className={r<=step&&c<=step?"active":""} key={`${r}-${c}`}>{r<=step&&c<=step?v:""}</div>))}</div><p>{["Initialize base case","Reuse a subproblem","Fill the next state","Read final result"][step]}</p></div>;
}

function FlowAnimation({ step, points }: { step: number; points: string[] }) {
  const labels = points.slice(0,4);
  return <div className="la-flow">{(labels.length?labels:["Input","Process","Decision","Output"]).map((v,i)=><div className={i===step?"active":""} key={`${v}-${i}`}><small>{String(i+1).padStart(2,"0")}</small><b>{v}</b></div>)}</div>;
}

export default function LessonAnimation({ lessonId, lessonTitle, sceneIndex=0, playing=false }: Props) {
  const lesson = lessonCatalog[lessonId];
  const points = lesson?.points?.length ? lesson.points : [lessonTitle];
  const step = Math.max(0,Math.min(3,sceneIndex));
  const kind = useMemo(()=>getKind(lessonId,lessonTitle,points),[lessonId,lessonTitle,points]);
  const descriptions: Record<Kind,string> = {
    array:"Explore indexed memory cells and array operations.",
    search:"Watch the search range narrow toward the target.",
    sort:"Follow comparisons and swaps as values become ordered.",
    linked:"Follow pointers from one linked node to the next.",
    stack:"Observe push and pop at the top of the stack.",
    queue:"Items enter at the rear and leave at the front.",
    tree:"Explore parent-child links and tree traversal.",
    heap:"Compare nodes and maintain the heap property.",
    graph:"Follow vertices, edges, and visited nodes.",
    hash:"Map keys to buckets and understand collisions.",
    trie:"Follow character paths to find prefixes.",
    recursion:"Trace calls down to a base case and back.",
    dp:"Build an answer from previously computed states.",
    flow:"Step through the key ideas of this chapter."
  };
  return (
    <section className={`la-player la-${kind} ${playing?"is-playing":""}`} aria-label={`${lessonTitle} animation`}>
      <header className="la-header"><span className="la-live"><i/> VISUAL EXPLANATION</span><span className="la-header-count">STEP {String(step+1).padStart(2,"0")} / 04</span></header>
      <h3 className="la-title">{points[Math.min(step,points.length-1)]??lessonTitle}</h3>
      <div className="la-visual" key={`${kind}-${step}`}>
        {(kind==="array"||kind==="search"||kind==="sort")&&<ArrayAnimation step={step} kind={kind}/>}
        {kind==="linked"&&<LinkedAnimation step={step}/>}
        {kind==="stack"&&<StackAnimation step={step}/>}
        {kind==="queue"&&<QueueAnimation step={step}/>}
        {kind==="tree"&&<TreeAnimation step={step}/>}
        {kind==="heap"&&<TreeAnimation step={step} heap/>}
        {kind==="graph"&&<GraphAnimation step={step}/>}
        {kind==="hash"&&<HashAnimation step={step}/>}
        {kind==="trie"&&<TrieAnimation step={step}/>}
        {kind==="recursion"&&<RecursionAnimation step={step}/>}
        {kind==="dp"&&<DPAnimation step={step}/>}
        {kind==="flow"&&<FlowAnimation step={step} points={points}/>}
      </div>
      <p className="la-description">{descriptions[kind]}</p>
      <div className="la-progress"><span style={{width:`${((step+1)/4)*100}%`}}/></div>
    </section>
  );
}
