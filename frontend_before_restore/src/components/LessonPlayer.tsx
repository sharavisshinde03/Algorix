
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

import { lessonCatalog } from "../data/lessons/lessonCatalog";
import LeetCodePractice from "./LeetCodePractice";
import "./LessonPlayer.css";
import LessonAnimation from "./animations/LessonAnimation";

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

function buildScenes(content: (typeof lessonCatalog)[string]): LessonScene[] {
  return [
    {
      section: "UNDERSTAND THE CONCEPT",
      title: "The core idea",
      narration: content.explanation,
      boardTitle: content.concept,
      points: content.points,
      story: content.explanation,
      duration: 35,
    },
    {
      section: "BREAK IT DOWN",
      title: "How it works",
      narration: "Let's break this concept into its important steps. " + content.points.join(". ") + ".",
      boardTitle: "KEY STEPS",
      points: content.points,
      story: content.points.join(". ") + ".",
      duration: 30,
    },
    {
      section: "JAVA IMPLEMENTATION",
      title: "Let's implement it in Java",
      narration: "Now let's translate the concept into Java. Follow the code carefully and observe how each part contributes to the solution.",
      boardTitle: "JAVA CODE EXAMPLE",
      points: ["Read the implementation", "Identify the important operations", "Trace the example", "Think about its efficiency"],
      story: "This example demonstrates the concept using Java. Read the implementation and trace how the values change as the program executes.",
      duration: 40,
      code: content.javaExample,
    },
    {
      section: "RECAP",
      title: "What should you remember?",
      narration: "Let's recap. " + content.concept + " " + content.answerExplanation,
      boardTitle: "REMEMBER THESE IDEAS",
      points: content.points,
      story: content.answerExplanation,
      duration: 25,
    },
  ];
}

export default function LessonPlayer({
  lessonId,
  lessonTitle,
  onBack,
}: {
  lessonId: string;
  lessonTitle: string;
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

  const lessonContent = lessonCatalog[lessonId] ?? lessonCatalog["java-intro"];
  const scenes = buildScenes(lessonContent);
  const scene = scenes[Math.min(sceneIndex, scenes.length - 1)];
  const progress = ((sceneIndex + 1) / scenes.length) * 100;

  // LOAD EXISTING PROGRESS AND RECORD LESSON ACCESS

  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      try {
        const records = await getLessonProgress();

        if (!active) return;

        const saved = records.find(
          (item) => item.lessonId === lessonId
        );

        if (saved) {
          setCompleted(saved.completed);
          setSavedQuizScore(saved.quizScore);
        }

        await saveLessonProgress(lessonId, {});
      } catch (error) {
        console.error("Could not load lesson progress:", error);
      }
    };

    void loadProgress();

    return () => {
      active = false;
    };
  }, [lessonId]);

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
    if (!playing) return;

    const timer = window.setTimeout(() => {
      if (sceneIndex < scenes.length - 1) {
        setSceneIndex(index => index + 1);
      } else {
        setPlaying(false);
        stopSpeech();
      }
    }, (scene.duration * 1000) / speed);

    return () => window.clearTimeout(timer);
  }, [playing, sceneIndex, scene.duration, speed, scenes.length]);

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
    if (!quizAnswer || saving) return;

    setQuizChecked(true);

    const selectedIndex = lessonContent.options.indexOf(quizAnswer);
    const correct = selectedIndex === lessonContent.answerIndex;
    const score = correct ? 100 : 0;

    setSaving(true);

    try {
      await saveLessonProgress(lessonId, {
        quizScore: score,
        completed: correct,
      });

      setSavedQuizScore(score);
      setCompleted(correct);
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
            ALGORIX LEARNING PATH · ${lessonTitle.toUpperCase()}
          </span>

          <h1>{lessonTitle}</h1>

          <p>
            Explore concepts through animated visuals, examples and guided narration.
          </p>
        </div>

        <div className="lesson-chapter-label">
          CHAPTER ${String(lessonId).toUpperCase()}
        </div>
      </div>

      <div className="lesson-player-shell">
        <div className={`lesson-stage scene-${sceneIndex}`}>
          <div className="classroom-background">
            <div className="classroom-light light-left" />
            <div className="classroom-light light-right" />

            <div className="teacher-board">
              <div className="board-top">
                <div className="board-brand">
                  <Sparkles size={15} /> ALGORIX SMARTBOARD
                </div>

                <span>{lessonTitle}</span>
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

              <LessonAnimation
                lessonId={lessonId}
                lessonTitle={lessonTitle}
                sceneIndex={sceneIndex}
                playing={playing}
              />

              <div className="board-footer">
                THINK. CODE. CONQUER.
              </div>
            </div>

            

            <div className="classroom-floor" />
          </div>

          {showCaptions && (
            <div className="lesson-subtitle">
              <span>LESSON NARRATION</span>
              {scene.narration}
            </div>
          )}

          <div className="lesson-stage-controls">
            <span>
              SCENE {String(sceneIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
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
              setPlaying(false);
              stopSpeech();
              document.querySelector(".lesson-quiz")?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
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
            <span>CONCEPT EXPLANATION</span>
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

        <h2>{lessonContent.question}</h2>

        {lessonContent.options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option ${
              quizChecked && index === lessonContent.answerIndex
                ? "correct"
                : ""
            } ${
              quizChecked &&
              quizAnswer === option &&
              index !== lessonContent.answerIndex
                ? "incorrect"
                : ""
            }`}
            onClick={() => {
              setQuizAnswer(option);
              setQuizChecked(false);
            }}
          >
            <span>{option}</span>

            {quizChecked && index === lessonContent.answerIndex && (
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
          <p className={
            quizAnswer === lessonContent.options[lessonContent.answerIndex]
              ? "quiz-feedback right"
              : "quiz-feedback wrong"
          }>
            {quizAnswer === lessonContent.options[lessonContent.answerIndex]
              ? "Correct! " + lessonContent.answerExplanation
              : "Not quite. " + lessonContent.answerExplanation}
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

      <LeetCodePractice chapterId={lessonId} />

      <div className="lesson-bottom-navigation">
        <button onClick={onBack}>
          <ChevronLeft size={17} /> Back to chapters
        </button>

        <span>ALGORIX CLASSROOM · CHAPTER 01</span>
      </div>
    </div>
  );
}
