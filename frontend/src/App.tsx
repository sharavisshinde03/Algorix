
import { useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  BookOpen,
  Code2,
  GraduationCap,
  Layers3,
  Sparkles,
  Trophy,
  Zap,
  Flame,
  Target,
  LogOut,
  LayoutDashboard,
  Coffee,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";

import AuthModal from "./components/AuthModal";
import { logoutUser } from "./services/authService";
import JavaLearning from "./pages/JavaLearning";
import AlgorithmWorkspace from "./pages/AlgorithmWorkspace";
import "./App.css";

const features = [
  {
    icon: BrainCircuit,
    title: "Learn Java from Zero",
    description:
      "Build your programming foundation with patient, structured lessons.",
    color: "violet",
  },
  {
    icon: Layers3,
    title: "Master Data Structures",
    description:
      "Understand arrays, trees, graphs and advanced algorithms visually.",
    color: "cyan",
  },
  {
    icon: Sparkles,
    title: "AI Voice Teacher",
    description:
      "Ask questions, hear explanations and learn at your own pace.",
    color: "pink",
  },
  {
    icon: Code2,
    title: "Code and Practice",
    description:
      "Write Java solutions, run test cases and develop problem-solving skills.",
    color: "lime",
  },
];

function App() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(
    null
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("algoverse_user") || ""
  );

  const [activeSection, setActiveSection] = useState("dashboard");

  function handleLogin(name: string) {
    setUserName(name);
    localStorage.setItem("algoverse_user", name);
    setAuthMode(null);
  }

  function handleLogout() {
    logoutUser();
    localStorage.removeItem("algoverse_user");
    setUserName("");
    setActiveSection("dashboard");
  }

  if (userName) {
    return (
      <main className="app dashboard-app">
        <aside className="dashboard-sidebar">
          <a
            className="logo"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setActiveSection("dashboard");
            }}
          >
            <span className="logo-icon">A</span>
            ALGOVERSE<span className="logo-dot">.</span>
          </a>

          <div className="sidebar-label">WORKSPACE</div>

          <button
            className={`sidebar-link ${
              activeSection === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "java" ? "active" : ""
            }`}
            onClick={() => setActiveSection("java")}
          >
            <Coffee size={19} />
            Java Learning
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "dsa" ? "active" : ""
            }`}
            onClick={() => setActiveSection("dsa")}
          >
            <BrainCircuit size={19} />
            Data Structures
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "practice" ? "active" : ""
            }`}
            onClick={() => setActiveSection("practice")}
          >
            <Code2 size={19} />
            Coding Practice
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "leetcode" ? "active" : ""
            }`}
            onClick={() => setActiveSection("leetcode")}
          >
            <LinkIcon size={19} />
            LeetCode
          </button>

          <button
            className={`sidebar-link ${
              activeSection === "achievements" ? "active" : ""
            }`}
            onClick={() => setActiveSection("achievements")}
          >
            <Trophy size={19} />
            Achievements
          </button>

          <div className="sidebar-bottom">
            <div className="sidebar-profile">
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className="profile-info">
                <strong>{userName}</strong>
                <span>ALGOVERSE Student</span>
              </div>
            </div>

            <button className="sidebar-logout" onClick={handleLogout}>
              <LogOut size={17} />
              Log out
            </button>
          </div>
        </aside>

        <section className="dashboard-main">
          {activeSection === "java" ? (
            <JavaLearning
              onBack={() => setActiveSection("dashboard")}
            />
          ) : activeSection === "leetcode" ? (
            <section className="dashboard-panel section-placeholder">
              <div className="placeholder-icon">
                <LinkIcon size={38} />
              </div>
              <span className="eyebrow">CODING PRACTICE</span>
              <h1>LeetCode</h1>
              <p>LeetCode integration is unavailable in this build.</p>
              <button
                className="primary-button"
                onClick={() => setActiveSection("dashboard")}
              >
                Back to dashboard <ArrowRight size={17} />
              </button>
            </section>
          ) : (
            <>
              <header className="dashboard-topbar">
                <div>
                  <span className="eyebrow">YOUR LEARNING SPACE</span>
                  <h2>Student Dashboard</h2>
                </div>

                <div className="dashboard-top-profile">
                  <div className="profile-avatar">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span>{userName}</span>
                </div>
              </header>

              {activeSection === "dashboard" && (
                <>
                  <section className="dashboard-welcome">
                    <div>
                      <span className="welcome-tag">
                        <Sparkles size={14} />
                        YOUR JOURNEY CONTINUES
                      </span>

                      <h1>
                        Welcome back,
                        <br />
                        <span>{userName}!</span>
                      </h1>

                      <p>
                        Every great developer starts somewhere. Keep
                        learning, keep building and master the logic
                        behind every algorithm.
                      </p>

                      <button
                        className="primary-button"
                        onClick={() => setActiveSection("java")}
                      >
                        Continue learning <ArrowRight size={17} />
                      </button>
                    </div>

                    <div className="welcome-illustration">
                      <div className="welcome-orbit">
                        <div className="welcome-icon">
                          <BrainCircuit size={65} />
                        </div>
                        <div className="floating-icon floating-one">
                          <Code2 size={22} />
                        </div>
                        <div className="floating-icon floating-two">
                          <Zap size={22} />
                        </div>
                        <div className="floating-icon floating-three">
                          <Layers3 size={22} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="dashboard-stats">
                    <article className="stat-card">
                      <div className="stat-icon violet">
                        <BookOpen size={22} />
                      </div>
                      <span>Java progress</span>
                      <strong>0%</strong>
                      <small>Start your first lesson</small>
                    </article>

                    <article className="stat-card">
                      <div className="stat-icon cyan">
                        <Code2 size={22} />
                      </div>
                      <span>Problems solved</span>
                      <strong>0</strong>
                      <small>Begin coding practice</small>
                    </article>

                    <article className="stat-card">
                      <div className="stat-icon pink">
                        <Flame size={22} />
                      </div>
                      <span>Learning streak</span>
                      <strong>0 days</strong>
                      <small>Your journey starts today</small>
                    </article>

                    <article className="stat-card">
                      <div className="stat-icon lime">
                        <Target size={22} />
                      </div>
                      <span>Overall progress</span>
                      <strong>0%</strong>
                      <small>Build your mastery</small>
                    </article>
                  </section>

                  <section className="dashboard-content-grid">
                    <div className="dashboard-panel learning-panel">
                      <div className="panel-heading">
                        <div>
                          <span className="eyebrow">
                            YOUR CURRICULUM
                          </span>
                          <h2>Learning paths</h2>
                        </div>
                        <Sparkles color="#8B5CF6" size={22} />
                      </div>

                      <article className="course-card">
                        <div className="course-icon java-icon">
                          <Coffee size={27} />
                        </div>

                        <div className="course-details">
                          <span>BEGINNER LEVEL</span>
                          <h3>Java Programming</h3>
                          <p>
                            Start from variables, data types and
                            programming fundamentals.
                          </p>

                          <div className="course-progress">
                            <div className="progress-track">
                              <div style={{ width: "0%" }} />
                            </div>
                            <span>0% completed</span>
                          </div>

                          <button
                            className="course-action"
                            onClick={() => setActiveSection("java")}
                          >
                            Start learning <ChevronRight size={16} />
                          </button>
                        </div>
                      </article>

                      <article className="course-card">
                        <div className="course-icon dsa-icon">
                          <BrainCircuit size={27} />
                        </div>

                        <div className="course-details">
                          <span>CORE + ADVANCED</span>
                          <h3>Data Structures & Algorithms</h3>
                          <p>
                            Learn searching, sorting, trees, graphs and
                            advanced algorithms.
                          </p>

                          <div className="course-progress">
                            <div className="progress-track">
                              <div style={{ width: "0%" }} />
                            </div>
                            <span>0% completed</span>
                          </div>

                          <button
                            className="course-action"
                            onClick={() => setActiveSection("dsa")}
                          >
                            Explore curriculum <ChevronRight size={16} />
                          </button>
                        </div>
                      </article>
                    </div>

                    <div className="dashboard-panel quick-panel">
                      <div className="panel-heading">
                        <div>
                          <span className="eyebrow">GET STARTED</span>
                          <h2>Quick access</h2>
                        </div>
                        <Zap color="#22D3EE" size={22} />
                      </div>

                      <button
                        className="quick-action"
                        onClick={() => setActiveSection("java")}
                      >
                        <div className="quick-icon violet">
                          <GraduationCap />
                        </div>
                        <div>
                          <strong>Learn Java</strong>
                          <span>Build your foundation</span>
                        </div>
                        <ArrowRight size={17} />
                      </button>

                      <button
                        className="quick-action"
                        onClick={() => setActiveSection("dsa")}
                      >
                        <div className="quick-icon cyan">
                          <Layers3 />
                        </div>
                        <div>
                          <strong>Explore algorithms</strong>
                          <span>Understand the logic</span>
                        </div>
                        <ArrowRight size={17} />
                      </button>

                      <button
                        className="quick-action"
                        onClick={() => setActiveSection("practice")}
                      >
                        <div className="quick-icon pink">
                          <Code2 />
                        </div>
                        <div>
                          <strong>Practice coding</strong>
                          <span>Solve programming problems</span>
                        </div>
                        <ArrowRight size={17} />
                      </button>

                      <button
                        className="quick-action"
                        onClick={() => setActiveSection("leetcode")}
                      >
                        <div className="quick-icon violet">
                          <LinkIcon />
                        </div>
                        <div>
                          <strong>Connect LeetCode</strong>
                          <span>Check account verification</span>
                        </div>
                        <ArrowRight size={17} />
                      </button>

                      <div className="dashboard-motivation">
                        <Sparkles size={20} />
                        <p>
                          <strong>Small steps. Big mastery.</strong>
                          Consistency is the key to becoming a great
                          developer.
                        </p>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activeSection === "dsa" ? (
                <AlgorithmWorkspace />
              ) : activeSection !== "dashboard" ? (
                <section className="dashboard-panel section-placeholder">
                  <div className="placeholder-icon">
                    {activeSection === "practice" && (
                      <Code2 size={38} />
                    )}
                    {activeSection === "achievements" && (
                      <Trophy size={38} />
                    )}
                  </div>

                  <span className="eyebrow">
                    COMING UP IN ALGOVERSE
                  </span>

                  <h1>
                    {activeSection === "practice" && "Coding Practice"}
                    {activeSection === "achievements" &&
                      "Your Achievements"}
                  </h1>

                  <p>
                    This learning section is being built. Soon you'll
                    be able to learn, visualize, practice and track
                    your progress here.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => setActiveSection("dashboard")}
                  >
                    Back to dashboard <ArrowRight size={17} />
                  </button>
                </section>
              ) : null}

              <footer className="dashboard-footer">
                <span>© 2026 ALGOVERSE</span>
                <span>
                  From your first line of Java to advanced algorithm mastery.
                </span>
              </footer>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <nav className="navbar">
        <a className="logo" href="/">
          <span className="logo-icon">A</span>
          ALGOVERSE<span className="logo-dot">.</span>
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#learning">Learning paths</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <button
            className="login-button"
            onClick={() => setAuthMode("login")}
          >
            Log in
          </button>

          <button
            className="primary-button"
            onClick={() => setAuthMode("register")}
          >
            Get started <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <section className="hero" id="about">
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="announcement">
            <Sparkles size={14} />
            YOUR JOURNEY TO ALGORITHM MASTERY STARTS HERE
          </div>

          <h1>
            Think in code.
            <br />
            <span>Master the logic.</span>
          </h1>

          <p className="hero-description">
            From your first line of Java to advanced algorithm mastery.
            Learn through intelligent teaching, interactive visualizations
            and hands-on coding.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button hero-cta"
              onClick={() => setAuthMode("register")}
            >
              Start learning <ArrowRight size={18} />
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById("learning")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Code2 size={17} /> Explore algorithms
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>01</strong>
              <span>Start from zero</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Possibilities to learn</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Learn by understanding</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="visual-card">
            <div className="visual-header">
              <span className="live-dot" />
              ALGORITHM LAB
              <span className="visual-menu">•••</span>
            </div>

            <div className="visual-title">
              <span>Sorting algorithm</span>
              <h3>Bubble Sort</h3>
            </div>

            <div className="array-bars">
              {[35, 65, 45, 90, 55, 75, 25].map(
                (height, index) => (
                  <div
                    key={index}
                    className={`array-bar bar-${index}`}
                    style={{ height: `${height}%` }}
                  >
                    <span>{[3, 6, 4, 9, 5, 7, 2][index]}</span>
                  </div>
                )
              )}
            </div>

            <div className="visual-progress">
              <div className="progress-label">
                <span>Execution progress</span>
                <span>65%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" />
              </div>
            </div>

            <div className="visual-footer">
              <span>
                <Zap size={14} /> Step-by-step execution
              </span>
              <span className="complexity">O(n²)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">THE ALGOVERSE EXPERIENCE</span>
          <h2>
            Everything you need to
            <br />
            <span>become a better developer.</span>
          </h2>
          <p>
            Learn concepts deeply, visualize how they work and put your
            knowledge into practice.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="feature-card" key={feature.title}>
                <div className={`feature-icon ${feature.color}`}>
                  <Icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#learning">
                  Explore <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="learning-section" id="learning">
        <div>
          <span className="eyebrow">YOUR LEARNING JOURNEY</span>
          <h2>
            Start simple.
            <br />
            <span>Go beyond limits.</span>
          </h2>
          <p>
            Follow a structured journey from Java fundamentals to
            advanced data structures, competitive programming and
            algorithm engineering.
          </p>
          <button
            className="primary-button"
            onClick={() => setAuthMode("register")}
          >
            Explore learning paths <ArrowRight size={17} />
          </button>
        </div>

        <div className="learning-steps">
          <div className="learning-step">
            <span>01</span>
            <GraduationCap />
            <div>
              <h3>Java Foundations</h3>
              <p>Learn programming from absolute zero.</p>
            </div>
          </div>

          <div className="learning-step">
            <span>02</span>
            <Layers3 />
            <div>
              <h3>Data Structures & Algorithms</h3>
              <p>Build strong problem-solving foundations.</p>
            </div>
          </div>

          <div className="learning-step">
            <span>03</span>
            <Code2 />
            <div>
              <h3>Advanced Algorithm Mastery</h3>
              <p>Explore advanced techniques and applications.</p>
            </div>
          </div>

          <div className="learning-step">
            <span>04</span>
            <Trophy />
            <div>
              <h3>Practice & Achieve</h3>
              <p>Solve problems and track your progress.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a className="logo" href="/">
          <span className="logo-icon">A</span>
          ALGOVERSE<span className="logo-dot">.</span>
        </a>
        <p>
          From your first line of Java to advanced algorithm mastery.
        </p>
        <span>© 2026 ALGOVERSE</span>
      </footer>

      {authMode && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthMode(null)}
          onSuccess={handleLogin}
        />
      )}
    </main>
  );
}

export default App;
