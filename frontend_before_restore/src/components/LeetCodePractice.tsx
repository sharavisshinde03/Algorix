import { useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Code2,
  ExternalLink,
  Play,
  Send,
  Lightbulb,
  BookOpen,
  FileCode2,
} from "lucide-react";
import api from "../services/api";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

interface LeetCodeQuestion {
  id: string;
  chapterId: string;
  problemNumber: number;
  title: string;
  difficulty: string;
  topic: string;
  problemUrl: string;
  description?: string;
  constraintsText?: string;
  examples?: JsonValue;
  tags?: JsonValue;
  starterCode?: JsonValue;
  solutions?: JsonValue;
  hints?: JsonValue;
  solutionExplanation?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

interface LeetCodePracticeProps {
  chapterId: string;
}

type Language = "java" | "python" | "cpp";
type WorkspaceTab = "problem" | "editor" | "solution";

const languageNames: Record<Language, string> = {
  java: "Java",
  python: "Python",
  cpp: "C++",
};

const defaultCode: Record<Language, string> = {
  java: `class Solution {
    public int solve() {
        // Write your solution here
        return 0;
    }
}`,
  python: `class Solution:
    def solve(self):
        # Write your solution here
        pass`,
  cpp: `class Solution {
public:
    int solve() {
        // Write your solution here
        return 0;
    }
};`,
};

function asArray(value: JsonValue | undefined): JsonValue[] {
  return Array.isArray(value) ? value : [];
}

function asText(value: JsonValue | undefined): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return JSON.stringify(value, null, 2);
}

function getLanguageValue(
  value: JsonValue | undefined,
  language: Language
): JsonValue | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  const object = value as Record<string, JsonValue>;

  return (
    object[language] ??
    object[languageNames[language]] ??
    object[languageNames[language].toLowerCase()] ??
    object.default
  );
}

function getCode(
  value: JsonValue | undefined,
  language: Language
): string {
  const selected = getLanguageValue(value, language);

  if (typeof selected === "string") return selected;

  if (selected && typeof selected === "object" && !Array.isArray(selected)) {
    const object = selected as Record<string, JsonValue>;
    const code = object.code ?? object.solution ?? object.starterCode;

    if (typeof code === "string") return code;
  }

  return "";
}

