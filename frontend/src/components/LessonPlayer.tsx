
import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  GraduationCap,
  Lightbulb,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  getLessonProgress,
  saveLessonProgress,
} from "../services/progressService";

import "./LessonPlayer.css";

interface LessonScene {
  section: string;
  title: string;
  narration: string;
  boardTitle: string;
  points: string[];
  story: string;
  duration: number;
  code?: string;
}

const scenes: LessonScene[] = [
  {
    section: "LET'S BEGIN",
    title: "Imagine a computer assistant!",
    narration:
      "Imagine you have a robot assistant. You want it to make you a cup of tea. But your assistant does not know how to make tea. You must explain every single step. First, take a cup. Then boil water. Add tea leaves and sugar. Finally, pour the tea into the cup. This is exactly how we communicate with computers. We give them instructions, one step at a time.",
    boardTitle: "HOW DO WE GIVE INSTRUCTIONS?",
    points: [
      "Take a cup",
      "Boil the water",
      "Add tea leaves",
      "Pour and serve",
    ],
    story:
      "Think of programming as teaching a very literal assistant. It follows exactly what you tell it to do!",
    duration: 25,
  },
  {
    section: "WHAT IS PROGRAMMING?",
    title: "Programming is communication!",
    narration:
      "Programming is the process of writing instructions that tell a computer what to do. Just like you communicate with another person using a language, you communicate with a computer using a programming language. These instructions help computers perform tasks, solve problems, and create applications.",
    boardTitle: "PROGRAMMING",
    points: [
      "Write instructions",
      "Give instructions to a computer",
      "Computer executes instructions",
      "Get the desired result",
    ],
    story:
      "Whenever you use an application, play a game, or browse a website, programming is working behind the scenes.",
    duration: 22,
  },
  {
    section: "HOW COMPUTERS THINK",
    title: "Computers follow instructions!",
    narration:
      "A computer does not understand what you want automatically. It follows instructions provided by a programmer. These instructions must be written clearly and in the correct order. If an instruction is missing or incorrect, the computer may not produce the result we expect. This is why logic is so important in programming.",
    boardTitle: "INPUT → PROCESS → OUTPUT",
    points: [
      "Input: Give information",
      "Process: Perform operations",
      "Output: Produce a result",
    ],
    story:
      "Imagine entering two numbers into a calculator. The numbers are the input, addition is the process, and the answer is the output.",
    duration: 22,
  },
  {
    section: "PROGRAMMING LANGUAGES",
    title: "How do we talk to computers?",
    narration:
      "Humans use languages to communicate. Computers work with machine-level instructions. Programming languages allow us to write instructions in a structured way. There are many programming languages, including Java, Python, and C++. In ALGORIX, we will focus on Java and use it to build our programming foundations.",
    boardTitle: "PROGRAMMING LANGUAGES",
    points: [
      "Humans write source code",
      "Java follows programming rules",
      "The compiler translates the code",
      "The computer executes the program",
    ],
    story:
      "Think of Java as the language we will use to communicate our ideas and solutions to the computer.",
    duration: 19,
  },
  {
    section: "YOUR FIRST PROGRAM",
    title: "Let's write some Java!",
    narration:
      "Now let's write your first Java program. We use a class called Main. Inside it, we define the main method. This is where Java starts executing our program. System dot out dot println displays a message on the screen. We are asking the computer to print Hello World. Let's look at the output. Hello World!",
    boardTitle: "YOUR FIRST JAVA PROGRAM",
    points: [
      "Create a class",
      "Write the main method",
      "Use println",
      "Display the output",
    ],
    story:
      "We have learned how to give instructions. Now let's give our computer its very first instruction!",
    duration: 22,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    section: "CHECK YOUR UNDERSTANDING",
    title: "You are the programmer!",
    narration:
      "Before we finish, let's test your understanding. Remember, programming is the process of writing instructions that a computer can execute. A program is a collection of instructions. Java is one language that allows us to write those instructions. You have just taken your first step into programming!",
    boardTitle: "REMEMBER THESE IDEAS",
    points: [
      "Programming means writing instructions",
      "Programs solve problems",
      "Computers execute instructions",
      "Java is a programming language",
    ],
    story:
      "You are no longer just a computer user. You have started learning how to instruct a computer.",
    duration: 15,
  },
];

