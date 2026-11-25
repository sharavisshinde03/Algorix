import { useEffect, useState } from "react";
import AlgorithmCenter from "./algorithms/AlgorithmCenter";
import {
  LayoutDashboard,
  BookOpen,
  Search,
  ArrowRight,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  BrainCircuit,
  Layers3,
  Network,
  GraduationCap,
  Flame,
  Target,
  Play,
  Menu,
  X,
} from "lucide-react";

import type { AuthResponse } from "../services/authService";
import "./Dashboard.css";
import LessonPlayer from "./LessonPlayer";
import CurriculumPanel from "./CurriculumPanel";

import {
  getLessonProgress,
  getProgressSummary,
} from "../services/progressService";

import { lessonCatalog } from "../data/lessons/lessonCatalog";
import { curriculum } from "../data/curriculum";

interface Props {
  user: AuthResponse;
  onLogout: () => void;
}

const modules = [
  {
    id: 1,
    number: "01",
    title: "Programming Foundations",
    description: "Build strong Java programming fundamentals.",
    chapters: 25,
    icon: GraduationCap,
    color: "violet",
  },
  {
    id: 2,
    number: "02",
    title: "Core Data Structures",
    description: "Understand and implement essential data structures.",
    chapters: 10,
    icon: Layers3,
    color: "cyan",
  },
  {
    id: 3,
    number: "03",
    title: "Advanced DSA",
    description: "Develop advanced problem-solving techniques.",
    chapters: 5,
    icon: Network,
    color: "pink",
  },
  {
    id: 4,
    number: "04",
    title: "Advanced Algorithms",
    description: "Explore optimization and algorithm engineering.",
    chapters: 6,
    icon: BrainCircuit,
    color: "lime",
  },
];

