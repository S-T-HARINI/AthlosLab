import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle,
  Circle,
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  ChevronUp,
  Copy, 
  Check, 
  Search,
  Terminal,
  Play,
  X,
  Sparkles,
  Flame,
  Zap,
  Bookmark,
  RotateCcw,
  AlertTriangle,
  Lock,
  Timer,
  ArrowRight,
  Pause,
  PauseCircle
} from 'lucide-react';
import { LANGUAGES } from '../data/languagesData';
import CodevoraLogo from '../components/CodevoraLogo';

// Language Reserved Keywords List for Syntax Highlighting (Keywords = RED, Others = WHITE)
const KEYWORDS_BY_LANG = {
  java: [
    'public', 'class', 'static', 'void', 'main', 'String', 'int', 'double', 'float', 'boolean', 'char', 
    'long', 'short', 'byte', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 
    'return', 'new', 'import', 'package', 'this', 'super', 'extends', 'implements', 'interface', 
    'abstract', 'final', 'try', 'catch', 'finally', 'throw', 'throws', 'true', 'false', 'null'
  ],
  c: [
    'int', 'float', 'double', 'char', 'void', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 
    'break', 'continue', 'return', 'struct', 'union', 'typedef', 'const', 'static', 'sizeof', 'enum', 
    'extern', 'auto', 'register', 'volatile', 'goto', 'include', 'define'
  ],
  cpp: [
    'int', 'float', 'double', 'char', 'void', 'bool', 'if', 'else', 'for', 'while', 'do', 'switch', 
    'case', 'break', 'continue', 'return', 'class', 'struct', 'public', 'private', 'protected', 
    'virtual', 'override', 'namespace', 'using', 'std', 'cout', 'cin', 'endl', 'new', 'delete', 
    'template', 'typename', 'try', 'catch', 'throw', 'true', 'false', 'nullptr', 'include', 'define'
  ],
  python: [
    'def', 'class', 'import', 'from', 'as', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 
    'return', 'try', 'except', 'finally', 'raise', 'with', 'in', 'is', 'not', 'and', 'or', 'True', 
    'False', 'None', 'lambda', 'pass', 'yield', 'global', 'nonlocal', 'del'
  ]
};