export default function LeetCodePractice({
  chapterId,
}: LeetCodePracticeProps) {
  const [questions, setQuestions] = useState<LeetCodeQuestion[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState<Language>("java");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("problem");
  const [code, setCode] = useState(defaultCode.java);
  const [executionMessage, setExecutionMessage] = useState("");

  const selectedQuestion = useMemo(
    () => questions.find((question) => question.id === selectedQuestionId),
    [questions, selectedQuestionId]
  );

  useEffect(() => {
    if (!chapterId) {
      setQuestions([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadQuestions() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(
          `/leetcode/chapter/${encodeURIComponent(chapterId)}`
        );

        if (!cancelled) {
          const data: LeetCodeQuestion[] = response.data ?? [];
          setQuestions(data);
          setSelectedQuestionId(data[0]?.id ?? "");
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load LeetCode questions.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [chapterId]);

  useEffect(() => {
    setExecutionMessage("");

    if (!selectedQuestion) {
      setCode(defaultCode[language]);
      return;
    }

    const starter = getCode(selectedQuestion.starterCode, language);
    setCode(starter || defaultCode[language]);
  }, [selectedQuestionId, language, selectedQuestion]);

  const changeQuestion = (question: LeetCodeQuestion) => {
    setSelectedQuestionId(question.id);
    setActiveTab("problem");
    setExecutionMessage("");
  };

  const showExecutionNotice = (action: "run" | "submit") => {
    setExecutionMessage(
      action === "run"
        ? "Code execution is not connected yet. The editor is ready; next we will connect the sandboxed compiler."
        : "Submission judging is not connected yet. We will connect the judge and chapter progress tracking next."
    );
    setActiveTab("editor");
  };

  return (
    <section className="leetcode-practice">
      <div className="leetcode-practice-heading">
        <div className="leetcode-practice-icon">
          <Code2 size={22} />
        </div>
        <div>
          <h2>LeetCode Practice</h2>
          <p>Learn, code, and practice inside ALGORIX</p>
        </div>
      </div>

      {loading && (
        <p className="leetcode-practice-message">Loading questions...</p>
      )}

      {!loading && error && (
        <p className="leetcode-practice-message leetcode-practice-error">
          {error}
        </p>
      )}

      {!loading && !error && questions.length === 0 && (
        <p className="leetcode-practice-message">
          No LeetCode questions have been mapped to this chapter yet.
        </p>
      )}

      {!loading && !error && questions.length > 0 && (
        <>
          <div className="leetcode-workspace">
            <aside className="leetcode-workspace-sidebar">
              <h3>Chapter Questions</h3>

              <div className="leetcode-workspace-question-list">
                {questions.map((question) => (
                  <button
                    type="button"
                    key={question.id}
                    className={`leetcode-workspace-question ${
                      question.id === selectedQuestionId ? "active" : ""
                    }`}
                    onClick={() => changeQuestion(question)}
                  >
                    <span className="workspace-question-number">
                      #{question.problemNumber}
                    </span>
                    <span className="workspace-question-name">
                      {question.title}
                    </span>
                    <span
                      className={`leetcode-difficulty ${question.difficulty.toLowerCase()}`}
                    >
                      {question.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="leetcode-workspace-main">
              {selectedQuestion && (
                <>
                  <div className="leetcode-workspace-topbar">
                    <div>
                      <div className="workspace-current-title">
                        <span>#{selectedQuestion.problemNumber}</span>
                        <h3>{selectedQuestion.title}</h3>
                      </div>
                      <div className="leetcode-question-meta">
                        <span
                          className={`leetcode-difficulty ${selectedQuestion.difficulty.toLowerCase()}`}
                        >
                          {selectedQuestion.difficulty}
                        </span>
                        <span className="leetcode-question-topic">
                          {selectedQuestion.topic}
                        </span>
                      </div>
                    </div>

                    <a
                      className="leetcode-external-link"
                      href={selectedQuestion.problemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open original problem"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="leetcode-workspace-tabs">
                    <button
                      type="button"
                      className={activeTab === "problem" ? "active" : ""}
                      onClick={() => setActiveTab("problem")}
                    >
                      <BookOpen size={15} />
                      Problem
                    </button>
                    <button
                      type="button"
                      className={activeTab === "editor" ? "active" : ""}
                      onClick={() => setActiveTab("editor")}
                    >
                      <FileCode2 size={15} />
                      Editor
                    </button>
                    <button
                      type="button"
                      className={activeTab === "solution" ? "active" : ""}
                      onClick={() => setActiveTab("solution")}
                    >
                      <Lightbulb size={15} />
                      Solution
                    </button>
                  </div>

                  {activeTab === "problem" && (
                    <div className="leetcode-problem-content">
                      <h4>Problem Statement</h4>
                      <div className="leetcode-problem-description">
                        {selectedQuestion.description ||
                          "The full problem statement will appear here once this question's description is added to the database."}
                      </div>

                      {asArray(selectedQuestion.examples).length > 0 && (
                        <>
                          <h4>Examples</h4>
                          <div className="leetcode-examples">
                            {asArray(selectedQuestion.examples).map(
                              (example, index) => (
                                <pre key={index}>
                                  {typeof example === "string"
                                    ? example
                                    : JSON.stringify(example, null, 2)}
                                </pre>
                              )
                            )}
                          </div>
                        </>
                      )}

                      {selectedQuestion.constraintsText && (
                        <>
                          <h4>Constraints</h4>
                          <pre className="leetcode-constraints">
                            {selectedQuestion.constraintsText}
                          </pre>
                        </>
                      )}

                      {asArray(selectedQuestion.hints).length > 0 && (
                        <>
                          <h4>Hints</h4>
                          <ol className="leetcode-hints">
                            {asArray(selectedQuestion.hints).map(
                              (hint, index) => (
                                <li key={index}>{asText(hint)}</li>
                              )
                            )}
                          </ol>
                        </>
                      )}

                      <button
                        type="button"
                        className="leetcode-primary-button"
                        onClick={() => setActiveTab("editor")}
                      >
                        Start Coding
                        <Code2 size={16} />
                      </button>
                    </div>
                  )}

                  {activeTab === "editor" && (
                    <div className="leetcode-editor-panel">
                      <div className="leetcode-editor-toolbar">
                        <label htmlFor="leetcode-language">Language</label>
                        <select
                          id="leetcode-language"
                          value={language}
                          onChange={(event) =>
                            setLanguage(event.target.value as Language)
                          }
                        >
                          <option value="java">Java</option>
                          <option value="python">Python</option>
                          <option value="cpp">C++</option>
                        </select>

                        <div className="leetcode-editor-actions">
                          <button
                            type="button"
                            className="leetcode-run-button"
                            onClick={() => showExecutionNotice("run")}
                          >
                            <Play size={15} />
                            Run Code
                          </button>
                          <button
                            type="button"
                            className="leetcode-submit-button"
                            onClick={() => showExecutionNotice("submit")}
                          >
                            <Send size={15} />
                            Submit
                          </button>
                        </div>
                      </div>

                      <div className="leetcode-monaco-container">
                        <Editor
                          height="430px"
                          language={language}
                          theme="vs-dark"
                          value={code}
                          onChange={(value) => setCode(value ?? "")}
                          options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "on",
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            tabSize: 4,
                            padding: { top: 16 },
                          }}
                        />
                      </div>

                      {executionMessage && (
                        <div className="leetcode-execution-message">
                          {executionMessage}
                        </div>
                      )}

                      <div className="leetcode-editor-footer">
                        Your code is currently edited locally in this workspace.
                      </div>
                    </div>
                  )}

                  {activeTab === "solution" && (
                    <div className="leetcode-solution-content">
                      <h4>Solution</h4>

                      {selectedQuestion.solutionExplanation && (
                        <p className="leetcode-solution-explanation">
                          {selectedQuestion.solutionExplanation}
                        </p>
                      )}

                      {getCode(selectedQuestion.solutions, language) ? (
                        <div className="leetcode-solution-code">
                          <Editor
                            height="320px"
                            language={language}
                            theme="vs-dark"
                            value={getCode(
                              selectedQuestion.solutions,
                              language
                            )}
                            options={{
                              readOnly: true,
                              minimap: { enabled: false },
                              fontSize: 13,
                              lineNumbers: "on",
                              automaticLayout: true,
                            }}
                          />
                        </div>
                      ) : (
                        <p className="leetcode-practice-message">
                          The {languageNames[language]} solution has not been
                          added to this question yet.
                        </p>
                      )}

                      <div className="leetcode-complexity">
                        <div>
                          <span>Time Complexity</span>
                          <strong>
                            {selectedQuestion.timeComplexity || "Not provided"}
                          </strong>
                        </div>
                        <div>
                          <span>Space Complexity</span>
                          <strong>
                            {selectedQuestion.spaceComplexity ||
                              "Not provided"}
                          </strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="leetcode-primary-button"
                        onClick={() => setActiveTab("editor")}
                      >
                        Try It Yourself
                        <Code2 size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
