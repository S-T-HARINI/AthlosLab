import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Zap, 
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CodevoraLogo from '../components/CodevoraLogo';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Smooth scroll handler for About section
  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll handler for Languages section
  const handleScrollToLanguages = (e) => {
    e.preventDefault();
    const element = document.getElementById('languages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      
      {/* NAVBAR SECTION */}
      <header className="home-navbar">
        <div className="home-navbar-inner">
          {/* Logo & Brand Name */}
          <Link to="/" className="home-brand">
            <CodevoraLogo size={38} />
            <span className="home-brand-name">AthlosLab</span>
          </Link>

          {/* Navigation Links */}
          <nav className="home-nav-links">
            <Link to="/" className="home-nav-item active">
              Home
            </Link>
            <a href="#about" onClick={handleScrollToAbout} className="home-nav-item">
              About
            </a>
            <a href="#languages" onClick={handleScrollToLanguages} className="home-nav-item">
              Languages
            </a>

            {/* Dynamic Authenticated vs Unauthenticated User Navbar Navigation */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a5b4fc', fontSize: '0.925rem', fontWeight: 600 }}>
                  <User size={16} />
                  <span>Welcome, {user?.username}</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="home-nav-item home-nav-login"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', background: 'transparent' }}
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="home-nav-item home-nav-login">
                  Login
                </Link>
                <Link to="/signup" className="home-nav-item home-nav-signup">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-glow"></div>
        <div className="home-hero-content">
          
          <div className="home-tagline-badge">
            <Sparkles size={15} />
            <span>Learn. Practice. Compete.</span>
          </div>

          <h1 className="home-hero-title">
            Master Programming Through <span className="home-highlight-gradient">Code Quests</span>
          </h1>

          <p className="home-hero-description">
            AthlosLab is a developer-focused learning and competitive coding platform. 
            Build deep conceptual knowledge, solve real-world problems, and level up your skills in 
            <strong> C</strong>, <strong>C++</strong>, <strong>Java</strong>, and <strong>Python</strong>.
          </p>

          <div className="home-hero-actions">
            {isAuthenticated ? (
              <a href="#languages" onClick={handleScrollToLanguages} className="home-btn-primary">
                <span>Explore Quests</span>
                <ArrowRight size={18} />
              </a>
            ) : (
              <Link to="/signup" className="home-btn-primary">
                <span>Start Learning</span>
                <ArrowRight size={18} />
              </Link>
            )}

            <a href="#languages" onClick={handleScrollToLanguages} className="home-btn-secondary">
              <span>Explore Languages</span>
              <ChevronRight size={18} />
            </a>
          </div>

          <div className="home-hero-stats">
            <div className="home-stat-chip">
              <Flame size={16} className="text-amber" />
              <span>Interactive Quests</span>
            </div>
            <div className="home-stat-chip">
              <Zap size={16} className="text-emerald" />
              <span>Instant Code Feedback</span>
            </div>
            <div className="home-stat-chip">
              <Trophy size={16} className="text-cyan" />
              <span>Global Leaderboard</span>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT / FEATURES SECTION */}
      <section id="about" className="home-features-section">
        <div className="home-section-header">
          <span className="home-section-tag">PLATFORM CAPABILITIES</span>
          <h2 className="home-section-title">Designed for Modern Developers</h2>
          <p className="home-section-subtitle">
            A comprehensive ecosystem to take you from core syntax fundamentals to competitive mastery.
          </p>
        </div>

        <div className="home-features-grid">
          
          <div className="home-feature-card">
            <div className="home-feature-icon-box icon-indigo">
              <BookOpen size={28} />
            </div>
            <h3 className="home-feature-title">Learn</h3>
            <p className="home-feature-text">
              Access structured programming notes, memory concepts, algorithm walkthroughs, and clear syntax guides.
            </p>
            <ul className="home-feature-list">
              <li>Comprehensive notes & cheat sheets</li>
              <li>Core language mechanics explained</li>
              <li>Interactive code samples</li>
            </ul>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon-box icon-cyan">
              <Code2 size={28} />
            </div>
            <h3 className="home-feature-title">Practice</h3>
            <p className="home-feature-text">
              Solve curated coding problems categorized across progressive difficulty tiers with automated test cases.
            </p>
            <div className="home-difficulty-badges">
              <span className="level-badge easy">Easy</span>
              <span className="level-badge medium">Medium</span>
              <span className="level-badge hard">Hard</span>
              <span className="level-badge test">Test</span>
            </div>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon-box icon-emerald">
              <Trophy size={28} />
            </div>
            <h3 className="home-feature-title">Compete</h3>
            <p className="home-feature-text">
              Participate in live coding competitions, earn XP rewards, maintain daily streaks, and climb global leaderboards.
            </p>
            <ul className="home-feature-list">
              <li>Live timed coding contests</li>
              <li>XP progression & streak tracking</li>
              <li>Global & tier leaderboards</li>
            </ul>
          </div>

        </div>
      </section>

      {/* LANGUAGES SECTION */}
      <section id="languages" className="home-languages-section">
        <div className="home-section-header">
          <span className="home-section-tag">MULTI-LANGUAGE SUPPORT</span>
          <h2 className="home-section-title">Supported Programming Languages</h2>
          <p className="home-section-subtitle">
            Hone your problem-solving skills across the industry's most essential languages.
          </p>
        </div>

        <div className="home-languages-grid">
          
          {/* Language 1: C */}
          <Link to="/learn/c" className="home-language-card" style={{ textDecoration: 'none' }}>
            <div className="home-lang-header">
              <div className="home-lang-badge lang-c">C</div>
              <span className="home-lang-tag">Low-Level Control</span>
            </div>
            <h3 className="home-lang-title">C Language</h3>
            <p className="home-lang-desc">
              Master pointers, manual memory allocation, data structures, and foundational computer architecture.
            </p>
            <div className="home-lang-footer">
              <span>20 Topics & Practice Quests</span>
              <ChevronRight size={16} />
            </div>
          </Link>

          {/* Language 2: C++ */}
          <Link to="/learn/cpp" className="home-language-card" style={{ textDecoration: 'none' }}>
            <div className="home-lang-header">
              <div className="home-lang-badge lang-cpp">C++</div>
              <span className="home-lang-tag">Competitive Power</span>
            </div>
            <h3 className="home-lang-title">C++ Language</h3>
            <p className="home-lang-desc">
              Harness object-oriented design, STL containers, fast I/O, and optimal competitive algorithm performance.
            </p>
            <div className="home-lang-footer">
              <span>20 Topics & Practice Quests</span>
              <ChevronRight size={16} />
            </div>
          </Link>

          {/* Language 3: Java */}
          <Link to="/learn/java" className="home-language-card" style={{ textDecoration: 'none' }}>
            <div className="home-lang-header">
              <div className="home-lang-badge lang-java">Java</div>
              <span className="home-lang-tag">Enterprise Standards</span>
            </div>
            <h3 className="home-lang-title">Java Language</h3>
            <p className="home-lang-desc">
              Build robust object-oriented software, master collection frameworks, multithreading, and enterprise logic.
            </p>
            <div className="home-lang-footer">
              <span>20 Topics & Practice Quests</span>
              <ChevronRight size={16} />
            </div>
          </Link>

          {/* Language 4: Python */}
          <Link to="/learn/python" className="home-language-card" style={{ textDecoration: 'none' }}>
            <div className="home-lang-header">
              <div className="home-lang-badge lang-python">Python</div>
              <span className="home-lang-tag">Rapid Scripting</span>
            </div>
            <h3 className="home-lang-title">Python Language</h3>
            <p className="home-lang-desc">
              Focus on algorithmic logic and data structures with clean syntax, versatile libraries, and rapid execution.
            </p>
            <div className="home-lang-footer">
              <span>20 Topics & Practice Quests</span>
              <ChevronRight size={16} />
            </div>
          </Link>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="home-cta-banner">
        <div className="home-cta-content">
          <h2>Ready to Begin Your Coding Quest?</h2>
          <p>Join AthlosLab today and start mastering C, C++, Java, and Python.</p>
          {isAuthenticated ? (
            <a href="#languages" className="home-btn-primary large">
              <span>Explore Quests</span>
              <ArrowRight size={20} />
            </a>
          ) : (
            <Link to="/signup" className="home-btn-primary large">
              <span>Create Free Account</span>
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          
          <div className="home-footer-brand">
            <div className="home-brand">
              <CodevoraLogo size={32} />
              <span className="home-brand-name">AthlosLab</span>
            </div>
            <p className="home-footer-desc">
              A developer-focused programming learning and competitive coding platform.
            </p>
          </div>

          <div className="home-footer-links-group">
            <div className="home-footer-col">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <a href="#about" onClick={handleScrollToAbout}>About</a>
              <a href="#languages" onClick={handleScrollToLanguages}>Languages</a>
              {!isAuthenticated && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
            </div>

            <div className="home-footer-col">
              <h4>Languages</h4>
              <span>C Language</span>
              <span>C++ Language</span>
              <span>Java Language</span>
              <span>Python Language</span>
            </div>

            <div className="home-footer-col">
              <h4>Platform</h4>
              <span>Learn Notes</span>
              <span>Practice Problems</span>
              <span>Competitions</span>
              <span>Leaderboards</span>
            </div>
          </div>

        </div>

        <div className="home-footer-bottom">
          <p>&copy; {new Date().getFullYear()} AthlosLab. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