const LESSON_ID = "java-intro";
const CORRECT_ANSWER =
  "Writing instructions for a computer to execute";

export default function LessonPlayer({
  onBack,
}: {
  onBack: () => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [savedQuizScore, setSavedQuizScore] = useState<number | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  const scene = scenes[sceneIndex];
  const progress = ((sceneIndex + 1) / scenes.length) * 100;

  // LOAD EXISTING PROGRESS AND RECORD LESSON ACCESS

  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      try {
        const records = await getLessonProgress();

        if (!active) return;

        const saved = records.find(
          (item) => item.lessonId === LESSON_ID
        );

        if (saved) {
          setCompleted(saved.completed);
          setSavedQuizScore(saved.quizScore);
        }

        await saveLessonProgress(LESSON_ID, {});
      } catch (error) {
        console.error("Could not load lesson progress:", error);
      }
    };

    void loadProgress();

    return () => {
      active = false;
    };
  }, []);

  // SAVE LESSON COMPLETION

  useEffect(() => {
    if (!completed) return;

    setSaving(true);

    void saveLessonProgress(LESSON_ID, {
      completed: true,
    })
      .then(() => {
        console.log("Lesson completion saved.");
      })
      .catch((error) => {
        console.error("Could not save lesson completion:", error);
      })
      .finally(() => setSaving(false));
  }, [completed]);

  // VOICE NARRATION

  const speak = (text: string) => {
    if (muted || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // AUTOMATIC SCENE PLAYBACK

  useEffect(() => {
    if (playing && sceneIndex < scenes.length - 1) {
      const timer = window.setTimeout(() => {
        setSceneIndex((index) => index + 1);
      }, scene.duration * 1000);

      return () => window.clearTimeout(timer);
    }

    if (playing && sceneIndex === scenes.length - 1) {
      const timer = window.setTimeout(() => {
        setPlaying(false);
        setCompleted(true);
      }, scene.duration * 1000);

      return () => window.clearTimeout(timer);
    }
  }, [playing, sceneIndex, scene.duration]);

  // SPEAK WHEN SCENE CHANGES

  useEffect(() => {
    if (playing) {
      speak(scene.narration);
    } else {
      stopSpeech();
    }

    return () => stopSpeech();
  }, [sceneIndex, playing, muted, speed]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  // SCENE NAVIGATION

  const goToScene = (index: number) => {
    stopSpeech();

    setSceneIndex(
      Math.max(0, Math.min(scenes.length - 1, index))
    );

    setPlaying(false);
    setCompleted(false);
  };

  // PLAY / PAUSE

  const togglePlayback = () => {
    if (completed) {
      setSceneIndex(0);
      setCompleted(false);
      setPlaying(true);
      return;
    }

    if (!playing) {
      setPlaying(true);
      speak(scene.narration);
    } else {
      setPlaying(false);
      stopSpeech();
    }
  };

  // FULLSCREEN

  const toggleFullscreen = () => {
    const element = document.querySelector(
      ".lesson-player-shell"
    );

    if (!element) return;

    if (!document.fullscreenElement) {
      void element.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  };

  // QUIZ SUBMISSION AND DATABASE SAVE

  const submitQuiz = async () => {
    if (!quizAnswer) return;

    setQuizChecked(true);

    const score = quizAnswer === CORRECT_ANSWER ? 100 : 0;

    setSaving(true);

    try {
      await saveLessonProgress(LESSON_ID, {
        quizScore: score,
      });

      setSavedQuizScore(score);
    } catch (error) {
      console.error("Could not save quiz score:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="lesson-player-page">
      <div className="lesson-top-navigation">
        <button onClick={onBack}>
          <ChevronLeft size={18} /> Back to course
        </button>

        <span>
          <GraduationCap size={17} /> ALGORIX CLASSROOM
        </span>
      </div>

      <div className="lesson-heading">
        <div>
          <span className="lesson-eyebrow">
            PROGRAMMING FOUNDATIONS · CHAPTER 01
          </span>

          <h1>Introduction to Programming</h1>

          <p>
            Meet your instructor. Understand the logic. Learn through
            examples.
          </p>
        </div>

        <div className="lesson-chapter-label">
          LESSON 01 / 25
        </div>
      </div>

      <div className="lesson-player-shell">
        <div className="lesson-stage">
          <div className="classroom-background">
            <div className="classroom-light light-left" />
            <div className="classroom-light light-right" />

            <div className="teacher-board">
              <div className="board-top">
                <div className="board-brand">
                  <Sparkles size={15} /> ALGORIX SMARTBOARD
                </div>

                <span>LESSON 01</span>
              </div>

              <div className="board-content" key={sceneIndex}>
                <span className="board-topic">
                  {scene.section}
                </span>

                <h2>{scene.boardTitle}</h2>

                {scene.code ? (
                  <pre className="animated-code">
                    <code>{scene.code}</code>
                  </pre>
                ) : (
                  <div className="board-flow">
                    {scene.points.map((point, index) => (
                      <div
                        className="board-step"
                        key={`${sceneIndex}-${point}`}
                      >
                        <span className="board-step-number">
                          {index + 1}
                        </span>

                        <span>{point}</span>

                        {index < scene.points.length - 1 && (
                          <span className="board-arrow">↓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="board-footer">
                THINK. CODE. CONQUER.
              </div>
            </div>

            <div
              className="animated-teacher"
              key={`teacher-${sceneIndex}`}
            >
              <div className="teacher-name">
                YOUR INSTRUCTOR
              </div>

              <div className="teacher-body">
                <div className="teacher-head">
                  <div className="teacher-hair" />

                  <div className="teacher-face">
                    <div className="teacher-eyes">
                      <i />
                      <i />
                    </div>

                    <div className="teacher-smile" />
                  </div>
                </div>

                <div className="teacher-neck" />

                <div className="teacher-shirt">
                  <span className="teacher-tie" />
                </div>

                <div className="teacher-arm" />
                <div className="teacher-hand" />
              </div>

              <div className="teacher-caption">
                Let's understand this together!
              </div>
            </div>

            <div className="classroom-floor" />
          </div>

          {showCaptions && (
            <div className="lesson-subtitle">
              <span>INSTRUCTOR</span>
              {scene.narration}
            </div>
          )}

          <div className="lesson-stage-controls">
            <span>
              SCENE {String(sceneIndex + 1).padStart(2, "0")} / 06
            </span>

            <button
              onClick={() => setShowCaptions(!showCaptions)}
            >
              <BookOpen size={15} />
              {showCaptions ? "Hide captions" : "Show captions"}
            </button>
          </div>
        </div>

        <div className="lesson-controls">
          <div className="lesson-progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="lesson-control-row">
            <div className="lesson-control-left">
              <button
                className="lesson-play-button"
                onClick={togglePlayback}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause size={19} />
                ) : completed ? (
                  <RotateCcw size={19} />
                ) : (
                  <Play size={19} />
                )}
              </button>

              <button
                className="lesson-icon-button"
                onClick={() => setMuted(!muted)}
                aria-label="Toggle sound"
              >
                {muted ? (
                  <VolumeX size={19} />
                ) : (
                  <Volume2 size={19} />
                )}
              </button>

              <span className="lesson-playing-label">
                {playing
                  ? "NOW TEACHING"
                  : completed
                    ? "LESSON FINISHED"
                    : "READY TO LEARN"}
              </span>
            </div>

            <div className="lesson-control-right">
              <select
                value={speed}
                onChange={(event) =>
                  setSpeed(Number(event.target.value))
                }
                aria-label="Playback speed"
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>

              <button
                className="lesson-icon-button"
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
              >
                <Maximize2 size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-navigation">
        <button
          className="lesson-nav-button"
          disabled={sceneIndex === 0}
          onClick={() => goToScene(sceneIndex - 1)}
        >
          <ChevronLeft size={17} /> Previous scene
        </button>

        <div className="scene-indicators">
          {scenes.map((item, index) => (
            <button
              key={item.title}
              title={item.title}
              className={index === sceneIndex ? "active" : ""}
              onClick={() => goToScene(index)}
            />
          ))}
        </div>

        <button
          className="lesson-nav-button next"
          onClick={() => {
            if (sceneIndex < scenes.length - 1) {
              goToScene(sceneIndex + 1);
            } else {
              setCompleted(true);
              setPlaying(false);
            }
          }}
        >
          {sceneIndex === scenes.length - 1
            ? "Finish lesson"
            : "Next scene"}

          <ChevronRight size={17} />
        </button>
      </div>

      <div className="lesson-learning-grid">
        <section className="lesson-explanation">
          <div className="lesson-section-title">
            <Lightbulb size={19} />
            <span>THE TEACHER'S EXPLANATION</span>
          </div>

          <h2>{scene.title}</h2>

          <p>{scene.story}</p>

          <div className="lesson-concept-list">
            {scene.points.map((point) => (
              <div key={point}>
                <CheckCircle2 size={16} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="lesson-code-section">
          <div className="lesson-section-title">
            <Code2 size={19} />
            <span>JAVA CODE EXAMPLE</span>
          </div>

          {scene.code ? (
            <>
              <pre className="lesson-code-block">
                <code>{scene.code}</code>
              </pre>

              <div className="code-output">
                <span>OUTPUT</span>
                <strong>Hello, World!</strong>
              </div>
            </>
          ) : (
            <div className="code-coming">
              <Code2 size={27} />
              <strong>Concept before code</strong>
              <p>
                First understand the idea. Then we'll turn it into
                Java code.
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="lesson-quiz">
        <div className="lesson-section-title">
          <GraduationCap size={19} />
          <span>QUICK KNOWLEDGE CHECK</span>
        </div>

        <h2>What is programming?</h2>

        {[
          "Designing computer hardware",
          CORRECT_ANSWER,
          "Only creating websites",
          "Repairing a computer",
        ].map((option) => (
          <button
            key={option}
            className={`quiz-option ${
              quizChecked && option === CORRECT_ANSWER
                ? "correct"
                : ""
            } ${
              quizChecked &&
              quizAnswer === option &&
              option !== CORRECT_ANSWER
                ? "incorrect"
                : ""
            }`}
            onClick={() => {
              setQuizAnswer(option);
              setQuizChecked(false);
            }}
          >
            <span>{option}</span>

            {quizChecked && option === CORRECT_ANSWER && (
              <CheckCircle2 size={17} />
            )}
          </button>
        ))}

        <button
          className="quiz-submit"
          disabled={!quizAnswer || saving}
          onClick={() => void submitQuiz()}
        >
          {saving ? "Saving..." : "Check answer"}
        </button>

        {quizChecked && (
          <p
            className={
              quizAnswer === CORRECT_ANSWER
                ? "quiz-feedback right"
                : "quiz-feedback wrong"
            }
          >
            {quizAnswer === CORRECT_ANSWER
              ? "Correct! A program is a set of instructions that a computer executes."
              : "Not quite. Think about the instructions we gave our tea-making assistant."}
          </p>
        )}

        {savedQuizScore !== null && (
          <p className="quiz-feedback">
            Your saved quiz score: {savedQuizScore}%
          </p>
        )}
      </section>

      {completed && (
        <div className="lesson-complete">
          <CheckCircle2 size={25} />

          <div>
            <strong>You've reached the end of this lesson!</strong>

            <p>
              Complete the knowledge check and review the examples
              before moving on.
            </p>

            <p>
              {saving
                ? "Saving your progress..."
                : "Your lesson completion has been saved."}
            </p>
          </div>
        </div>
      )}

      <div className="lesson-bottom-navigation">
        <button onClick={onBack}>
          <ChevronLeft size={17} /> Back to chapters
        </button>

        <span>ALGORIX CLASSROOM · CHAPTER 01</span>
      </div>
    </div>
  );
}
