import { useEffect, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  GraduationCap,
  Layers3,
  Sparkles,
  Trophy,
  Zap,
  Network,
  Terminal,
  X,
  LogOut,
  User,
  Lock,
  Mail,
} from "lucide-react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  type AuthResponse,
} from "./services/authService";
import "./App.css";
import Dashboard from "./components/Dashboard";

type AuthMode = "login" | "register";

const features = [
  {
    icon: BrainCircuit,
    title: "Intelligent Learning",
    description: "Learn programming through structured explanations and intelligent assistance.",
    color: "violet",
  },
  {
    icon: Layers3,
    title: "DSA Mastery",
    description: "Master data structures and algorithms through practical applications.",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    description: "Solve problems, develop logic and strengthen your programming skills.",
    color: "pink",
  },
  {
    icon: Trophy,
    title: "Track Your Growth",
    description: "Monitor your progress, achievements and problem-solving journey.",
    color: "lime",
  },
];

const modules = [
  {
    number: "01",
    title: "Programming Foundations",
    description: "Java, variables, loops, methods and object-oriented programming.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Core Data Structures",
    description: "Arrays, strings, linked lists, stacks, queues, trees and heaps.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Advanced DSA",
    description: "Graphs, recursion, backtracking, greedy algorithms and dynamic programming.",
    icon: Network,
  },
  {
    number: "04",
    title: "Advanced Algorithms",
    description: "Advanced data structures, optimization and algorithm engineering.",
    icon: BrainCircuit,
  },
];

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("algorix_token");

      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        logoutUser();
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
  }, []);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setError("");
    setSuccess("");
    setPassword("");
    setModalOpen(true);
  };

  const closeAuth = () => {
    setModalOpen(false);
    setError("");
    setSuccess("");
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let authenticatedUser: AuthResponse;

      if (authMode === "register") {
        authenticatedUser = await registerUser({
          name,
          email,
          password,
        });
      } else {
        authenticatedUser = await loginUser({
          email,
          password,
        });
      }

      setUser(authenticatedUser);
      setSuccess(
        authMode === "register"
          ? "Your ALGORIX account has been created!"
          : "Welcome back to ALGORIX!"
      );

      setTimeout(() => {
        setModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setSuccess("");
      }, 900);
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? (err as {
              response?: {
                data?: {
                  message?: string;
                  detail?: string;
                };
              };
            }).response?.data
          : undefined;

      setError(
        message?.message ||
          message?.detail ||
          "Something went wrong. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  const startLearning = () => {
    if (!user) {
      openAuth("register");
      return;
    }

    document.getElementById("modules")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (user && !checkingSession) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <main className="app">
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-mark">A</span>
          ALGORIX<span className="logo-dot">.</span>
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#modules">Learning paths</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          {checkingSession ? (
            <span className="auth-loading">Loading...</span>
          ) : user ? (
            <>
              <span className="user-greeting">
                <User size={15} />
                {user.name}
              </span>
              <button className="login-button" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="login-button"
                onClick={() => openAuth("login")}
              >
                Log in
              </button>

              <button
                className="primary-button"
                onClick={() => openAuth("register")}
              >
                Get started <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      </nav>

      <section className="hero" id="about">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="hero-content">
          <div className="announcement">
            <Sparkles size={14} />
            THE NEXT GENERATION OF INTELLIGENT LEARNING
          </div>

          <h1>
            Think beyond code.
            <br />
            <span>Master the logic.</span>
          </h1>

          <p className="hero-description">
            From your first line of Java to advanced algorithm mastery.
            Learn concepts deeply, build problem-solving skills and
            become a better developer.
          </p>

          <div className="hero-buttons">
            <button className="primary-button hero-cta" onClick={startLearning}>
              {user ? "Continue learning" : "Start learning"}
              <ArrowRight size={18} />
            </button>

            <a href="#modules" className="secondary-button">
              <Code2 size={17} /> Explore modules
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>04</strong>
              <span>Learning modules</span>
            </div>
            <div>
              <strong>07</strong>
              <span>Backend algorithms</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Ways to grow</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="visual-card">
            <div className="visual-header">
              <span className="live-dot" />
              ALGORIX ENGINE
              <span className="visual-menu">•••</span>
            </div>

            <div className="visual-title">
              <span>Learning environment</span>
              <h3>Algorithm Mastery</h3>
            </div>

            <div className="code-window">
              <div><span>01</span> <b>public class</b> <em>Learning</em> {"{"}</div>
              <div><span>02</span> &nbsp; <b>void</b> masterLogic() {"{"}</div>
              <div><span>03</span> &nbsp;&nbsp; System.out.println(</div>
              <div><span>04</span> &nbsp;&nbsp;&nbsp; <i>"Think. Code. Conquer."</i>);</div>
              <div><span>05</span> &nbsp; {"}"}</div>
              <div><span>06</span> {"}"}</div>
            </div>

            <div className="visual-footer">
              <span><Zap size={14} /> Intelligent learning</span>
              <span className="complexity">READY</span>
            </div>
          </div>

          <div className="floating-card floating-top">
            <BrainCircuit size={20} />
            <span>Logic first</span>
          </div>

          <div className="floating-card floating-bottom">
            <Terminal size={20} />
            <span>Build your skills</span>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">THE ALGORIX EXPERIENCE</span>
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
          {features.map(({ icon: Icon, title, description, color }) => (
            <article className="feature-card" key={title}>
              <div className={`feature-icon ${color}`}>
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href="#modules">
                Explore <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="modules-section" id="modules">
        <div className="section-heading">
          <span className="eyebrow">YOUR LEARNING JOURNEY</span>
          <h2>
            Start simple.
            <br />
            <span>Go beyond limits.</span>
          </h2>
          <p>
            A structured path from programming foundations to advanced
            algorithm engineering.
          </p>
        </div>

        <div className="module-grid">
          {modules.map(({ number, title, description, icon: Icon }) => (
            <article className="module-card" key={number}>
              <div className="module-top">
                <span>{number}</span>
                <Icon size={23} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="module-bottom">
                <span>LEARNING MODULE</span>
                <ArrowRight size={18} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" />
        <Sparkles size={26} />
        <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
        <h2>
          Don't just learn to code.
          <br />
          <span>Learn to think.</span>
        </h2>
        <p>Build strong foundations. Master the logic. Create your future.</p>
        <button className="primary-button hero-cta" onClick={startLearning}>
          {user ? "Continue learning" : "Get started"}
          <ArrowRight size={17} />
        </button>
      </section>

      <footer className="footer">
        <a href="#" className="logo">
          <span className="logo-mark">A</span>
          ALGORIX<span className="logo-dot">.</span>
        </a>
        <p>Think. Code. Conquer.</p>
        <span>© 2026 ALGORIX. All rights reserved.</span>
      </footer>

      {modalOpen && (
        <div
          className="auth-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAuth();
          }}
        >
          <div className="auth-modal">
            <button
              className="auth-close"
              onClick={closeAuth}
              aria-label="Close authentication"
            >
              <X size={20} />
            </button>

            <div className="auth-brand">
              <span className="logo-mark">A</span>
              <span>ALGORIX<span className="logo-dot">.</span></span>
            </div>

            <div className="auth-heading">
              <span className="eyebrow">
                {authMode === "login" ? "WELCOME BACK" : "JOIN THE COMMUNITY"}
              </span>

              <h2>
                {authMode === "login" ? "Welcome back." : "Create your account."}
              </h2>

              <p>
                {authMode === "login"
                  ? "Continue your journey towards algorithm mastery."
                  : "Start building your programming and problem-solving skills."}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleAuth}>
              {authMode === "register" && (
                <label>
                  Full name
                  <div className="auth-input-wrap">
                    <User size={18} />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </div>
                </label>
              )}

              <label>
                Email address
                <div className="auth-input-wrap">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>

              <label>
                Password
                <div className="auth-input-wrap">
                  <Lock size={18} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={authMode === "register" ? 8 : undefined}
                    required
                  />
                </div>
              </label>

              {error && <div className="auth-message error">{error}</div>}
              {success && <div className="auth-message success">{success}</div>}

              <button
                className="primary-button auth-submit"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : authMode === "login"
                    ? "Log in"
                    : "Create account"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <div className="auth-switch">
              {authMode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() => {
                  setAuthMode(authMode === "login" ? "register" : "login");
                  setError("");
                  setSuccess("");
                  setPassword("");
                }}
              >
                {authMode === "login" ? "Sign up" : "Log in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;