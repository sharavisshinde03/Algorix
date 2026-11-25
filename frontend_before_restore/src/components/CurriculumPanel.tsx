import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Play, RefreshCw } from "lucide-react";
import { curriculum } from "../data/curriculum";
import { getLessonProgress, type LessonProgress } from "../services/progressService";

interface Props {
  moduleId: number;
  onStart: (chapterId: string, title: string) => void;
}

const moduleNames: Record<number, string> = {
  1: "Programming Foundations",
  2: "Core Data Structures",
  3: "Advanced DSA",
  4: "Advanced Algorithms",
};

export default function CurriculumPanel({ moduleId, onStart }: Props) {
  const [records, setRecords] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const chapters = useMemo(
    () => curriculum.filter(chapter => chapter.moduleId === moduleId),
    [moduleId]
  );

  const loadProgress = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getLessonProgress();
      setRecords(data);
    } catch (err) {
      console.error("Could not load chapter progress:", err);
      setError("Could not load saved progress. Check that you are logged in and the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProgress();
  }, []);

  const isCompleted = (id: string) =>
    records.some(record => record.lessonId === id && record.completed);

  const completedCount = chapters.filter(chapter =>
    isCompleted(chapter.id)
  ).length;

  const percentage = chapters.length
    ? Math.round((completedCount / chapters.length) * 100)
    : 0;

  return (
    <>
      <section className="course-overview">
        <div>
          <span>COURSE PROGRESS</span>
          <strong>{percentage}%</strong>
          <div className="learning-progress">
            <span style={{ width: `${percentage}%` }} />
          </div>
          <p>{completedCount} of {chapters.length} chapters completed</p>
        </div>
        <div className="course-overview-icon">
          <BookOpen size={38} />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-eyebrow">COURSE CONTENT</span>
            <h2>{moduleNames[moduleId]} Chapters</h2>
            <p>Every chapter is available. Learn in your own order.</p>
          </div>
          <button className="text-action" onClick={() => void loadProgress()}>
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {loading && <p>Loading your learning progress...</p>}
        {error && <p role="alert">{error}</p>}

        <div className="chapter-list">
          {chapters.map((chapter, index) => {
            const completed = isCompleted(chapter.id);

            return (
              <article
                className={`chapter-row ${completed ? "available completed" : "available"}`}
                key={chapter.id}
              >
                <div className="chapter-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="chapter-info">
                  <span>CHAPTER {String(index + 1).padStart(2, "0")}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                </div>

                <span className="chapter-status">
                  {completed ? "COMPLETED" : "AVAILABLE"}
                </span>

                <button
                  className="chapter-start"
                  onClick={() => onStart(chapter.id, chapter.title)}
                >
                  {completed ? <CheckCircle2 size={16} /> : <Play size={16} />}
                  {completed ? "Review" : "Start"}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