export default function Dashboard({ user, onLogout }: Props) {
  const [activePage, setActivePage] = useState("Overview");
  const [selectedModule, setSelectedModule] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchResults = search.trim()
    ? curriculum.filter((chapter) =>
        chapter.title.toLowerCase().includes(search.trim().toLowerCase())
      ).slice(0, 8)
    : [];

  const openSearchResult = (chapter: (typeof curriculum)[number]) => {
    setSelectedChapter({
      id: chapter.id,
      title: chapter.title,
    });
    setSearch("");
    setActivePage("Lesson");
    setSidebarOpen(false);
  };


  const [selectedChapter, setSelectedChapter] = useState({
    id: "java-intro",
    title: "Introduction to Programming",
  });

  const [progressSummary, setProgressSummary] = useState({
    totalLessonsStarted: 0,
    completedLessons: 0,
    averageQuizScore: 0,
    completionPercentage: 0,
  });

  const [lessonRecords, setLessonRecords] =
    useState<Awaited<ReturnType<typeof getLessonProgress>>>([]);

  useEffect(() => {
    let active = true;

    const loadDashboardProgress = async () => {
      try {
        const [summary, records] = await Promise.all([
          getProgressSummary(),
          getLessonProgress(),
        ]);

        if (active) {
          setProgressSummary(summary);
          setLessonRecords(records);
        }
      } catch (error) {
        console.error("Could not load dashboard progress:", error);
      }
    };

    void loadDashboardProgress();

    return () => {
      active = false;
    };
  }, []);

  const recentLesson = [...lessonRecords]
    .filter((record) => record.lastAccessedAt)
    .sort(
      (a, b) =>
        new Date(b.lastAccessedAt!).getTime() -
        new Date(a.lastAccessedAt!).getTime()
    )[0];

  const recentLessonTitle = recentLesson
    ? lessonCatalog[recentLesson.lessonId]?.concept ?? recentLesson.lessonId
    : "Introduction to Programming";

  const openRecentLesson = () => {
    const id = recentLesson?.lessonId ?? "java-intro";

    setSelectedChapter({
      id,
      title: recentLessonTitle,
    });

    setActivePage("Lesson");
  };

  const modulePrefixes: Record<number, string[]> = {
    1: ["java-"],
    2: ["ds-"],
    3: ["adv-"],
    4: ["algo-"],
  };

  const getModuleProgress = (moduleId: number, total: number) => {
    const prefixes = modulePrefixes[moduleId] ?? [];

    const completed = lessonRecords.filter(
      (record) =>
        record.completed &&
        prefixes.some((prefix) => record.lessonId.startsWith(prefix))
    ).length;

    return {
      completed,
      percentage: Math.round((completed / total) * 100),
    };
  };

  const currentModule = modules.find(
    (module) => module.id === selectedModule
  )!;

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My Learning", icon: BookOpen },
  ];

  const openModule = (id: number) => {
    setSelectedModule(id);
    setActivePage("My Learning");
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "sidebar-visible" : ""
        }`}
      >
        <a href="#" className="dashboard-logo">
          <span className="logo-mark">A</span>
          ALGORIX<span className="logo-dot">.</span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`sidebar-link ${
                activePage === name ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(name);
                setSidebarOpen(false);
              }}
            >
              <Icon size={19} />
              {name}
            </button>
          ))}
        </nav>

        <div className="sidebar-label learning-label">
          LEARNING PATHS
        </div>

        <div className="sidebar-modules">
          {modules.map(({ id, number, title, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar-module ${
                selectedModule === id && activePage === "My Learning"
                  ? "selected"
                  : ""
              }`}
              onClick={() => openModule(id)}
            >
              <Icon size={17} />
              <span>
                {number}. {title}
              </span>
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button
            className="sidebar-link"
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={18} />
            Settings
          </button>

          <button className="sidebar-link logout-link" onClick={onLogout}>
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <div style={{ position: "relative" }}>
              <label className="dashboard-search">
                <Search size={17} />
                <input
                  placeholder="Search all 46 chapters..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <kbd>⌘ K</kbd>
              </label>

              {search.trim() && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  background: "#171329",
                  border: "1px solid rgba(167,139,250,0.3)",
                  borderRadius: "12px",
                  padding: "8px",
                  maxHeight: "320px",
                  overflowY: "auto"
                }}>
                  {searchResults.length > 0 ? searchResults.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => openSearchResult(chapter)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "12px",
                        border: "none",
                        borderRadius: "8px",
                        background: "transparent",
                        color: "#f4f0ff",
                        textAlign: "left",
                        cursor: "pointer"
                      }}
                    >
                      <BookOpen size={16} />
                      <span>{chapter.title}</span>
                      <ArrowRight size={15} style={{ marginLeft: "auto" }} />
                    </button>
                  )) : (
                    <p style={{ padding: "12px", color: "#aaa", margin: 0 }}>
                      No matching chapters found.
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              className="notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span />
            </button>

            <div className="topbar-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content">

          {/* OVERVIEW */}
          {activePage === "Overview" && (
            <>
              <AlgorithmCenter
                onOpenLesson={(chapterId, title) => {
                  setSelectedChapter({ id: chapterId, title });
                  setActivePage("Lesson");
                  setSearch("");
                }}
              />

              <section className="welcome-section">
                <div>
                  <span className="dashboard-eyebrow">
                    YOUR LEARNING COMMAND CENTER
                  </span>

                  <h1>
                    Welcome back,{" "}
                    <span>{user.name.split(" ")[0]}.</span>
                  </h1>

                  <p>
                    Your next breakthrough starts with what you learn today.
                  </p>
                </div>

                <div className="welcome-badge">
                  <BrainCircuit size={22} />
                  <span>THINK. CODE. CONQUER.</span>
                </div>
              </section>

              <section className="stats-grid">
                <article className="stat-card">
                  <div className="stat-icon violet">
                    <BookOpen />
                  </div>

                  <span>Lessons completed</span>

                  <strong>
                    {progressSummary.completedLessons} <small>/ 46</small>
                  </strong>

                  <div className="stat-progress">
                    <span
                      style={{
                        width: `${Math.min(
                          100,
                          (progressSummary.completedLessons / 46) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </article>

                <article className="stat-card">
                  <div className="stat-icon cyan">
                    <GraduationCap />
                  </div>

                  <span>Lessons started</span>

                  <strong>
                    {progressSummary.totalLessonsStarted}
                  </strong>

                  <p>Keep moving forward</p>
                </article>

                <article className="stat-card">
                  <div className="stat-icon pink">
                    <Target />
                  </div>

                  <span>Average quiz score</span>

                  <strong>
                    {Math.round(progressSummary.averageQuizScore)}
                    <small>%</small>
                  </strong>

                  <p>Your learning accuracy</p>
                </article>

                <article className="stat-card">
                  <div className="stat-icon lime">
                    <Flame />
                  </div>

                  <span>Overall completion</span>

                  <strong>
                    {Math.round(progressSummary.completionPercentage)}
                    <small>%</small>
                  </strong>

                  <div className="stat-progress">
                    <span
                      style={{
                        width: `${Math.min(
                          100,
                          progressSummary.completionPercentage
                        )}%`,
                      }}
                    />
                  </div>
                </article>
              </section>

              <section className="dashboard-section">
                <div className="dashboard-section-heading">
                  <div>
                    <span className="dashboard-eyebrow">
                      STRUCTURED LEARNING
                    </span>

                    <h2>Your learning paths</h2>

                    <p>
                      Four stages. One journey towards mastery.
                    </p>
                  </div>

                  <button
                    className="text-action"
                    onClick={() => setActivePage("My Learning")}
                  >
                    View all <ArrowRightIcon />
                  </button>
                </div>

                <div className="learning-grid">
                  {modules.map(
                    ({
                      id,
                      number,
                      title,
                      description,
                      chapters,
                      icon: Icon,
                      color,
                    }) => (
                      <article className="learning-card" key={id}>
                        <div className="learning-card-top">
                          <div className={`learning-icon ${color}`}>
                            <Icon size={24} />
                          </div>

                          <span className="module-number">
                            {number}
                          </span>
                        </div>

                        <h3>{title}</h3>

                        <p>{description}</p>

                        <div className="learning-card-meta">
                          <span>
                            <BookOpen size={14} />
                            {chapters} chapters
                          </span>

                          <span>
                            {getModuleProgress(id, chapters).percentage}%
                            complete
                          </span>
                        </div>

                        <div className="learning-progress">
                          <span
                            style={{
                              width: `${
                                getModuleProgress(id, chapters).percentage
                              }%`,
                            }}
                          />
                        </div>

                        <button onClick={() => openModule(id)}>
                          Explore module <ChevronRight size={16} />
                        </button>
                      </article>
                    )
                  )}
                </div>
              </section>

              <section className="continue-section">
                <div className="continue-icon">
                  <Play size={22} />
                </div>

                <div>
                  <span className="dashboard-eyebrow">
                    PICK UP WHERE YOU LEFT OFF
                  </span>

                  <h3>{recentLessonTitle}</h3>

                  <p>
                    {recentLesson
                      ? "Your most recently accessed chapter"
                      : "Programming Foundations · Start your first chapter"}
                  </p>
                </div>

                <button onClick={openRecentLesson}>
                  {recentLesson ? "Resume learning" : "Start learning"}
                  <ArrowRight size={16} />
                </button>
              </section>
            </>
          )}

          {/* MY LEARNING */}
          {activePage === "My Learning" && (
            <>
              <section className="welcome-section">
                <div>
                  <span className="dashboard-eyebrow">
                    YOUR LEARNING PATH
                  </span>

                  <h1>{currentModule.title}</h1>

                  <p>{currentModule.description}</p>
                </div>

                <span className="module-number large">
                  {currentModule.number}
                </span>
              </section>

              <CurriculumPanel
                moduleId={selectedModule}
                onStart={(chapterId, title) => {
                  setSelectedChapter({
                    id: chapterId,
                    title,
                  });

                  setActivePage("Lesson");
                }}
              />
            </>
          )}

          {/* LESSON */}
          {activePage === "Lesson" && (
            <LessonPlayer
              lessonId={selectedChapter.id}
              lessonTitle={selectedChapter.title}
              onBack={() => setActivePage("My Learning")}
            />
          )}

          {/* CODING PRACTICE */}

          {/* ACHIEVEMENTS */}

          {/* SETTINGS */}
          {activePage === "Settings" && (
            <section className="empty-state">
              <Settings size={42} />

              <h2>Account settings</h2>

              <p>Signed in as {user.email}</p>

              <button
                className="dashboard-logout"
                onClick={onLogout}
              >
                <LogOut size={16} />
                Log out
              </button>
            </section>
          )}

          <footer className="dashboard-footer">
            <span>© 2026 ALGORIX</span>
            <span>Think. Code. Conquer.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function ArrowRightIcon() {
  return <ChevronRight size={16} />;
}
