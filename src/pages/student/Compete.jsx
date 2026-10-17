
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Copy,
  Crown,
  FileCode2,
  Filter,
  Flame,
  GraduationCap,
  Hash,
  Info,
  Layers,
  Lightbulb,
  LockKeyhole,
  Medal,
  Minus,
  Plus,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Swords,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  X,
  Zap,
  Terminal,
  CircleDot,
} from "lucide-react";
import "../../styles/Compete.css";

const topics = [
  {
    name: "Arrays",
    description: "Searching, sorting and array manipulation",
    icon: Layers,
    color: "green",
  },
  {
    name: "Strings",
    description: "Patterns, parsing and string algorithms",
    icon: Code2,
    color: "blue",
  },
  {
    name: "Bubble Sort",
    description: "Sorting algorithms and optimization",
    icon: TrendingUp,
    color: "orange",
  },
  {
    name: "Linked Lists",
    description: "Pointers, nodes and linked structures",
    icon: GitBranchFallback,
    color: "purple",
  },
  {
    name: "Stacks & Queues",
    description: "Linear data structures",
    icon: Layers,
    color: "blue",
  },
  {
    name: "Binary Search",
    description: "Efficient searching techniques",
    icon: Search,
    color: "green",
  },
  {
    name: "Trees & Graphs",
    description: "Traversal and graph algorithms",
    icon: Brain,
    color: "purple",
  },
  {
    name: "Dynamic Programming",
    description: "Optimization and problem solving",
    icon: Zap,
    color: "orange",
  },
];

function GitBranchFallback(props) {
  return <TrendingUp {...props} />;
}

const questions = [
  {
    id: 1,
    title: "Sort an Array Using Bubble Sort",
    topic: "Bubble Sort",
    difficulty: "Easy",
    time: "15 min",
    points: 100,
    description:
      "Given an array of integers, sort it in ascending order using the Bubble Sort algorithm. Optimize the solution to stop early when the array is already sorted.",
    tags: ["Arrays", "Sorting"],
    source: "UniSkills Practice",
  },
  {
    id: 2,
    title: "Find the Second Largest Element",
    topic: "Arrays",
    difficulty: "Easy",
    time: "15 min",
    points: 100,
    description:
      "Find the second-largest distinct element in an array without sorting the entire array.",
    tags: ["Arrays", "Traversal"],
    source: "Interview Practice",
  },
  {
    id: 3,
    title: "Reverse a String",
    topic: "Strings",
    difficulty: "Easy",
    time: "10 min",
    points: 80,
    description:
      "Reverse a given string while preserving the original input. Consider empty strings and single-character inputs.",
    tags: ["Strings", "Basics"],
    source: "UniSkills Practice",
  },
  {
    id: 4,
    title: "Implement Binary Search",
    topic: "Binary Search",
    difficulty: "Medium",
    time: "20 min",
    points: 150,
    description:
      "Implement binary search on a sorted array and return the index of the target element, or -1 if it is absent.",
    tags: ["Arrays", "Searching"],
    source: "Interview Practice",
  },
  {
    id: 5,
    title: "Detect a Cycle in a Linked List",
    topic: "Linked Lists",
    difficulty: "Medium",
    time: "25 min",
    points: 180,
    description:
      "Determine whether a linked list contains a cycle. Aim for O(n) time and O(1) extra space.",
    tags: ["Linked Lists", "Pointers"],
    source: "DSA Challenge",
  },
  {
    id: 6,
    title: "Valid Parentheses",
    topic: "Stacks & Queues",
    difficulty: "Medium",
    time: "20 min",
    points: 150,
    description:
      "Determine whether a string containing parentheses, braces and brackets is correctly balanced.",
    tags: ["Stacks", "Strings"],
    source: "Interview Practice",
  },
  {
    id: 7,
    title: "Maximum Subarray Sum",
    topic: "Arrays",
    difficulty: "Medium",
    time: "25 min",
    points: 180,
    description:
      "Find the maximum sum of a contiguous subarray using an efficient algorithm.",
    tags: ["Arrays", "Dynamic Programming"],
    source: "DSA Challenge",
  },
  {
    id: 8,
    title: "Shortest Path in a Graph",
    topic: "Trees & Graphs",
    difficulty: "Hard",
    time: "35 min",
    points: 250,
    description:
      "Find the shortest path between two vertices in a weighted graph with non-negative edge weights.",
    tags: ["Graphs", "Algorithms"],
    source: "Advanced Practice",
  },
  {
    id: 9,
    title: "Longest Common Subsequence",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    time: "40 min",
    points: 300,
    description:
      "Find the length of the longest subsequence common to two given strings.",
    tags: ["Strings", "Dynamic Programming"],
    source: "Advanced Practice",
  },
];