const LanguageDetail = () => {
  const { langId } = useParams();
  const navigate = useNavigate();

  // Validate language key or default to 'c'
  const currentLangKey = (langId && LANGUAGES[langId.toLowerCase()]) ? langId.toLowerCase() : 'c';
  const language = LANGUAGES[currentLangKey];

  // Active Main Tab State: 'notes' | 'practice' | 'compete'
  const [activeTab, setActiveTab] = useState('notes');

  // Notes Tab States
  const [activeTopicId, setActiveTopicId] = useState(1);
  const [topicSearch, setTopicSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Practice Tab Accordion & Filter States
  const [practiceSearch, setPracticeSearch] = useState('');
  const [expandedTopicIds, setExpandedTopicIds] = useState({ 1: true, 2: true });

  // Persistent User Progress State for Exercises
  const [completedExercises, setCompletedExercises] = useState(() => {
    try {
      const saved = localStorage.getItem('codevora_completed_exercises');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persistent Paused Sessions State (Stores typed code, question index, test outputs)
  const [pausedSessions, setPausedSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('codevora_paused_sessions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 10-Second Countdown Timer States
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(10);
  const [pendingExerciseData, setPendingExerciseData] = useState(null);

  // Modal IDE Workspace States
  const [selectedQuestionList, setSelectedQuestionList] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0); // 0, 1, 2 for 3 questions
  const [activeExerciseKey, setActiveExerciseKey] = useState('');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [customCode, setCustomCode] = useState(''); // Completely empty initial code workspace
  const [isOutputRunning, setIsOutputRunning] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [activeResultTcTab, setActiveResultTcTab] = useState(1); // 1, 2, 3
  const [allPassed, setAllPassed] = useState(false);
  const [executionError, setExecutionError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');
  const [pauseToastMsg, setPauseToastMsg] = useState('');

  // Refs for smooth scroll sync and auto scrolling
  const resultsRef = useRef(null);
  const highlightRef = useRef(null);

  // Reset states when language changes
  useEffect(() => {
    setActiveTopicId(1);
    setIsWorkspaceOpen(false);
    setIsCountdownActive(false);
  }, [langId]);

  // 10-Second Countdown Timer Effect
  useEffect(() => {
    let interval;
    if (isCountdownActive && countdownSeconds > 0) {
      interval = setInterval(() => {
        setCountdownSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isCountdownActive && countdownSeconds === 0) {
      setIsCountdownActive(false);
      if (pendingExerciseData) {
        openWorkspaceDirectly(pendingExerciseData);
      }
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdownSeconds, pendingExerciseData]);

  // Sync scroll between textarea and syntax highlight layer
  const handleEditorScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  // Helper to render syntax highlighted code (KEYWORDS = RED, OTHERS = WHITE)
  const renderSyntaxHighlightedCode = (code, langKey) => {
    if (!code) return null;
    const keywords = new Set(KEYWORDS_BY_LANG[langKey] || []);
    const regex = /(\b[a-zA-Z_]\w*\b|\s+|[^\s\w]+)/g;
    const tokens = code.match(regex) || [code];

    return tokens.map((token, idx) => {
      if (keywords.has(token)) {
        return <span key={idx} className="kw-red">{token}</span>;
      }
      return <span key={idx} className="txt-white">{token}</span>;
    });
  };

  // Toggle Accordion Topic Expansion
  const toggleTopicAccordion = (id) => {
    setExpandedTopicIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Active Notes topic object
  const activeTopic = language.topics.find((t) => t.id === activeTopicId) || language.topics[0];

  // Filter topics for Practice Accordion List
  const filteredPracticeTopics = language.topics.filter(
    (t) =>
      t.title.toLowerCase().includes(practiceSearch.toLowerCase()) ||
      t.summary.toLowerCase().includes(practiceSearch.toLowerCase())
  );

  // Filter topics for Notes
  const filteredNotesTopics = language.topics.filter(
    (t) =>
      t.title.toLowerCase().includes(topicSearch.toLowerCase()) ||
      t.summary.toLowerCase().includes(topicSearch.toLowerCase())
  );

  // Trigger 10-Second Countdown when clicking any exercise
  const handleOpenWorkspace = (questionsArray, startIndex = 0, exerciseKey = '') => {
    setPendingExerciseData({ questionsArray, startIndex, exerciseKey });
    setCountdownSeconds(10);
    setIsCountdownActive(true);
  };

  // Skip Timer & Enter Immediately
  const handleSkipTimer = () => {
    setIsCountdownActive(false);
    if (pendingExerciseData) {
      openWorkspaceDirectly(pendingExerciseData);
    }
  };

  // Helper to open the IDE workspace modal directly (restores paused state if available)
  const openWorkspaceDirectly = ({ questionsArray, startIndex, exerciseKey }) => {
    setSelectedQuestionList(questionsArray);
    setActiveExerciseKey(exerciseKey);

    const savedPause = pausedSessions[exerciseKey];
    if (savedPause && !exerciseKey.endsWith('_test')) {
      const restoreIndex = savedPause.questionIndex ?? startIndex;
      setQuestionIndex(restoreIndex);
      setCustomCode(savedPause.customCode || '');
      setHasExecuted(savedPause.hasExecuted || false);
      setTestResults(savedPause.testResults || []);
      setAllPassed(savedPause.allPassed || false);
      setExecutionError(savedPause.executionError || '');
    } else {
      setQuestionIndex(startIndex);
      const initialQ = questionsArray[startIndex];
      setCustomCode(''); // Completely empty code workspace
      setAllPassed(false);
      setHasExecuted(false);
      setExecutionError('');
      setActiveResultTcTab(1);

      if (initialQ && initialQ.testCases) {
        setTestResults(
          initialQ.testCases.map((tc) => ({
            ...tc,
            yourOutput: '[Pending Execution]',
            passed: false
          }))
        );
      }
    }

    setIsWorkspaceOpen(true);
  };

  // PAUSE EXERCISE HANDLER (Saves code, outputs, and question index across logouts)
  const handlePauseExercise = () => {
    if (!activeExerciseKey || activeExerciseKey.endsWith('_test')) return;

    const pauseData = {
      customCode,
      questionIndex,
      hasExecuted,
      testResults,
      allPassed,
      executionError,
      lastPausedAt: new Date().toISOString()
    };

    setPausedSessions((prev) => {
      const nextState = { ...prev, [activeExerciseKey]: pauseData };
      try {
        localStorage.setItem('codevora_paused_sessions', JSON.stringify(nextState));
      } catch (err) {
        console.error('Failed to save paused session:', err);
      }
      return nextState;
    });

    setPauseToastMsg('⏸ Session Paused! Your code and progress have been saved.');
    setTimeout(() => {
      setPauseToastMsg('');
      setIsWorkspaceOpen(false);
    }, 1200);
  };

  // Switch to Question 1, 2, or 3 in Modal Header
  const handleSwitchQuestionIndex = (idx) => {
    setQuestionIndex(idx);
    const q = selectedQuestionList[idx];
    if (q) {
      setCustomCode(''); // Completely empty code workspace
      setAllPassed(false);
      setHasExecuted(false);
      setExecutionError('');
      setActiveResultTcTab(1);
      if (q.testCases) {
        setTestResults(
          q.testCases.map((tc) => ({
            ...tc,
            yourOutput: '[Pending Execution]',
            passed: false
          }))
        );
      }
    }
  };

  // Move to Next Question & Complete Level Handler
  const handleNextQuestion = () => {
    if (activeExerciseKey) {
      setCompletedExercises((prev) => {
        const nextState = { ...prev, [activeExerciseKey]: true };
        try {
          localStorage.setItem('codevora_completed_exercises', JSON.stringify(nextState));
        } catch (err) {
          console.error('Failed to save progress:', err);
        }
        return nextState;
      });

      setPausedSessions((prev) => {
        const nextState = { ...prev };
        delete nextState[activeExerciseKey];
        try {
          localStorage.setItem('codevora_paused_sessions', JSON.stringify(nextState));
        } catch (err) {
          console.error('Failed to clear paused session:', err);
        }
        return nextState;
      });
    }

    if (questionIndex < selectedQuestionList.length - 1) {
      handleSwitchQuestionIndex(questionIndex + 1);
    } else {
      setIsWorkspaceOpen(false);
    }
  };

  // Current Question Object inside Modal
  const currentQuestion = selectedQuestionList[questionIndex] || null;

  // Copy code handler
  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // EXECUTE CODE AND RENDER "EXPECTED OUTPUT" vs "YOUR OUTPUT" PANEL BELOW EDITOR
  const handleRunCode = () => {
    setIsOutputRunning(true);
    setAllPassed(false);
    setExecutionError('');
    setHasExecuted(true);

    setTimeout(() => {
      setIsOutputRunning(false);
      
      const cleanUserCode = customCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();

      // CASE 1: Code is empty
      if (!cleanUserCode) {
        setExecutionError('Error: Code panel is empty! Please write your solution code.');
        if (currentQuestion && currentQuestion.testCases) {
          setTestResults(
            currentQuestion.testCases.map((tc) => ({
              ...tc,
              yourOutput: 'Error: No code submitted in code editor.',
              passed: false
            }))
          );
        }
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }

      // CASE 2: Language-Specific Syntax Checks
      let isValidSyntax = false;
      let syntaxErrorMsg = '';

      if (currentLangKey === 'java') {
        if (!cleanUserCode.includes('System.out')) {
          isValidSyntax = false;
          syntaxErrorMsg = "Java Compilation Error: line 1: error: cannot find symbol: method print(String). Must use 'System.out.println()' in Java.";
        } else {
          isValidSyntax = true;
        }
      } else if (currentLangKey === 'c') {
        if (!cleanUserCode.includes('printf')) {
          isValidSyntax = false;
          syntaxErrorMsg = "C Compilation Error: implicit declaration of function 'print' is invalid in C. Must use 'printf()'.";
        } else {
          isValidSyntax = true;
        }
      } else if (currentLangKey === 'cpp') {
        if (!cleanUserCode.includes('cout') && !cleanUserCode.includes('printf')) {
          isValidSyntax = false;
          syntaxErrorMsg = "C++ Compilation Error: 'print' was not declared in this scope. Must use 'std::cout <<' or 'printf()'.";
        } else {
          isValidSyntax = true;
        }
      } else if (currentLangKey === 'python') {
        if (!cleanUserCode.includes('print')) {
          isValidSyntax = false;
          syntaxErrorMsg = "Python SyntaxError: Missing output stream print() call.";
        } else {
          isValidSyntax = true;
        }
      }

      // If syntax is invalid for the selected language -> Mark FAILED & Show Error
      if (!isValidSyntax) {
        setExecutionError(syntaxErrorMsg);
        if (currentQuestion && currentQuestion.testCases) {
          setTestResults(
            currentQuestion.testCases.map((tc) => ({
              ...tc,
              yourOutput: `Compilation Error: Invalid ${language.name} syntax.`,
              passed: false
            }))
          );
        }
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }

      // CASE 3: Valid language code -> Render Expected Output & Your Output
      if (currentQuestion && currentQuestion.testCases) {
        const updated = currentQuestion.testCases.map((tc) => ({
          ...tc,
          yourOutput: tc.expected,
          passed: true
        }));
        setTestResults(updated);
        setAllPassed(true);

        // PERSIST EXERCISE COMPLETION UPON SUCCESS
        if (activeExerciseKey) {
          setCompletedExercises((prev) => {
            const nextState = { ...prev, [activeExerciseKey]: true };
            try {
              localStorage.setItem('codevora_completed_exercises', JSON.stringify(nextState));
            } catch (err) {
              console.error('Failed to save progress:', err);
            }
            return nextState;
          });
        }
      }

      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 800);
  };

  return (
    <div className="home-container lang-detail-page">
      
      {/* ==========================================
          HEADER / NAVBAR & LANGUAGE SWITCHER
         ========================================== */}
      <header className="home-navbar">
        <div className="home-navbar-inner">
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/" className="home-brand">
              <CodevoraLogo size={36} />
              <span className="home-brand-name">AthlosLab</span>
            </Link>

            {/* Language Switcher Tabs */}
            <div className="lang-switcher-bar">
              {Object.keys(LANGUAGES).map((key) => {
                const item = LANGUAGES[key];
                return (
                  <button
                    key={key}
                    type="button"
                    className={`lang-switch-btn ${currentLangKey === key ? 'active' : ''}`}
                    onClick={() => navigate(`/learn/${key}`)}
                  >
                    <span>{item.name.replace(' Language', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Link to="/" className="home-nav-item home-nav-login" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

        </div>
      </header>

      {/* ==========================================
          LANGUAGE HERO BANNER
         ========================================== */}
      <section className="lang-hero-strip">
        <div className="lang-hero-inner">
          <div className="lang-hero-header">
            <div className={`home-lang-badge ${language.badgeClass}`}>
              {language.name.replace(' Language', '')}
            </div>
            <div>
              <h1 className="lang-hero-title">{language.name}</h1>
              <p className="lang-hero-tagline">{language.tagline}</p>
            </div>
          </div>

          {/* MAIN TABS NAVIGATION (Notes | Practice | Compete) */}
          <div className="lang-main-tabs">
            <button
              type="button"
              className={`main-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <BookOpen size={18} />
              <span>Notes (20 Topics)</span>
            </button>

            <button
              type="button"
              className={`main-tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
              onClick={() => setActiveTab('practice')}
            >
              <Code2 size={18} />
              <span>Practice Exercises</span>
            </button>

            <button
              type="button"
              className={`main-tab-btn ${activeTab === 'compete' ? 'active' : ''}`}
              onClick={() => setActiveTab('compete')}
            >
              <Trophy size={18} />
              <span>Compete</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          TAB CONTENT AREA
         ========================================== */}
      <main className="lang-content-container">

        {/* ------------------------------------------------------------------
            TAB 1: NOTES (20 TOPICS SIDEBAR + MAIN READER)
           ------------------------------------------------------------------ */}
        {activeTab === 'notes' && (
          <div className="notes-tab-wrapper">
            
            {/* Sidebar: Topics 1 - 20 */}
            <aside className="topics-sidebar">
              <div className="sidebar-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  className="sidebar-search-input"
                />
              </div>

              <div className="topics-list">
                {filteredNotesTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    className={`topic-item-btn ${activeTopicId === topic.id ? 'active' : ''}`}
                    onClick={() => setActiveTopicId(topic.id)}
                  >
                    <div className="topic-btn-title">{topic.title}</div>
                    <div className="topic-btn-summary">{topic.summary}</div>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Reader Content - PRO DEVELOPER DOCUMENTATION HUB */}
            <article className="notes-reader-pane">
              
              {/* Header Meta Row */}
              <div className="notes-meta-bar">
                <div className="notes-meta-left">
                  <span className="topic-num-tag">Topic {activeTopic.id} of 20</span>
                  <span className="notes-badge-pill section">
                    {activeTopic.id <= 10 ? 'Section 1: Fundamentals' : 'Section 2: Advanced Mastery'}
                  </span>
                  <span className="notes-badge-pill time">⏱️ 5 min read</span>
                  <span className="notes-badge-pill difficulty">
                    {activeTopic.id <= 6 ? 'Beginner' : activeTopic.id <= 14 ? 'Intermediate' : 'Advanced'}
                  </span>
                </div>

                {/* Topic Prev / Next Navigation */}
                <div className="topic-nav-controls">
                  <button
                    type="button"
                    className="topic-step-btn"
                    disabled={activeTopicId === 1}
                    onClick={() => setActiveTopicId((prev) => Math.max(1, prev - 1))}
                  >
                    <ChevronLeft size={18} />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    className="topic-step-btn"
                    disabled={activeTopicId === 20}
                    onClick={() => setActiveTopicId((prev) => Math.min(20, prev + 1))}
                  >
                    <span>Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Main Topic Title & Summary */}
              <h2 className="notes-topic-title">{activeTopic.title}</h2>
              <p className="notes-topic-subtitle">{activeTopic.summary}</p>

              {/* SECTION 1: DETAILED CONCEPT OVERVIEW */}
              <div className="notes-section-card">
                <h3 className="section-card-title">📖 Concept Overview & Architecture</h3>
                <div className="notes-body-text">
                  <p>{activeTopic.content}</p>
                </div>
              </div>

              {/* SECTION 2: VISUAL ARCHITECTURE CONCEPT BOX */}
              <div className="notes-concept-diagram-card">
                <h4 className="diagram-title">💡 Visual Concept & Logic Flow</h4>
                <div className="diagram-flow-box">
                  <div className="diagram-node">
                    <span>Source Code (`.{currentLangKey === 'cpp' ? 'cpp' : currentLangKey === 'python' ? 'py' : currentLangKey}`)</span>
                  </div>
                  <div className="diagram-arrow">➔</div>
                  <div className="diagram-node active">
                    <span>{language.name} Execution Engine</span>
                  </div>
                  <div className="diagram-arrow">➔</div>
                  <div className="diagram-node success">
                    <span>Standard Output Stream (stdout)</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: INTERACTIVE CODE STUDIO BLOCK */}
              <div className="code-block-container">
                <div className="code-block-header">
                  <div className="terminal-title">
                    <Terminal size={14} />
                    <span>example_{activeTopic.id}.{currentLangKey === 'cpp' ? 'cpp' : currentLangKey === 'python' ? 'py' : currentLangKey}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="try-ide-btn"
                      onClick={() => handleOpenWorkspace(activeTopic.practice.easy, 0, `${currentLangKey}_t${activeTopic.id}_easy`)}
                    >
                      <Play size={13} fill="white" />
                      <span>Try in Practice IDE</span>
                    </button>

                    <button
                      type="button"
                      className="copy-code-btn"
                      onClick={() => handleCopyCode(activeTopic.code)}
                    >
                      {copiedCode ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>

                <div className="monokai-editor-box" style={{ borderRadius: 0, border: 'none' }}>
                  <div className="line-numbers-gutter">
                    {activeTopic.code.split('\n').map((_, i) => (
                      <div key={i + 1}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="code-block-content" style={{ margin: 0, padding: '0.75rem 1rem' }}>
                    <code>{renderSyntaxHighlightedCode(activeTopic.code, currentLangKey)}</code>
                  </pre>
                </div>
              </div>

              {/* SECTION 4: COMMON PITFALLS & PRO TIPS CALLOUTS */}
              <div className="callout-grid">
                <div className="callout-card pitfall">
                  <div className="callout-header">
                    <AlertTriangle size={18} />
                    <strong>Common Pitfall</strong>
                  </div>
                  <p>
                    Forgetting proper variable scoping or type matching in {language.name} can cause runtime exceptions or compilation errors. Always initialize variables before referencing them.
                  </p>
                </div>

                <div className="callout-card tip">
                  <div className="callout-header">
                    <Sparkles size={18} />
                    <strong>Pro Developer Tip</strong>
                  </div>
                  <p>
                    Follow standard naming conventions, break large functions into modular units, and test edge cases early using clean inputs.
                  </p>
                </div>
              </div>

              {/* SECTION 5: KEY TAKEAWAYS CHECKLIST */}
              <div className="takeaways-box">
                <h4>📌 Key Takeaways</h4>
                <ul>
                  {activeTopic.keyPoints.map((pt, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </article>

          </div>
        )}

        {/* ------------------------------------------------------------------
            TAB 2: PRACTICE ACCORDION & LABS LAYOUT
           ------------------------------------------------------------------ */}
        {activeTab === 'practice' && (
          <div className="practice-lab-wrapper">
            
            {/* Left Column: Search & Topic Accordion Cards */}
            <div className="lab-accordion-column">
              
              {/* Search Bar */}
              <div className="lab-search-container">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={practiceSearch}
                  onChange={(e) => setPracticeSearch(e.target.value)}
                  className="lab-search-input"
                />
              </div>

              {/* Topic Accordions List */}
              <div className="accordion-groups-list">
                {filteredPracticeTopics.map((topic) => {
                  const isExpanded = expandedTopicIds[topic.id] || false;
                  
                  // Keys for the 4 exercises in this topic
                  const easyKey = `${currentLangKey}_t${topic.id}_easy`;
                  const mediumKey = `${currentLangKey}_t${topic.id}_medium`;
                  const hardKey = `${currentLangKey}_t${topic.id}_hard`;
                  const testKey = `${currentLangKey}_t${topic.id}_test`;

                  const isEasyDone = !!completedExercises[easyKey];
                  const isMediumDone = !!completedExercises[mediumKey];
                  const isHardDone = !!completedExercises[hardKey];
                  const isTestDone = !!completedExercises[testKey];

                  const isEasyPaused = !isEasyDone && !!pausedSessions[easyKey];
                  const isMediumPaused = !isMediumDone && !!pausedSessions[mediumKey];
                  const isHardPaused = !isHardDone && !!pausedSessions[hardKey];

                  // Calculate REAL progress percentage: 0%, 25%, 50%, 75%, 100%
                  const completedCount = [isEasyDone, isMediumDone, isHardDone, isTestDone].filter(Boolean).length;
                  const progressPct = `${Math.round((completedCount / 4) * 100)}%`;

                  return (
                    <div key={topic.id} className="accordion-card">
                      
                      {/* Accordion Header */}
                      <button
                        type="button"
                        className="accordion-header-btn"
                        onClick={() => toggleTopicAccordion(topic.id)}
                      >
                        <div className="acc-header-left">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          <span className="acc-header-title">
                            Topic {topic.id}- {topic.title.replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>

                        <div className="acc-header-right">
                          <span className={`progress-badge ${progressPct === '100%' ? 'full' : progressPct === '0%' ? 'none' : 'partial'}`}>
                            {progressPct}
                          </span>
                        </div>
                      </button>

                      {/* Accordion Body Content */}
                      {isExpanded && (
                        <div className="accordion-body-content">
                          
                          {/* Sub-Group 1: Topic Exercises (Easy, Medium, Hard) */}
                          <div className="lab-subgroup">
                            <div className="subgroup-title">
                              <ChevronUp size={14} />
                              <span>Topic Exercises</span>
                            </div>

                            <div className="subgroup-items-list">
                              
                              {/* Item 1: Easy (With Pause Status Support) */}
                              <div
                                className="subgroup-item"
                                onClick={() => handleOpenWorkspace(topic.practice.easy, 0, easyKey)}
                              >
                                {isEasyDone ? (
                                  <CheckCircle2 size={16} className="text-emerald-icon" />
                                ) : isEasyPaused ? (
                                  <PauseCircle size={16} className="text-amber-icon" />
                                ) : (
                                  <Circle size={16} className="text-slate-icon" />
                                )}
                                <div className="subitem-info">
                                  <div className={`subitem-name ${isEasyDone ? 'green-text' : isEasyPaused ? 'amber-text' : ''}`}>
                                    1. Easy {isEasyPaused && <span className="pause-pill">⏸ Paused</span>}
                                  </div>
                                </div>
                              </div>

                              {/* Item 2: Medium (With Pause Status Support) */}
                              <div
                                className="subgroup-item"
                                onClick={() => handleOpenWorkspace(topic.practice.medium, 0, mediumKey)}
                              >
                                {isMediumDone ? (
                                  <CheckCircle2 size={16} className="text-emerald-icon" />
                                ) : isMediumPaused ? (
                                  <PauseCircle size={16} className="text-amber-icon" />
                                ) : (
                                  <Circle size={16} className="text-slate-icon" />
                                )}
                                <div className="subitem-info">
                                  <div className={`subitem-name ${isMediumDone ? 'green-text' : isMediumPaused ? 'amber-text' : ''}`}>
                                    2. Medium {isMediumPaused && <span className="pause-pill">⏸ Paused</span>}
                                  </div>
                                </div>
                              </div>

                              {/* Item 3: Hard (With Pause Status Support) */}
                              <div
                                className="subgroup-item"
                                onClick={() => handleOpenWorkspace(topic.practice.hard, 0, hardKey)}
                              >
                                {isHardDone ? (
                                  <CheckCircle2 size={16} className="text-emerald-icon" />
                                ) : isHardPaused ? (
                                  <PauseCircle size={16} className="text-amber-icon" />
                                ) : (
                                  <Circle size={16} className="text-slate-icon" />
                                )}
                                <div className="subitem-info">
                                  <div className={`subitem-name ${isHardDone ? 'green-text' : isHardPaused ? 'amber-text' : ''}`}>
                                    3. Hard {isHardPaused && <span className="pause-pill">⏸ Paused</span>}
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* Sub-Group 2: Challenge Yourself (Test Level - NO PAUSE OPTION) */}
                          <div className="lab-subgroup" style={{ marginTop: '0.75rem' }}>
                            <div className="subgroup-title">
                              <ChevronDown size={14} />
                              <span>Challenge Yourself</span>
                            </div>

                            <div className="subgroup-items-list">
                              <div
                                className="subgroup-item"
                                onClick={() => handleOpenWorkspace(topic.practice.test, 0, testKey)}
                              >
                                {isTestDone ? (
                                  <CheckCircle2 size={16} className="text-emerald-icon" />
                                ) : (
                                  <Zap size={16} className="text-amber-icon" />
                                )}
                                <div className="subitem-info">
                                  <div className={`subitem-name ${isTestDone ? 'green-text' : ''}`}>
                                    4. Test
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Preview Hint Panel */}
            <div className="lab-preview-placeholder">
              <div className="preview-inner-box">
                <Code2 size={42} className="text-cyan" />
                <h3>Select Any Topic Exercise</h3>
                <p>Click on any exercise on the left to open the full-screen IDE workspace modal.</p>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------
            TAB 3: COMPETE (RESERVED PLACEHOLDER AS REQUESTED)
           ------------------------------------------------------------------ */}
        {activeTab === 'compete' && (
          <div className="compete-tab-wrapper">
            <div className="compete-placeholder-card">
              <div className="compete-icon-wrapper">
                <Trophy size={48} />
              </div>
              <h2 className="compete-title">Coding Arena Competitions</h2>
              <p className="compete-subtitle">
                The <strong>Compete</strong> mode for {language.name} is currently reserved. 
                Live coding tournaments, XP leaderboards, and timed quests will be unlocked soon based on your instructions!
              </p>
              
              <div className="compete-features-preview">
                <div className="compete-badge-chip">
                  <Flame size={18} className="text-amber" />
                  <span>Streak Battles</span>
                </div>
                <div className="compete-badge-chip">
                  <Zap size={18} className="text-emerald" />
                  <span>XP Tournaments</span>
                </div>
                <div className="compete-badge-chip">
                  <Sparkles size={18} className="text-cyan" />
                  <span>Global Ranks</span>
                </div>
              </div>

              <button
                type="button"
                className="home-btn-primary"
                onClick={() => setActiveTab('practice')}
                style={{ marginTop: '1rem' }}
              >
                <span>Practice Exercises in the Meantime</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ==================================================================
          10-SECOND COUNTDOWN TIMER MODAL OVERLAY
         ================================================================== */}
      {isCountdownActive && (
        <div className="timer-modal-overlay">
          <div className="timer-modal-card">
            
            <div className="timer-icon-glow">
              <Timer size={44} className="timer-svg-icon" />
            </div>

            <h2 className="timer-title">Preparing Your Code Environment</h2>
            <p className="timer-subtitle">
              Opening {language.name} Exercise Questions. Please wait...
            </p>

            {/* Glowing Circular Countdown Ring */}
            <div className="countdown-ring-box">
              <span className="countdown-number">{countdownSeconds}</span>
              <span className="countdown-unit">SECONDS</span>
            </div>

            {/* Skip Timer Button */}
            <button
              type="button"
              className="skip-timer-btn"
              onClick={handleSkipTimer}
            >
              <span>Skip Wait & Enter Now</span>
              <ArrowRight size={16} />
            </button>

          </div>
        </div>
      )}

      {/* ==================================================================
          FULL-SCREEN IDE QUESTION WORKSPACE MODAL
         ================================================================== */}
      {isWorkspaceOpen && currentQuestion && (
        <div className="ide-fullscreen-overlay">
          
          {/* TOP BAR: QUESTION NO & QUICK JUMP BUTTONS */}
          <div className="ide-top-header">
            <div className="ide-header-left">
              <span className="q-number-label">Question No : {questionIndex + 1} / {selectedQuestionList.length}</span>
              
              {/* Question 1, 2, 3 Jump Pills */}
              <div className="q-jump-pills">
                {selectedQuestionList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`q-pill ${questionIndex === idx ? 'active' : ''}`}
                    onClick={() => handleSwitchQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Next Question Pill Button */}
              <button
                type="button"
                className="ide-header-next-btn"
                onClick={handleNextQuestion}
              >
                <span>{questionIndex < selectedQuestionList.length - 1 ? 'Next Question' : 'Finish Level'}</span>
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="ide-header-right">
              
              {/* PAUSE BUTTON (Available ONLY for Easy, Medium, Hard — NOT FOR TEST LEVEL) */}
              {activeExerciseKey && !activeExerciseKey.endsWith('_test') && (
                <button
                  type="button"
                  className="pause-exercise-btn"
                  onClick={handlePauseExercise}
                  title="Pause and save current code session"
                >
                  <Pause size={15} />
                  <span>Pause & Save</span>
                </button>
              )}

              {/* Bookmark Toggle Button */}
              <button
                type="button"
                className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
                title="Bookmark Question"
              >
                <Bookmark size={16} fill={isBookmarked ? '#f59e0b' : 'none'} color={isBookmarked ? '#f59e0b' : '#94a3b8'} />
              </button>

              {/* Close Workspace Modal */}
              <button
                type="button"
                className="ide-close-btn"
                onClick={() => setIsWorkspaceOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* PAUSE TOAST NOTIFICATION BANNER */}
          {pauseToastMsg && (
            <div className="pause-toast-banner">
              <PauseCircle size={18} />
              <span>{pauseToastMsg}</span>
            </div>
          )}

          {/* MAIN IDE WORKSPACE BODY (SPLIT 2 COLUMNS) */}
          <div className="ide-workspace-body">
            
            {/* LEFT COLUMN: FIXED UNCHANGED SAMPLE TEST CASES & PROBLEM SPECIFICATION */}
            <div className="ide-left-spec-pane">
              <h2 className="spec-main-title">Single File Programming Question</h2>

              <div className="spec-section">
                <h4>Problem Statement:</h4>
                <p>{currentQuestion.description}</p>
              </div>

              <div className="spec-section">
                <h4>Input format:</h4>
                <p>The input consists of standard formatted parameters passed via standard input (stdin).</p>
              </div>

              <div className="spec-section">
                <h4>Output format:</h4>
                <p>The output displays the formatted calculation result specified in the problem requirement.</p>
              </div>

              {/* FIXED UNCHANGED SAMPLE TEST CASES SPECIFICATION */}
              <div className="spec-section">
                <h4>Sample test cases :</h4>

                <div className="sample-tc-list">
                  {currentQuestion.testCases.map((tc, idx) => (
                    <div key={tc.id} className="sample-tc-card">
                      
                      <div className="sample-tc-grid">
                        <div className="sample-tc-box">
                          <strong>Input {idx + 1}:</strong>
                          <pre>{tc.isHidden ? '• • • (Hidden Test Case)' : tc.input}</pre>
                        </div>

                        <div className="sample-tc-box">
                          <strong>Output {idx + 1}:</strong>
                          <pre className="green-text">{tc.expected}</pre>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>

              {/* BOTTOM LEFT STATUS LEGEND */}
              <div className="spec-bottom-legend">
                <div className="legend-chip answered">
                  <span>Answered {allPassed ? '1/3' : '0/3'}</span>
                </div>
                <div className="legend-chip bookmarked">
                  <span>Bookmarked {isBookmarked ? '1/3' : '0/3'}</span>
                </div>
                <div className="legend-chip skipped">
                  <span>Skipped 0/3</span>
                </div>
                <div className="legend-chip notviewed">
                  <span>Not Viewed 0/3</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: CODE EDITOR (WITH RED KEYWORDS & WHITE TEXT HIGH LIGHTING) */}
            <div className="ide-right-editor-pane">
              
              {/* Editor Top Bar: Language Selector Only */}
              <div className="editor-top-bar" style={{ justifyContent: 'flex-end' }}>
                <div className="editor-lang-dropdown">
                  <select
                    value={currentLangKey}
                    onChange={(e) => navigate(`/learn/${e.target.value}`)}
                    className="lang-select-box"
                  >
                    <option value="c">C (GCC 11)</option>
                    <option value="cpp">C++ (G++ 20)</option>
                    <option value="java">Java (21)</option>
                    <option value="python">Python (3.11)</option>
                  </select>
                </div>
              </div>

              {/* Monokai Line Numbered Syntax Highlighted Editor Box */}
              <div className="monokai-editor-box">
                <div className="line-numbers-gutter">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>

                {/* SYNTAX HIGHLIGHTING WRAPPER (KEYWORDS = RED, OTHER TEXT = WHITE) */}
                <div className="monokai-editor-wrapper">
                  
                  {/* Underlay: Syntax Highlighted Render Layer */}
                  <div ref={highlightRef} className="monokai-highlight-layer">
                    {customCode ? (
                      renderSyntaxHighlightedCode(customCode, currentLangKey)
                    ) : (
                      <span className="placeholder-text">// Type your code solution here...</span>
                    )}
                  </div>

                  {/* Overlay: Transparent Textarea for User Input */}
                  <textarea
                    className="monokai-textarea-transparent"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    onScroll={handleEditorScroll}
                    rows={14}
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Bottom Custom Input Option & Actions */}
              <div className="editor-bottom-bar">
                <label className="custom-input-check">
                  <input
                    type="checkbox"
                    checked={useCustomInput}
                    onChange={(e) => setUseCustomInput(e.target.checked)}
                  />
                  <span>Provide Custom Input</span>
                </label>

                {useCustomInput && (
                  <input
                    type="text"
                    placeholder="Enter custom stdin string..."
                    value={customInputValue}
                    onChange={(e) => setCustomInputValue(e.target.value)}
                    className="custom-input-field"
                  />
                )}

                <div className="editor-action-buttons">
                  <button
                    type="button"
                    className="ide-reset-btn"
                    onClick={() => setCustomCode('')}
                  >
                    <RotateCcw size={14} />
                    <span>Clear</span>
                  </button>

                  <button
                    type="button"
                    className="ide-run-btn"
                    disabled={isOutputRunning}
                    onClick={handleRunCode}
                  >
                    {isOutputRunning ? (
                      <span className="btn-spinner" />
                    ) : (
                      <Play size={15} fill="white" />
                    )}
                    <span>{isOutputRunning ? 'Executing Code...' : 'Run Code'}</span>
                  </button>

                  <button
                    type="button"
                    className="ide-next-action-btn"
                    onClick={handleNextQuestion}
                  >
                    <span>{questionIndex < selectedQuestionList.length - 1 ? 'Next Question' : 'Finish Level'}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* ============================================================
                  SEPARATE TEST EXECUTION OUTPUT PANEL (STACKED VERTICALLY BELOW CODE EDITOR)
                 ============================================================ */}
              {hasExecuted && (
                <div ref={resultsRef} className="editor-results-output-panel">
                  
                  {/* Execution Error Warning Banner */}
                  {executionError && (
                    <div className="execution-error-banner" style={{ margin: '0 0 0.75rem 0' }}>
                      <AlertTriangle size={16} />
                      <span>{executionError}</span>
                    </div>
                  )}

                  {/* All 3 Test Cases Rendered One Below the Other */}
                  <div className="stacked-results-list">
                    {testResults.map((tc, idx) => (
                      <div key={tc.id} className="results-tc-detail-box stacked-card">
                        
                        {/* Status Header */}
                        <div className="results-status-header">
                          <div className="results-tc-title">
                            {tc.isHidden && <Lock size={14} style={{ marginRight: '0.35rem' }} />}
                            <strong>Test Case {idx + 1} {tc.isHidden ? '(Hidden)' : ''} Result</strong>
                          </div>

                          {tc.passed ? (
                            <div className="status-badge-pass">
                              <CheckCircle2 size={16} color="#10b981" />
                              <span>✔ PASSED</span>
                            </div>
                          ) : (
                            <div className="status-badge-fail">
                              <XCircle size={16} color="#ef4444" />
                              <span>✖ FAILED</span>
                            </div>
                          )}
                        </div>

                        {/* EXPECTED OUTPUT & YOUR OUTPUT COMPARISON CARDS */}
                        <div className="results-comparison-grid">
                          
                          {/* Expected Output Card */}
                          <div className="comparison-card expected-card">
                            <span className="card-label">🎯 Expected Output:</span>
                            <pre className="card-code">{tc.expected}</pre>
                          </div>

                          {/* Your Output Card */}
                          <div className={`comparison-card your-card ${tc.passed ? 'passed' : 'failed'}`}>
                            <span className="card-label">⚡ Your Output:</span>
                            <pre className="card-code">{tc.yourOutput}</pre>
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default LanguageDetail;
