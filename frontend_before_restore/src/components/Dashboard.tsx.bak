import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Code2, Trophy, Search, ArrowRight,
  Settings, LogOut, Bell, ChevronRight, BrainCircuit,
  Layers3, Network, GraduationCap, Flame, Clock3,
  Target, Play, Lock, Menu, X
} from "lucide-react";
import type { AuthResponse } from "../services/authService";
import "./Dashboard.css";
import LessonPlayer from "./LessonPlayer";

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
    chapters: 5,
    icon: BrainCircuit,
    color: "lime",
  },
];

export default function Dashboard({ user, onLogout }: Props) {
  const [activePage, setActivePage] = useState("Overview");
  const [selectedModule, setSelectedModule] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentModule = modules.find(m => m.id === selectedModule)!;

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My Learning", icon: BookOpen },
    { name: "Coding Practice", icon: Code2 },
    { name: "Achievements", icon: Trophy },
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

      <aside className={`dashboard-sidebar ${sidebarOpen ? "sidebar-visible" : ""}`}>
        <a href="#" className="dashboard-logo">
          <span className="logo-mark">A</span>
          ALGORIX<span className="logo-dot">.</span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`sidebar-link ${activePage === name ? "active" : ""}`}
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

        <div className="sidebar-label learning-label">LEARNING PATHS</div>

        <div className="sidebar-modules">
          {modules.map(({ id, number, title, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar-module ${selectedModule === id && activePage === "My Learning" ? "selected" : ""}`}
              onClick={() => openModule(id)}
            >
              <Icon size={17} />
              <span>{number}. {title}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button
            className="sidebar-link"
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={18} /> Settings
          </button>
          <button className="sidebar-link logout-link" onClick={onLogout}>
            <LogOut size={18} /> Log out
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
            <label className="dashboard-search">
              <Search size={17} />
              <input
                placeholder="Search learning content..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>

            <button className="notification-button" aria-label="Notifications">
              <Bell size={19} />
              <span />
            </button>

            <div className="topbar-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {activePage === "Overview" && (
            <>
              <section className="welcome-section">
                <div>
                  <span className="dashboard-eyebrow">YOUR LEARNING COMMAND CENTER</span>
                  <h1>Welcome back, <span>{user.name.split(" ")[0]}.</span></h1>
                  <p>Your next breakthrough starts with what you learn today.</p>
                </div>

                <div className="welcome-badge">
                  <BrainCircuit size={22} />
                  <span>THINK. CODE. CONQUER.</span>
                </div>
              </section>

              <section className="stats-grid">
                <article className="stat-card">
                  <div className="stat-icon violet"><BookOpen /></div>
                  <span>Lessons completed</span>
                  <strong>0 <small>/ 45</small></strong>
                  <div className="stat-progress"><span style={{ width: "0%" }} /></div>
                </article>

                <article className="stat-card">
                  <div className="stat-icon cyan"><Target /></div>
                  <span>Problems solved</span>
                  <strong>0</strong>
                  <p>Start your coding journey</p>
                </article>

                <article className="stat-card">
                  <div className="stat-icon pink"><Flame /></div>
                  <span>Learning streak</span>
                  <strong>0 <small>days</small></strong>
                  <p>Build your daily habit</p>
                </article>

                <article className="stat-card">
                  <div className="stat-icon lime"><Clock3 /></div>
                  <span>Learning time</span>
                  <strong>0 <small>hrs</small></strong>
                  <p>Your journey starts now</p>
                </article>
              </section>

              <section className="dashboard-section">
                <div className="dashboard-section-heading">
                  <div>
                    <span className="dashboard-eyebrow">STRUCTURED LEARNING</span>
                    <h2>Your learning paths</h2>
                    <p>Four stages. One journey towards mastery.</p>
                  </div>
                  <button
                    className="text-action"
                    onClick={() => setActivePage("My Learning")}
                  >
                    View all <ArrowRightIcon />
                  </button>
                </div>

                <div className="learning-grid">
                  {modules.map(({ id, number, title, description, chapters, icon: Icon, color }) => (
                    <article className="learning-card" key={id}>
                      <div className="learning-card-top">
                        <div className={`learning-icon ${color}`}>
                          <Icon size={24} />
                        </div>
                        <span className="module-number">{number}</span>
                      </div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                      <div className="learning-card-meta">
                        <span><BookOpen size={14} /> {chapters} chapters</span>
                        <span>0% complete</span>
                      </div>
                      <div className="learning-progress"><span /></div>
                      <button onClick={() => openModule(id)}>
                        Explore module <ChevronRight size={16} />
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section className="continue-section">
                <div className="continue-icon"><Play size={22} /></div>
                <div>
                  <span className="dashboard-eyebrow">PICK UP WHERE YOU LEFT OFF</span>
                  <h3>Introduction to Programming</h3>
                  <p>Programming Foundations · Chapter 01</p>
                </div>
                <button onClick={() => openModule(1)}>
                  Start learning <ArrowRight size={16} />
                </button>
              </section>
            </>
          )}

          {activePage === "My Learning" && (
            <>
              <section className="welcome-section">
                <div>
                  <span className="dashboard-eyebrow">YOUR LEARNING PATH</span>
                  <h1>{currentModule.title}</h1>
                  <p>{currentModule.description}</p>
                </div>
                <span className="module-number large">{currentModule.number}</span>
              </section>

              <section className="course-overview">
                <div>
                  <span>COURSE PROGRESS</span>
                  <strong>0%</strong>
                  <div className="learning-progress"><span /></div>
                  <p>0 of {currentModule.chapters} chapters completed</p>
                </div>
                <div className="course-overview-icon">
                  <currentModule.icon size={38} />
                </div>
              </section>

              <section className="dashboard-section">
                <div className="dashboard-section-heading">
                  <div>
                    <span className="dashboard-eyebrow">COURSE CONTENT</span>
                    <h2>Chapters</h2>
                    <p>Follow the chapters in sequence to build your knowledge.</p>
                  </div>
                </div>

                {selectedModule === 1 ? (
                  <div className="chapter-list">
                    <article className="chapter-row available">
                      <div className="chapter-number">01</div>
                      <div className="chapter-info">
                        <span>CHAPTER 01</span>
                        <h3>Introduction to Programming</h3>
                        <p>Programming, languages, source code and program execution.</p>
                      </div>
                      <span className="chapter-status">READY TO LEARN</span>
                      <button
                        className="chapter-start"
                        onClick={() => setActivePage("Lesson")}
                      >
                        <Play size={16} /> Start
                      </button>
                    </article>

                    <div className="chapter-placeholder">
                      <BookOpen size={20} />
                      <div>
                        <strong>24 more chapters</strong>
                        <p>The remaining Java chapter titles and lessons will be added to the course curriculum.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="chapter-placeholder">
                    <Lock size={21} />
                    <div>
                      <strong>Course content is being prepared</strong>
                      <p>This learning path will contain structured chapters, lessons, examples and practice.</p>
                    </div>
                  </div>
                )}
              </section>
            </>
          )}

          {activePage === "Lesson" && (
            <LessonPlayer onBack={() => setActivePage("My Learning")} />
          )}

          {activePage === "Coding Practice" && (
            <section className="empty-state">
              <Code2 size={42} />
              <h2>Your coding workspace is coming next.</h2>
              <p>Practice problems, Java execution and submission tracking will live here.</p>
            </section>
          )}

          {activePage === "Achievements" && (
            <section className="empty-state">
              <Trophy size={42} />
              <h2>Your achievements start here.</h2>
              <p>Complete lessons and solve problems to build your achievement record.</p>
            </section>
          )}

          {activePage === "Settings" && (
            <section className="empty-state">
              <Settings size={42} />
              <h2>Account settings</h2>
              <p>Signed in as {user.email}</p>
              <button className="dashboard-logout" onClick={onLogout}>
                <LogOut size={16} /> Log out
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