const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C",
  "TypeScript",
];

const starterCode = {
  JavaScript:
    "function bubbleSort(arr) {\n  // Write your solution here\n  return arr;\n}\n\nconst input = [5, 3, 8, 1, 2];\nconsole.log(bubbleSort(input));",
  Python:
    "def bubble_sort(arr):\n    # Write your solution here\n    return arr\n\nnumbers = [5, 3, 8, 1, 2]\nprint(bubble_sort(numbers))",
  Java:
    "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 3, 8, 1, 2};\n        // Write your solution here\n        System.out.println(Arrays.toString(arr));\n    }\n}",
  "C++":
    "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> arr = {5, 3, 8, 1, 2};\n    // Write your solution here\n    return 0;\n}",
  C:
    "#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 3, 8, 1, 2};\n    int n = 5;\n    // Write your solution here\n    return 0;\n}",
  TypeScript:
    "function bubbleSort(arr: number[]): number[] {\n  // Write your solution here\n  return arr;\n}\n\nconsole.log(bubbleSort([5, 3, 8, 1, 2]));",
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
};

function Compete() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("arena");
  const [screen, setScreen] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState("Bubble Sort");
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questionCount, setQuestionCount] = useState(5);
  const [visibility, setVisibility] = useState("private");
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [code, setCode] = useState(starterCode.JavaScript);
  const [elapsed, setElapsed] = useState(0);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleFinished, setBattleFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roomName, setRoomName] = useState("DSA 1v1 Battle");

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch = `${question.title} ${question.topic} ${question.tags.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === "All" ||
        question.difficulty === difficultyFilter;

      const matchesTab =
        activeTab !== "questions" ||
        selectedTopic === "All Topics" ||
        question.topic === selectedTopic;

      return matchesSearch && matchesDifficulty && matchesTab;
    });
  }, [search, difficultyFilter, activeTab, selectedTopic]);

  const currentQuestion =
    selectedQuestion ||
    questions.find((question) => question.topic === selectedTopic) ||
    questions[0];

  useEffect(() => {
    if (!battleStarted || battleFinished) return undefined;

    const interval = window.setInterval(() => {
      setElapsed((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [battleStarted, battleFinished]);

  const createRoom = () => {
    const newCode = Math.random().toString(36).slice(2, 8).toUpperCase();
    setRoomCode(newCode);
    setRoomMessage("");
    setInviteMessage("");
    setScreen("lobby");
  };

  const joinRoom = () => {
    const normalizedCode = joinCode.trim().toUpperCase();

    if (normalizedCode.length < 4) {
      setRoomMessage("Enter a valid room code to continue.");
      return;
    }

    setRoomCode(normalizedCode);
    setRoomMessage(
      "This is a frontend preview. Real room joining will work after the multiplayer backend is connected."
    );
  };

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setInviteMessage("Room code copied. Send it to your friend!");
    } catch {
      setInviteMessage(`Your room code is ${roomCode}. Copy it to invite your friend.`);
    }
  };

  const shareInvite = async () => {
    const message = `Join my UniSkills 1v1 coding battle!\nRoom code: ${roomCode}\nTopic: ${selectedTopic}\nLanguage: ${selectedLanguage}\nQuestions: ${questionCount}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "UniSkills Coding Battle",
          text: message,
        });
        setInviteMessage("Invitation shared.");
      } catch {
        setInviteMessage(message);
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      setInviteMessage("Invitation copied. Share it with your friend!");
    } catch {
      setInviteMessage(message);
    }
  };

  const openQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const startBattle = (question = currentQuestion) => {
    setSelectedQuestion(question);
    setCode(starterCode[selectedLanguage] || starterCode.JavaScript);
    setElapsed(0);
    setCurrentQuestionIndex(0);
    setBattleStarted(true);
    setBattleFinished(false);
    setSubmitted(false);
    setSubmissionMessage("");
    setSubmissionError(false);
    setScreen("battle");
  };

  const submitSolution = () => {
    if (!code.trim()) {
      setSubmissionMessage("Write your solution before submitting.");
      setSubmissionError(true);
      return;
    }

    setSubmitted(true);
    setSubmissionError(false);
    setSubmissionMessage(
      "Demo submission recorded. Real test-case validation requires a secure code execution service."
    );
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questionCount) {
      setBattleFinished(true);
      setBattleStarted(false);
      return;
    }

    setCurrentQuestionIndex(nextIndex);
    const nextQuestionItem =
      questions[(questions.findIndex((q) => q.id === currentQuestion.id) + 1) % questions.length];

    setSelectedQuestion(nextQuestionItem);
    setCode(starterCode[selectedLanguage] || starterCode.JavaScript);
    setSubmitted(false);
    setSubmissionMessage("");
    setSubmissionError(false);
  };

  const backToHome = () => {
    setScreen("home");
    setBattleStarted(false);
    setBattleFinished(false);
    setSubmitted(false);
    setSubmissionMessage("");
  };

  const chooseTopic = (topic) => {
    setSelectedTopic(topic);
    setActiveTab("questions");
    setSearch("");
    document.querySelector(".compete-questions-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="compete-page">
      <header className="compete-topbar">
        <button
          className="compete-back-button"
          onClick={() => navigate("/student/dashboard")}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={17} />
        </button>

        <button
          className="compete-brand"
          onClick={backToHome}
          aria-label="UniSkills Compete home"
        >
          <span className="compete-brand-icon">
            <GraduationCap size={22} />
          </span>
          <span>
            <strong>UniSkills</strong>
            <small>Compete & grow together</small>
          </span>
        </button>

        <div className="compete-topbar-right">
          <span className="compete-online-status">
            <span />
            Practice arena
          </span>
          <button
            className="compete-profile-button"
            onClick={() => navigate("/student/dashboard")}
            aria-label="Student dashboard"
          >
            <Users size={17} />
          </button>
        </div>
      </header>

      <main className="compete-content">
        {screen === "home" && (
          <>
            <section className="compete-hero">
              <div className="compete-hero-copy">
                <span className="compete-eyebrow">
                  <Swords size={14} />
                  YOUR SKILLS. YOUR BATTLE.
                </span>

                <h1>
                  Don't just learn.
                  <br />
                  <span>Prove your skills.</span>
                </h1>

                <p>
                  Challenge your friends in real-time coding battles.
                  Solve the same problems, race against the clock, and
                  prepare for the coding rounds recruiters care about.
                </p>

                <div className="compete-hero-actions">
                  <button
                    className="compete-primary-button"
                    onClick={() => setScreen("configure")}
                  >
                    <Swords size={16} />
                    Create 1v1 Battle
                    <ArrowRight size={16} />
                  </button>

                  <button
                    className="compete-secondary-button"
                    onClick={() => {
                      setActiveTab("questions");
                      setSelectedTopic("All Topics");
                      document.querySelector(".compete-tabs")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    <BookOpen size={16} />
                    Explore Questions
                  </button>
                </div>

                <div className="compete-join-form">
                  <label htmlFor="compete-join-code">
                    Already have a room code?
                  </label>
                  <div>
                    <input
                      id="compete-join-code"
                      value={joinCode}
                      onChange={(event) => setJoinCode(event.target.value)}
                      placeholder="Enter your friend's room code"
                      maxLength={12}
                    />
                    <button onClick={joinRoom}>
                      Join <ArrowRight size={14} />
                    </button>
                  </div>
                  {roomMessage && <p>{roomMessage}</p>}
                </div>
              </div>

              <div className="compete-hero-stats">
                <article>
                  <span className="compete-stat-icon green">
                    <Users size={19} />
                  </span>
                  <strong>1v1</strong>
                  <small>Challenge a friend</small>
                </article>

                <article>
                  <span className="compete-stat-icon blue">
                    <Timer size={19} />
                  </span>
                  <strong>Timed</strong>
                  <small>Race against time</small>
                </article>

                <article>
                  <span className="compete-stat-icon orange">
                    <Trophy size={19} />
                  </span>
                  <strong>Rank up</strong>
                  <small>Earn points and grow</small>
                </article>
              </div>
            </section>

            <section className="compete-quick-actions">
              <button onClick={() => setScreen("configure")}>
                <span className="compete-quick-icon green">
                  <Swords size={20} />
                </span>
                <span>
                  <strong>Challenge a Friend</strong>
                  <small>Create a private room and share your code.</small>
                </span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => {
                  setActiveTab("questions");
                  setSelectedTopic("All Topics");
                }}
              >
                <span className="compete-quick-icon blue">
                  <FileCode2 size={20} />
                </span>
                <span>
                  <strong>Practice Questions</strong>
                  <small>Prepare with coding interview problems.</small>
                </span>
                <ArrowRight size={17} />
              </button>

              <button onClick={() => setActiveTab("leaderboard")}>
                <span className="compete-quick-icon orange">
                  <TrendingUp size={20} />
                </span>
                <span>
                  <strong>Leaderboard</strong>
                  <small>See how competitive coders perform.</small>
                </span>
                <ArrowRight size={17} />
              </button>
            </section>

            <nav className="compete-tabs">
              <button
                className={activeTab === "arena" ? "active" : ""}
                onClick={() => setActiveTab("arena")}
              >
                <Swords size={15} />
                Battle Arena
              </button>
              <button
                className={activeTab === "questions" ? "active" : ""}
                onClick={() => {
                  setActiveTab("questions");
                  setSelectedTopic("All Topics");
                }}
              >
                <BookOpen size={15} />
                Coding Questions
              </button>
              <button
                className={activeTab === "leaderboard" ? "active" : ""}
                onClick={() => setActiveTab("leaderboard")}
              >
                <Trophy size={15} />
                Leaderboard
              </button>
            </nav>

            {activeTab === "arena" && (
              <section className="compete-arena-section">
                <div className="compete-section-heading">
                  <div>
                    <span className="compete-section-eyebrow">
                      <Target size={14} />
                      PICK YOUR CHALLENGE
                    </span>
                    <h2>What do you want to master?</h2>
                    <p>
                      Choose a topic, configure your battle, and invite a
                      friend to compete.
                    </p>
                  </div>
                  <button
                    className="compete-text-button"
                    onClick={() => {
                      setActiveTab("questions");
                      setSelectedTopic("All Topics");
                    }}
                  >
                    All questions <ArrowRight size={14} />
                  </button>
                </div>

                <div className="compete-topic-grid">
                  {topics.map((topic) => {
                    const Icon = topic.icon;

                    return (
                      <button
                        key={topic.name}
                        className="compete-topic-card"
                        onClick={() => {
                          setSelectedTopic(topic.name);
                          setScreen("configure");
                        }}
                      >
                        <span className={`compete-topic-icon ${topic.color}`}>
                          <Icon size={20} />
                        </span>
                        <strong>{topic.name}</strong>
                        <small>{topic.description}</small>
                        <ArrowRight
                          className="compete-topic-arrow"
                          size={15}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="compete-callout">
                  <span className="compete-callout-icon">
                    <Lightbulb size={19} />
                  </span>
                  <div>
                    <strong>More than just solving problems</strong>
                    <p>
                      UniSkills aims to bring recruiter-style coding
                      challenges, alumni-created problems, and friendly
                      competition into one place. Verified company challenges
                      will be available as those integrations are added.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "questions" && (
              <QuestionBrowser
                search={search}
                setSearch={setSearch}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
                questions={filteredQuestions}
                onSelect={openQuestion}
                onBattle={startBattle}
                onClear={() => {
                  setSearch("");
                  setDifficultyFilter("All");
                  setSelectedTopic("All Topics");
                }}
              />
            )}

            {activeTab === "leaderboard" && <Leaderboard />}
          </>
        )}

        {screen === "configure" && (
          <section className="compete-config-page">
            <button className="compete-back-link" onClick={backToHome}>
              <ArrowLeft size={15} />
              Back to Compete
            </button>

            <div className="compete-config-heading">
              <span className="compete-config-icon">
                <Swords size={24} />
              </span>
              <span className="compete-section-eyebrow">
                SET UP YOUR MATCH
              </span>
              <h1>Build your coding battle.</h1>
              <p>
                Choose the topics, language, and difficulty. Then create
                a room and invite your opponent.
              </p>
            </div>

            <div className="compete-config-layout">
              <div className="compete-config-form">
                <section className="compete-form-section">
                  <div className="compete-form-section-heading">
                    <span>01</span>
                    <div>
                      <h2>Choose your topic</h2>
                      <p>
                        Select the concept you want to compete on.
                      </p>
                    </div>
                  </div>

                  <div className="compete-config-topic-grid">
                    {topics.map((topic) => {
                      const Icon = topic.icon;

                      return (
                        <button
                          key={topic.name}
                          className={
                            selectedTopic === topic.name ? "active" : ""
                          }
                          onClick={() => setSelectedTopic(topic.name)}
                        >
                          <Icon size={15} />
                          <span>{topic.name}</span>
                          {selectedTopic === topic.name && (
                            <Check size={14} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="compete-form-section">
                  <div className="compete-form-section-heading">
                    <span>02</span>
                    <div>
                      <h2>Programming language</h2>
                      <p>
                        Both players will receive the same language
                        selection for this match.
                      </p>
                    </div>
                  </div>

                  <div className="compete-language-grid">
                    {languages.map((language) => (
                      <button
                        key={language}
                        className={
                          selectedLanguage === language ? "active" : ""
                        }
                        onClick={() => {
                          setSelectedLanguage(language);
                          setCode(starterCode[language]);
                        }}
                      >
                        <Code2 size={16} />
                        <span>{language}</span>
                        {selectedLanguage === language && (
                          <CheckCircle2 size={15} />
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="compete-form-section">
                  <div className="compete-form-section-heading">
                    <span>03</span>
                    <div>
                      <h2>Difficulty level</h2>
                      <p>
                        Pick the level that matches your experience.
                      </p>
                    </div>
                  </div>

                  <div className="compete-difficulty-grid">
                    {[
                      {
                        value: "Easy",
                        title: "Beginner",
                        description: "Build your foundations",
                        dot: "easy",
                      },
                      {
                        value: "Mixed",
                        title: "Mixed",
                        description: "A balanced challenge",
                        dot: "mixed",
                      },
                      {
                        value: "Hard",
                        title: "Advanced",
                        description: "Push your limits",
                        dot: "hard",
                      },
                    ].map((item) => (
                      <button
                        key={item.value}
                        className={difficulty === item.value ? "active" : ""}
                        onClick={() => setDifficulty(item.value)}
                      >
                        <span
                          className={`compete-difficulty-dot ${item.dot}`}
                        />
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                        {difficulty === item.value && (
                          <CheckCircle2 size={14} />
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="compete-form-section">
                  <div className="compete-question-count">
                    <div>
                      <strong>Number of questions</strong>
                      <small>
                        Choose how many questions each player must solve.
                      </small>
                    </div>
                    <div className="compete-count-controls">
                      <button
                        disabled={questionCount <= 1}
                        onClick={() =>
                          setQuestionCount((count) => Math.max(1, count - 1))
                        }
                        aria-label="Decrease questions"
                      >
                        <Minus size={15} />
                      </button>
                      <span>{questionCount}</span>
                      <button
                        disabled={questionCount >= 10}
                        onClick={() =>
                          setQuestionCount((count) => Math.min(10, count + 1))
                        }
                        aria-label="Increase questions"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <input
                    className="compete-count-slider"
                    type="range"
                    min="1"
                    max="10"
                    value={questionCount}
                    onChange={(event) =>
                      setQuestionCount(Number(event.target.value))
                    }
                    aria-label="Number of questions"
                  />
                  <div className="compete-range-labels">
                    <span>1 question</span>
                    <span>10 questions</span>
                  </div>
                </section>

                <section className="compete-form-section">
                  <div className="compete-form-section-heading">
                    <span>04</span>
                    <div>
                      <h2>Room access</h2>
                      <p>Decide how your opponent can join.</p>
                    </div>
                  </div>

                  <div className="compete-visibility-grid">
                    <button
                      className={visibility === "private" ? "active" : ""}
                      onClick={() => setVisibility("private")}
                    >
                      <LockKeyhole size={18} />
                      <span>
                        <strong>Private room</strong>
                        <small>
                          Invite a specific friend with a room code.
                        </small>
                      </span>
                      {visibility === "private" && (
                        <CheckCircle2 size={15} />
                      )}
                    </button>

                    <button
                      className={visibility === "public" ? "active" : ""}
                      onClick={() => setVisibility("public")}
                    >
                      <Users size={18} />
                      <span>
                        <strong>Open challenge</strong>
                        <small>
                          Designed for a future public matchmaking feature.
                        </small>
                      </span>
                      {visibility === "public" && (
                        <CheckCircle2 size={15} />
                      )}
                    </button>
                  </div>
                </section>
              </div>

              <aside className="compete-config-summary">
                <div className="compete-summary-top">
                  <span className="compete-summary-label">
                    <CheckCircle2 size={14} />
                    MATCH SUMMARY
                  </span>
                  <span className="compete-private-badge">
                    {visibility === "private" ? (
                      <LockKeyhole size={12} />
                    ) : (
                      <Users size={12} />
                    )}
                    {visibility === "private" ? "Private" : "Open"}
                  </span>
                </div>

                <div className="compete-summary-versus">
                  <div>
                    <span className="compete-summary-player">
                      <GraduationCap size={24} />
                    </span>
                    <strong>You</strong>
                    <small>Challenger 1</small>
                  </div>
                  <span className="compete-versus">VS</span>
                  <div>
                    <span className="compete-summary-player opponent">
                      <Users size={22} />
                    </span>
                    <strong>Friend</strong>
                    <small>Challenger 2</small>
                  </div>
                </div>

                <div className="compete-summary-details">
                  <div>
                    <span>Topic</span>
                    <strong>{selectedTopic}</strong>
                  </div>
                  <div>
                    <span>Language</span>
                    <strong>{selectedLanguage}</strong>
                  </div>
                  <div>
                    <span>Difficulty</span>
                    <strong>{difficulty}</strong>
                  </div>
                  <div>
                    <span>Questions</span>
                    <strong>{questionCount}</strong>
                  </div>
                  <div>
                    <span>Scoring</span>
                    <strong>Correctness + time</strong>
                  </div>
                </div>

                <div className="compete-scoring-note">
                  <Info size={16} />
                  <p>
                    Accuracy comes first. Completion time breaks ties
                    between equally correct submissions. Real scoring
                    requires server-side code evaluation.
                  </p>
                </div>

                <button
                  className="compete-primary-button compete-create-room-button"
                  onClick={createRoom}
                >
                  Create Battle Room
                  <ArrowRight size={16} />
                </button>

                <p className="compete-summary-footnote">
                  You can share the generated room code with your friend.
                </p>
              </aside>
            </div>
          </section>
        )}

        {screen === "lobby" && (
          <section className="compete-lobby-page">
            <button className="compete-back-link" onClick={backToHome}>
              <ArrowLeft size={15} />
              Back to Compete
            </button>

            <div className="compete-lobby-card">
              <span className="compete-lobby-icon">
                <Users size={27} />
              </span>
              <span className="compete-section-eyebrow">
                YOUR BATTLE ROOM IS READY
              </span>
              <h1>Invite your opponent.</h1>
              <p>
                Share your room code with your friend. Both players should
                use the same challenge settings before the battle starts.
              </p>

              <div className="compete-room-code">
                <span>YOUR ROOM CODE</span>
                <strong>{roomCode}</strong>
                <button onClick={copyRoomCode}>
                  <Copy size={15} />
                  Copy room code
                </button>
              </div>

              <button
                className="compete-share-button"
                onClick={shareInvite}
              >
                <Share2 size={16} />
                Share battle invitation
              </button>

              {inviteMessage && (
                <div className="compete-invite-message">
                  {inviteMessage}
                </div>
              )}

              <div className="compete-lobby-details">
                <div>
                  <Layers size={17} />
                  <span>
                    <small>Topic</small>
                    <strong>{selectedTopic}</strong>
                  </span>
                </div>
                <div>
                  <Code2 size={17} />
                  <span>
                    <small>Language</small>
                    <strong>{selectedLanguage}</strong>
                  </span>
                </div>
                <div>
                  <Target size={17} />
                  <span>
                    <small>Difficulty</small>
                    <strong>{difficulty}</strong>
                  </span>
                </div>
                <div>
                  <BookOpen size={17} />
                  <span>
                    <small>Questions</small>
                    <strong>{questionCount} questions</strong>
                  </span>
                </div>
              </div>

              <div className="compete-lobby-waiting">
                <span className="compete-waiting-indicator" />
                <div>
                  <strong>Waiting for your friend</strong>
                  <p>
                    This frontend preview generates the room code locally.
                    Live player joining will work after the multiplayer
                    backend is connected.
                  </p>
                </div>
              </div>

              <button
                className="compete-primary-button compete-start-demo-button"
                onClick={() => startBattle()}
              >
                <Code2 size={16} />
                Preview Coding Workspace
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        )}

        {screen === "battle" && (
          <section className="compete-battle-page">
            <div className="compete-battle-topbar">
              <button className="compete-back-link" onClick={backToHome}>
                <ArrowLeft size={15} />
                Exit workspace
              </button>

              <span className="compete-demo-badge">
                Frontend preview · Not a live match
              </span>

              <div className="compete-battle-timer">
                <Clock3 size={17} />
                {formatTime(elapsed)}
              </div>
            </div>

            {!battleFinished ? (
              <>
                <div className="compete-battle-progress">
                  <div>
                    <span>
                      Question {currentQuestionIndex + 1} of {questionCount}
                    </span>
                    <strong>
                      {Math.round(
                        (currentQuestionIndex / questionCount) * 100
                      )}
                      % completed
                    </strong>
                  </div>
                  <div className="compete-progress-track">
                    <span
                      style={{
                        width: `${(currentQuestionIndex / questionCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="compete-workspace">
                  <article className="compete-problem-panel">
                    <div className="compete-workspace-panel-heading">
                      <span>
                        <BookOpen size={16} />
                        Problem statement
                      </span>
                      <button
                        className="compete-text-button"
                        onClick={() => setShowRules((value) => !value)}
                      >
                        <Info size={14} />
                        Rules
                      </button>
                    </div>

                    <span className="compete-problem-number">
                      QUESTION {currentQuestionIndex + 1}
                    </span>
                    <h1>{currentQuestion.title}</h1>
                    <div className="compete-question-title-row">
                      <span
                        className={`compete-difficulty ${currentQuestion.difficulty.toLowerCase()}`}
                      >
                        {currentQuestion.difficulty}
                      </span>
                      <span className="compete-private-badge">
                        <Hash size={12} />
                        {currentQuestion.points} points
                      </span>
                    </div>
                    <p>{currentQuestion.description}</p>

                    <div className="compete-problem-example">
                      <strong>Example</strong>
                      <span>Input</span>
                      <code>[5, 3, 8, 1, 2]</code>
                      <span>Expected output</span>
                      <code>[1, 2, 3, 5, 8]</code>
                    </div>

                    <div className="compete-problem-hint">
                      <Lightbulb size={16} />
                      <div>
                        <strong>Think before you code</strong>
                        <p>
                          Consider edge cases, input constraints, and
                          the time complexity of your solution.
                        </p>
                      </div>
                    </div>

                    {showRules && (
                      <div className="compete-battle-rules">
                        <p>1. Both players should receive identical questions.</p>
                        <p>2. A submission must pass all test cases.</p>
                        <p>3. Correctness is evaluated before completion time.</p>
                        <p>4. This preview does not execute code or verify answers.</p>
                      </div>
                    )}
                  </article>

                  <article className="compete-editor-panel">
                    <div className="compete-editor-toolbar">
                      <span>
                        <Terminal size={16} />
                        Code editor
                      </span>
                      <label>
                        <select
                          value={selectedLanguage}
                          onChange={(event) => {
                            setSelectedLanguage(event.target.value);
                            setCode(starterCode[event.target.value]);
                          }}
                          aria-label="Programming language"
                        >
                          {languages.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={13} />
                      </label>
                    </div>

                    <textarea
                      className="compete-code-editor"
                      value={code}
                      onChange={(event) => {
                        setCode(event.target.value);
                        setSubmitted(false);
                        setSubmissionMessage("");
                      }}
                      spellCheck={false}
                      autoCapitalize="off"
                      autoCorrect="off"
                      aria-label="Write your solution"
                    />

                    <div className="compete-editor-footer">
                      <span>
                        <span className="compete-editor-status-dot" />
                        Draft saved in this page
                      </span>
                      <span>{code.split("\n").length} lines</span>
                    </div>

                    {submissionMessage && (
                      <div
                        className={`compete-submission-message ${submissionError ? "error" : ""}`}
                      >
                        {submissionError ? (
                          <Info size={15} />
                        ) : (
                          <CheckCircle2 size={15} />
                        )}
                        {submissionMessage}
                      </div>
                    )}

                    {submitted && (
                      <div className="compete-demo-result">
                        <div>
                          <Info size={17} />
                          <strong>Demo submission recorded</strong>
                        </div>
                        <p>
                          Your code has not been executed. The application
                          needs a secure code runner and test-case validator
                          before it can report a genuine accepted solution.
                        </p>
                        <button onClick={nextQuestion}>
                          {currentQuestionIndex + 1 >= questionCount
                            ? "Finish preview"
                            : "Continue to next question"}
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    )}

                    {!submitted && (
                      <button
                        className="compete-primary-button compete-submit-button"
                        onClick={submitSolution}
                      >
                        <CheckCircle2 size={16} />
                        Submit solution
                        <ArrowRight size={15} />
                      </button>
                    )}

                    <p className="compete-editor-disclaimer">
                      <ShieldCheck size={13} />
                      Code execution is disabled in this frontend preview.
                      Never execute untrusted code directly on your server.
                    </p>
                  </article>
                </div>
              </>
            ) : (
              <div className="compete-battle-finished">
                <span>
                  <Trophy size={30} />
                </span>
                <h1>Preview complete!</h1>
                <p>
                  You reached the end of this practice session in{" "}
                  <strong>{formatTime(elapsed)}</strong>. No winner has been
                  declared because this preview does not run test cases or
                  compare two live players.
                </p>
                <button
                  className="compete-primary-button"
                  onClick={() => {
                    setBattleFinished(false);
                    setBattleStarted(false);
                    setScreen("configure");
                  }}
                >
                  <RotateCcwFallback size={15} />
                  Set up another battle
                </button>
              </div>
            )}
          </section>
        )}

        {screen === "home" && selectedQuestion && (
          <div className="compete-modal-backdrop" onClick={() => setSelectedQuestion(null)}>
            <section
              className="compete-question-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="compete-modal-close"
                onClick={() => setSelectedQuestion(null)}
                aria-label="Close question details"
              >
                <X size={17} />
              </button>

              <span className="compete-section-eyebrow">
                <FileCode2 size={14} />
                QUESTION PREVIEW
              </span>
              <h2>{selectedQuestion.title}</h2>
              <p>{selectedQuestion.description}</p>

              <div className="compete-question-modal-stats">
                <span>
                  <Target size={15} />
                  {selectedQuestion.difficulty}
                </span>
                <span>
                  <Clock3 size={15} />
                  {selectedQuestion.time}
                </span>
                <span>
                  <Trophy size={15} />
                  {selectedQuestion.points} points
                </span>
                <span>
                  <Layers size={15} />
                  {selectedQuestion.topic}
                </span>
              </div>

              <div className="compete-question-modal-note">
                <Info size={16} />
                <p>
                  This question is a sample challenge. Company attribution,
                  hidden test cases, and verified recruiter questions should
                  only be displayed after they are actually integrated.
                </p>
              </div>

              <button
                className="compete-primary-button compete-modal-primary"
                onClick={() => {
                  const question = selectedQuestion;
                  setSelectedTopic(question.topic);
                  setSelectedQuestion(null);
                  setScreen("configure");
                }}
              >
                Challenge a friend on this question
                <ArrowRight size={15} />
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function QuestionBrowser({
  search,
  setSearch,
  difficultyFilter,
  setDifficultyFilter,
  questions: visibleQuestions,
  onSelect,
  onBattle,
  onClear,
}) {
  return (
    <section className="compete-questions-section">
      <div className="compete-section-heading">
        <div>
          <span className="compete-section-eyebrow">
            <BookOpen size={14} />
            YOUR NEXT CHALLENGE
          </span>
          <h2>Practice like the real interview.</h2>
          <p>
            Browse sample DSA problems, explore their difficulty, and
            challenge a friend to solve them.
          </p>
        </div>
      </div>

      <div className="compete-question-controls">
        <label className="compete-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search questions, topics or tags..."
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </label>

        <label className="compete-difficulty-select">
          <Filter size={15} />
          <select
            value={difficultyFilter}
            onChange={(event) => setDifficultyFilter(event.target.value)}
            aria-label="Filter by difficulty"
          >
            <option value="All">All levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <ChevronDown size={13} />
        </label>
      </div>

      <div className="compete-question-list">
        {visibleQuestions.length > 0 ? (
          visibleQuestions.map((question) => (
            <article className="compete-question-card" key={question.id}>
              <span className="compete-brand-mark">
                <Code2 size={19} />
              </span>

              <div className="compete-question-main">
                <div className="compete-question-title-row">
                  <h3>{question.title}</h3>
                  <span
                    className={`compete-difficulty ${question.difficulty.toLowerCase()}`}
                  >
                    {question.difficulty}
                  </span>
                </div>
                <p>{question.description}</p>
                <div className="compete-question-meta">
                  <span>
                    <Layers size={13} />
                    {question.topic}
                  </span>
                  <span>
                    <Clock3 size={13} />
                    {question.time}
                  </span>
                  <span>
                    <Trophy size={13} />
                    {question.points} points
                  </span>
                </div>
              </div>

              <div className="compete-question-end">
                <strong>
                  <Award size={14} />
                  {question.points} pts
                </strong>
                <button onClick={() => onSelect(question)}>
                  View question
                  <ArrowRight size={13} />
                </button>
                <button onClick={() => onBattle(question)}>
                  <Swords size={13} />
                  Practice
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="compete-empty-state">
            <Search size={25} />
            <strong>No questions found</strong>
            <p>
              Try another search term or change the difficulty filter.
            </p>
            <button className="compete-primary-button" onClick={onClear}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Leaderboard() {
  const entries = [
    { rank: 1, name: "Top Performer", points: 2450, wins: 24 },
    { rank: 2, name: "DSA Champion", points: 2180, wins: 21 },
    { rank: 3, name: "Code Explorer", points: 1960, wins: 18 },
    { rank: 4, name: "Algorithm Ace", points: 1740, wins: 16 },
    { rank: 5, name: "Problem Solver", points: 1520, wins: 14 },
  ];

  return (
    <section className="compete-leaderboard">
      <div className="compete-section-heading">
        <div>
          <span className="compete-section-eyebrow">
            <Trophy size={14} />
            COMPETE AND IMPROVE
          </span>
          <h2>Leaderboard</h2>
          <p>
            Sample leaderboard data for the interface preview. Live rankings
            will require saved match results and verified scoring.
          </p>
        </div>
      </div>

      <div className="compete-question-list">
        {entries.map((entry) => (
          <article className="compete-question-card" key={entry.rank}>
            <span className="compete-brand-mark">
              {entry.rank <= 3 ? (
                <Medal size={20} />
              ) : (
                `#${entry.rank}`
              )}
            </span>
            <div className="compete-question-main">
              <div className="compete-question-title-row">
                <h3>{entry.name}</h3>
                {entry.rank === 1 && (
                  <span className="compete-difficulty easy">
                    Top rank
                  </span>
                )}
              </div>
              <p>Consistent practice and coding challenges</p>
              <div className="compete-question-meta">
                <span>
                  <CheckCircle2 size={13} />
                  {entry.wins} sample wins
                </span>
              </div>
            </div>
            <div className="compete-question-end">
              <strong>
                <TrendingUp size={14} />
                {entry.points.toLocaleString()} pts
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RotateCcwFallback(props) {
  return <ArrowLeft {...props} />;
}

export default Compete;
