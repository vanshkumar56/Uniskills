
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  FileCode2,
  LockKeyhole,
  Play,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Target,
  Trophy,
  X,
} from "lucide-react";
import "../../styles/Learning.css";

const LOGOS = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "HTML & CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Git & GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
};

const COURSES = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    duration: "6 hours",
    description: "Build interactive, reusable interfaces using components, hooks, and state.",
    lessons: [
      "Components and JSX",
      "Props and component composition",
      "State and event handling",
      "Effects and API requests",
      "Forms and reusable components",
    ],
    tasks: [
      {
        id: "react-easy",
        title: "Build a Profile Card",
        level: "Easy",
        time: "25 min",
        points: 100,
        brief: "Build a reusable React profile card that accepts a person's name, role, and avatar as props.",
        requirements: [
          "Create a reusable ProfileCard component.",
          "Pass the name and role through props.",
          "Show a fallback avatar when no image is provided.",
          "Render at least three different profiles.",
          "Use clean, responsive CSS.",
        ],
        tests: [
          "The ProfileCard component renders without errors.",
          "Different props produce different profile content.",
          "The fallback avatar works when the image is missing.",
          "Three profiles can be rendered from an array.",
        ],
        starter: `import React from "react";

function ProfileCard({ name, role, avatar }) {
  // TODO: Build a reusable profile card.
  // Show name, role and avatar.
  // Provide a fallback when avatar is missing.

  return (
    <article className="profile-card">
      {/* Your implementation */}
    </article>
  );
}

export default ProfileCard;`,
      },
      {
        id: "react-medium",
        title: "Build a Task Manager",
        level: "Medium",
        time: "45–60 min",
        points: 250,
        brief: "Create a working task manager with add, complete, delete, and filter functionality.",
        requirements: [
          "Add tasks using a controlled form.",
          "Mark a task complete or incomplete.",
          "Delete tasks individually.",
          "Filter by All, Active, and Completed.",
          "Persist tasks in localStorage.",
          "Show an empty state when no tasks match.",
        ],
        tests: [
          "A task can be created from the form.",
          "Completing a task updates its visual state.",
          "Deleting a task removes it from the list.",
          "All three filters return the correct tasks.",
          "Tasks remain after a page refresh.",
          "Empty input is handled without creating a task.",
        ],
        starter: `import { useEffect, useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // TODO: Load saved tasks.
  // TODO: Add, complete and delete tasks.
  // TODO: Implement all three filters.
  // TODO: Save changes to localStorage.

  const visibleTasks = tasks;

  return (
    <main>
      <h1>My Tasks</h1>

      <form>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit">Add task</button>
      </form>

      <div className="filters">
        {["all", "active", "completed"].map((item) => (
          <button key={item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            {/* TODO: Render task actions */}
            {task.title}
          </li>
        ))}
      </ul>
    </main>
  );
}`,
      },
      {
        id: "react-hard",
        title: "Build a Searchable Product Dashboard",
        level: "Hard",
        time: "75–90 min",
        points: 400,
        brief: "Build a product dashboard with search, sorting, category filters, pagination, and loading and error states.",
        requirements: [
          "Fetch product data from an API or a supplied data fixture.",
          "Search by product name.",
          "Filter by category and sort by price.",
          "Implement pagination.",
          "Handle loading, empty, and error states.",
          "Avoid unnecessary duplicated state.",
        ],
        tests: [
          "Search is case-insensitive.",
          "Category filtering works with search.",
          "Price sorting returns the correct order.",
          "Pagination displays the correct subset.",
          "Empty results and API errors have clear messages.",
        ],
        starter: `import { useMemo, useState } from "react";

export default function ProductDashboard({ products = [] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name");

  // TODO: Filter products by query and category.
  // TODO: Sort by name or price.
  // TODO: Add pagination and empty states.

  const filteredProducts = useMemo(() => {
    return products;
  }, [products, query, category, sort]);

  return (
    <main>
      <h1>Products</h1>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />

      {/* TODO: Category filter, sorting and pagination */}

      <section>
        {filteredProducts.map((product) => (
          <article key={product.id}>
            {product.name}
          </article>
        ))}
      </section>
    </main>
  );
}`,
      },
    ],
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    duration: "7 hours",
    description: "Create reliable server-side applications, APIs, and backend services.",
    lessons: [
      "Node.js runtime and modules",
      "npm and project structure",
      "Promises and asynchronous code",
      "Express routes and middleware",
      "Validation and error handling",
    ],
    tasks: [
      {
        id: "node-easy",
        title: "Build a CLI Notes App",
        level: "Easy",
        time: "30 min",
        points: 100,
        brief: "Create a command-line notes application that can add, list, and delete notes.",
        requirements: [
          "Accept commands from the terminal.",
          "Add a note with a title and body.",
          "List all saved notes.",
          "Delete a note by ID.",
          "Persist notes in a JSON file.",
        ],
        tests: [
          "Adding a note saves the supplied data.",
          "Listing returns saved notes.",
          "Deleting an existing ID removes the note.",
          "Invalid commands produce helpful messages.",
        ],
        starter: `const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.join(__dirname, "notes.json");

async function loadNotes() {
  // TODO: Read and parse the JSON file.
  // Handle a missing file gracefully.
}

async function addNote(title, body) {
  // TODO: Load, append and save notes.
}

async function listNotes() {
  // TODO: Return all saved notes.
}

async function deleteNote(id) {
  // TODO: Remove a note by ID.
}

module.exports = { loadNotes, addNote, listNotes, deleteNote };`,
      },
      {
        id: "node-medium",
        title: "Create a REST API",
        level: "Medium",
        time: "45–60 min",
        points: 250,
        brief: "Build a REST API for managing tasks using Express and an in-memory data store.",
        requirements: [
          "Implement GET /tasks and GET /tasks/:id.",
          "Implement POST /tasks with validation.",
          "Implement PATCH /tasks/:id.",
          "Implement DELETE /tasks/:id.",
          "Return appropriate HTTP status codes.",
          "Handle missing IDs and malformed requests.",
        ],
        tests: [
          "GET returns the current task collection.",
          "POST creates a task and returns 201.",
          "Invalid task data returns 400.",
          "Unknown task IDs return 404.",
          "PATCH updates only supplied fields.",
          "DELETE removes a task successfully.",
        ],
        starter: `const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let nextId = 1;

// TODO: GET /tasks
// TODO: GET /tasks/:id
// TODO: POST /tasks
// TODO: PATCH /tasks/:id
// TODO: DELETE /tasks/:id
// TODO: Validate input and return correct status codes.

app.listen(3000, () => {
  console.log("Task API running on port 3000");
});

module.exports = app;`,
      },
      {
        id: "node-hard",
        title: "Build an Authentication Service",
        level: "Hard",
        time: "75–90 min",
        points: 400,
        brief: "Design a secure authentication API with registration, login, and protected routes.",
        requirements: [
          "Validate registration and login input.",
          "Hash passwords with a suitable password-hashing library.",
          "Issue and verify signed access tokens.",
          "Protect a private profile endpoint.",
          "Use environment variables for secrets.",
          "Return safe error messages and suitable status codes.",
        ],
        tests: [
          "Invalid credentials cannot access protected routes.",
          "Passwords are not stored in plaintext.",
          "Missing and invalid tokens are rejected.",
          "Expired tokens cannot access private routes.",
          "Secrets are not hard-coded in source files.",
        ],
        starter: `const express = require("express");
const app = express();

app.use(express.json());

// TODO: POST /auth/register
// TODO: POST /auth/login
// TODO: Authentication middleware
// TODO: GET /profile (protected)
//
// Use password hashing and a maintained token library.
// Keep secrets in environment variables.
// Never store plaintext passwords.

module.exports = app;`,
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming",
    duration: "5 hours",
    description: "Master modern JavaScript, asynchronous programming, arrays, and problem-solving.",
    lessons: [
      "Variables and data types",
      "Functions and scope",
      "Arrays and objects",
      "Array methods and transformations",
      "Promises and async/await",
    ],
    tasks: [
      {
        id: "js-easy",
        title: "Build a Text Analyzer",
        level: "Easy",
        time: "25 min",
        points: 100,
        brief: "Write a function that counts words, characters, sentences, and unique words in a text.",
        requirements: [
          "Count non-whitespace characters.",
          "Count words while handling repeated spaces.",
          "Count sentences using common sentence-ending punctuation.",
          "Count unique words without case sensitivity.",
          "Handle an empty input.",
        ],
        tests: [
          "Repeated spaces do not create extra words.",
          "Unique words are case-insensitive.",
          "Empty input returns zero counts.",
          "Punctuation is handled consistently.",
        ],
        starter: `function analyzeText(text) {
  // TODO: Count words and non-whitespace characters.
  // TODO: Count sentences.
  // TODO: Count unique words without case sensitivity.

  return {
    characters: 0,
    words: 0,
    sentences: 0,
    uniqueWords: 0,
  };
}

module.exports = analyzeText;`,
      },
      {
        id: "js-medium",
        title: "Build a Promise-Based API Client",
        level: "Medium",
        time: "45 min",
        points: 250,
        brief: "Implement a reusable API client with request timeouts, retries, and useful error handling.",
        requirements: [
          "Accept a URL and request options.",
          "Use fetch with an abort timeout.",
          "Retry transient server failures up to a configured limit.",
          "Do not retry ordinary client errors.",
          "Handle invalid JSON and network failures.",
          "Make the retry policy configurable.",
        ],
        tests: [
          "Successful responses are parsed.",
          "Transient failures are retried within the configured limit.",
          "Client errors are not repeatedly retried.",
          "Timeouts abort the request.",
          "Network errors produce useful error messages.",
        ],
        starter: `async function apiRequest(url, options = {}) {
  const {
    retries = 2,
    timeout = 5000,
    ...fetchOptions
  } = options;

  // TODO: Add request timeout.
  // TODO: Retry transient errors.
  // TODO: Parse responses and handle failures.

  return fetch(url, fetchOptions);
}

module.exports = apiRequest;`,
      },
      {
        id: "js-hard",
        title: "Implement an LRU Cache",
        level: "Hard",
        time: "60 min",
        points: 400,
        brief: "Implement a least-recently-used cache with get, put, eviction, and a fixed capacity.",
        requirements: [
          "Support get(key) and put(key, value).",
          "Move accessed items to the most-recently-used position.",
          "Evict the least-recently-used item when capacity is exceeded.",
          "Update existing keys without duplicating them.",
          "Target O(1) average time for get and put.",
          "Handle capacity and missing keys correctly.",
        ],
        tests: [
          "Recently accessed entries are retained.",
          "The least-recently-used entry is evicted.",
          "Updating an existing key changes its value.",
          "Cache size never exceeds capacity.",
          "Get and put meet the intended complexity.",
        ],
        starter: `class LRUCache {
  constructor(capacity) {
    // TODO: Validate capacity.
    // TODO: Initialize your cache data structure.
  }

  get(key) {
    // TODO: Return the value and update recency.
  }

  put(key, value) {
    // TODO: Insert/update and evict if necessary.
  }

  size() {
    // TODO: Return current cache size.
  }
}

module.exports = LRUCache;`,
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    duration: "5 hours",
    description: "Solve practical programming problems with Python data structures and algorithms.",
    lessons: [
      "Python syntax and data types",
      "Conditions and loops",
      "Lists and dictionaries",
      "Functions and modules",
      "Exceptions and file handling",
    ],
    tasks: [
      {
        id: "py-easy",
        title: "Build a CSV Data Summarizer",
        level: "Easy",
        time: "30 min",
        points: 100,
        brief: "Read a CSV of numeric scores and return count, minimum, maximum, and average.",
        requirements: [
          "Parse CSV rows safely.",
          "Convert valid score values to numbers.",
          "Ignore or report invalid rows consistently.",
          "Calculate count, minimum, maximum, and average.",
          "Handle an empty valid dataset.",
        ],
        tests: [
          "Correct statistics are returned for valid scores.",
          "Invalid rows do not crash the program.",
          "Empty datasets are handled safely.",
          "Average uses the correct number of valid scores.",
        ],
        starter: `import csv

def summarize_scores(file_path):
    # TODO: Read the CSV.
    # TODO: Validate numeric scores.
    # TODO: Calculate summary statistics.

    return {
        "count": 0,
        "minimum": None,
        "maximum": None,
        "average": None,
    }`,
      },
      {
        id: "py-medium",
        title: "Build a Log Analyzer",
        level: "Medium",
        time: "45–60 min",
        points: 250,
        brief: "Analyze application logs and report error counts, frequent endpoints, and response-time statistics.",
        requirements: [
          "Parse structured log entries.",
          "Count errors by status code.",
          "Find the most frequently requested endpoint.",
          "Calculate average response time.",
          "Handle malformed entries.",
          "Keep the implementation testable and modular.",
        ],
        tests: [
          "Status counts match the input.",
          "The most frequent endpoint is correct.",
          "Average response time uses valid entries.",
          "Malformed lines do not crash the analyzer.",
        ],
        starter: `def analyze_logs(lines):
    error_counts = {}
    endpoint_counts = {}
    response_times = []

    # TODO: Parse each log entry.
    # TODO: Aggregate errors and endpoint frequencies.
    # TODO: Calculate response-time statistics.

    return {
        "errors": error_counts,
        "endpoints": endpoint_counts,
        "average_response_time": None,
    }`,
      },
      {
        id: "py-hard",
        title: "Implement an LRU Cache",
        level: "Hard",
        time: "45–60 min",
        points: 400,
        brief: "Build a bounded LRU cache with O(1) average lookup, update, and eviction operations.",
        requirements: [
          "Implement get(key) and put(key, value).",
          "Track the most recently used item.",
          "Evict the least recently used item at capacity.",
          "Update existing keys correctly.",
          "Use a dictionary with an appropriate linked structure or OrderedDict.",
          "Explain the complexity of each operation.",
        ],
        tests: [
          "Accessing an item updates its recency.",
          "The correct entry is evicted.",
          "Updating a key does not increase the cache size.",
          "Missing keys return the documented result.",
          "Operations meet the expected average complexity.",
        ],
        starter: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        # TODO: Validate capacity.
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        # TODO: Return value and update recency.
        return None

    def put(self, key, value):
        # TODO: Insert/update and evict.
        pass`,
      },
    ],
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    category: "Frontend",
    duration: "4 hours",
    lessons: [
      "Semantic HTML",
      "CSS selectors and specificity",
      "Flexbox and Grid",
      "Responsive layouts",
      "Accessibility",
    ],
    description: "Build accessible, responsive web interfaces from scratch.",
    tasks: [
      {
        id: "html-easy",
        title: "Create a Responsive Profile Page",
        level: "Easy",
        time: "30 min",
        points: 100,
        brief: "Create a personal profile page with semantic HTML and responsive CSS.",
        requirements: [
          "Use semantic page structure.",
          "Display profile details and social links.",
          "Use responsive layout techniques.",
          "Add visible focus states for keyboard navigation.",
          "Provide meaningful image alt text.",
        ],
        tests: [
          "Page structure uses appropriate semantic elements.",
          "Layout adapts to mobile screens.",
          "Links have meaningful accessible labels.",
          "Keyboard focus is visible.",
        ],
        starter: `<!-- Create your profile page -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Profile</title>
  <style>
    /* TODO: Build a responsive layout */
  </style>
</head>
<body>
  <main>
    <!-- TODO: Add your profile content -->
  </main>
</body>
</html>`,
      },
      {
        id: "html-medium",
        title: "Build a Pricing Page",
        level: "Medium",
        time: "45 min",
        points: 250,
        brief: "Design a responsive pricing page with three plans, feature lists, and accessible selection controls.",
        requirements: [
          "Display three distinct pricing plans.",
          "Use CSS Grid or Flexbox.",
          "Highlight the recommended plan.",
          "Ensure keyboard accessibility.",
          "Support narrow mobile layouts.",
        ],
        tests: [
          "All three plans are readable.",
          "Cards adapt to mobile screens.",
          "Buttons have visible focus states.",
          "Plan features are easy to compare.",
        ],
        starter: `<!-- Build your pricing page -->
<main class="pricing-page">
  <header>
    <h1>Choose your plan</h1>
    <p>Find the right plan for your needs.</p>
  </header>

  <section class="pricing-grid">
    <!-- TODO: Create three plan cards -->
  </section>
</main>`,
      },
      {
        id: "html-hard",
        title: "Build an Accessible Dashboard",
        level: "Hard",
        time: "60–90 min",
        points: 400,
        brief: "Build a responsive analytics dashboard with a sidebar, data table, and accessible filtering controls.",
        requirements: [
          "Build a responsive sidebar and main content area.",
          "Create an accessible data table.",
          "Add search and filter controls.",
          "Use a consistent spacing and typography system.",
          "Support keyboard navigation.",
          "Handle small screens without horizontal overflow.",
        ],
        tests: [
          "Dashboard layout responds to screen size.",
          "Table headers are properly associated.",
          "Search and filter controls are accessible.",
          "Keyboard navigation works.",
          "No unintended horizontal overflow on mobile.",
        ],
        starter: `<!-- Build a responsive dashboard -->
<main class="dashboard">
  <aside aria-label="Main navigation">
    <!-- TODO: Add navigation -->
  </aside>

  <section>
    <h1>Analytics</h1>
    <!-- TODO: Add summary cards -->
    <!-- TODO: Add searchable data table -->
  </section>
</main>`,
      },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming",
    duration: "5 hours",
    description: "Build maintainable applications with types, interfaces, and generics.",
    lessons: [
      "Primitive and inferred types",
      "Interfaces and type aliases",
      "Union types",
      "Generics",
      "Type narrowing",
    ],
    tasks: [
      {
        id: "ts-easy",
        title: "Create a Typed Utility Library",
        level: "Easy",
        time: "25 min",
        points: 100,
        brief: "Write reusable, strongly typed functions for common array operations.",
        requirements: [
          "Implement a typed unique() function.",
          "Preserve the input element type.",
          "Implement a typed groupBy() function.",
          "Avoid unnecessary any types.",
        ],
        tests: [
          "Duplicate values are removed.",
          "The original input is not mutated.",
          "Output types are preserved.",
          "groupBy groups values correctly.",
        ],
        starter: `export function unique<T>(items: T[]): T[] {
  // TODO: Return unique values.
  return items;
}

export function groupBy<T, K extends string | number>(
  items: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  // TODO: Group items by the returned key.
  return {} as Record<K, T[]>;
}`,
      },
      {
        id: "ts-medium",
        title: "Build a Type-Safe API Client",
        level: "Medium",
        time: "45 min",
        points: 250,
        brief: "Create a reusable API client with typed responses and consistent error handling.",
        requirements: [
          "Define reusable request and response types.",
          "Support generic response types.",
          "Represent failures with a typed error model.",
          "Avoid unsafe any casts.",
          "Handle non-success HTTP responses.",
        ],
        tests: [
          "Response data is correctly typed.",
          "HTTP errors are handled consistently.",
          "Generic types work with different response shapes.",
          "Failure results can be narrowed safely.",
        ],
        starter: `type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

async function request<T>(
  url: string
): Promise<ApiResult<T>> {
  // TODO: Fetch and validate the response.
  // TODO: Return a typed success or failure result.
  return { success: false, error: "Not implemented" };
}

export { request, ApiResult };`,
      },
      {
        id: "ts-hard",
        title: "Design a Type-Safe State Machine",
        level: "Hard",
        time: "60 min",
        points: 400,
        brief: "Implement a state machine for a checkout workflow using discriminated unions.",
        requirements: [
          "Model idle, loading, success, and error states.",
          "Prevent invalid state combinations with types.",
          "Implement explicit transition functions.",
          "Narrow states safely.",
          "Write tests for valid and invalid transitions.",
        ],
        tests: [
          "Valid transitions produce the expected state.",
          "Invalid transitions are rejected.",
          "Success and error states carry appropriate data.",
          "The design avoids loosely typed state objects.",
        ],
        starter: `type CheckoutState =
  | { status: "idle" }
  | { status: "loading"; orderId: string }
  | { status: "success"; orderId: string; receiptId: string }
  | { status: "error"; message: string };

function transition(
  state: CheckoutState,
  event: { type: string; [key: string]: unknown }
): CheckoutState {
  // TODO: Define valid transitions.
  // TODO: Reject invalid transitions.
  return state;
}

export { CheckoutState, transition };`,
      },
    ],
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Developer Tools",
    duration: "3 hours",
    description: "Practice real version-control workflows and collaborative development.",
    lessons: [
      "Repositories and working trees",
      "Staging and commits",
      "Branches and merges",
      "Remote repositories",
      "Pull requests",
    ],
    tasks: [
      {
        id: "git-easy",
        title: "Create a Clean Git Repository",
        level: "Easy",
        time: "20 min",
        points: 100,
        brief: "Initialize a project repository and create a clean, documented commit history.",
        requirements: [
          "Initialize a repository.",
          "Add an appropriate .gitignore.",
          "Write a useful README.",
          "Make at least three meaningful commits.",
          "Verify the working tree is clean.",
        ],
        tests: [
          "Repository contains the intended files.",
          "Generated and secret files are excluded.",
          "Commit messages are descriptive.",
          "README explains how to run the project.",
        ],
        starter: `# Git Repository Task

1. Initialize a Git repository.
2. Add a .gitignore.
3. Create a useful README.md.
4. Make three meaningful commits.
5. Verify your final working tree.

Document the commands you used and the
reason for each commit in your submission.`,
      },
      {
        id: "git-medium",
        title: "Resolve a Merge Conflict",
        level: "Medium",
        time: "30–45 min",
        points: 250,
        brief: "Create two branches with conflicting edits, resolve the conflict, and merge the changes safely.",
        requirements: [
          "Create a feature branch.",
          "Introduce conflicting edits on two branches.",
          "Resolve the conflict without losing intended changes.",
          "Complete the merge.",
          "Verify the final result and history.",
        ],
        tests: [
          "Both intended changes are retained.",
          "No conflict markers remain.",
          "The merge completes successfully.",
          "The resulting history is understandable.",
        ],
        starter: `# Merge Conflict Challenge

1. Create a feature branch.
2. Edit the same lines on both branches.
3. Merge the branches.
4. Resolve the conflict.
5. Verify the resulting file and history.

Submit your commands and explain your
conflict-resolution decisions.`,
      },
      {
        id: "git-hard",
        title: "Recover a Broken Git History",
        level: "Hard",
        time: "45–60 min",
        points: 400,
        brief: "Recover from an accidental commit and demonstrate a safe recovery strategy.",
        requirements: [
          "Create a reproducible sample repository.",
          "Simulate an unwanted commit.",
          "Recover using an appropriate Git strategy.",
          "Preserve required changes.",
          "Explain when revert is safer than reset.",
        ],
        tests: [
          "Required files and changes are preserved.",
          "Recovery history matches the chosen strategy.",
          "The final repository state is correct.",
          "The explanation distinguishes shared and local history.",
        ],
        starter: `# Git Recovery Challenge

Create a sample repository and document:

1. An unwanted commit.
2. A recovery using git revert.
3. A separate local-only reset demonstration.
4. The final repository state.
5. When each strategy is appropriate.

Do not run destructive commands on a
repository containing work you need.`,
      },
    ],
  },
];

const LEVELS = ["Easy", "Medium", "Hard"];
const PROGRESS_KEY = "uniskills-practical-progress-v2";
const SKILLS_KEY = "uniskills-learning-skills-v2";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function courseById(id) {
  return COURSES.find((course) => course.id === id);
}

function taskById(course, taskId) {
  return course?.tasks.find((task) => task.id === taskId);
}

function getCourseStats(progress, course) {
  const record = progress[course.id] || {};
  const lessons = record.lessons || {};
  const passedTasks = record.passedTasks || {};

  const lessonCount = Object.keys(lessons).filter(
    (key) => lessons[key]
  ).length;

  const passedCount = course.tasks.filter(
    (task) => passedTasks[task.id]
  ).length;

  const total = course.lessons.length + course.tasks.length;
  const completed = lessonCount + passedCount;

  return {
    lessonCount,
    passedCount,
    total,
    completed,
    percentage: Math.round((completed / total) * 100),
    earned:
      lessonCount === course.lessons.length &&
      passedCount === course.tasks.length,
  };
}

export default function Learning() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(() =>
    readStorage(PROGRESS_KEY, {})
  );

  const [selectedSkills, setSelectedSkills] = useState(() =>
    readStorage(SKILLS_KEY, ["react", "node", "javascript", "python"])
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [courseId, setCourseId] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [tab, setTab] = useState("lessons");
  const [level, setLevel] = useState("Easy");
  const [editor, setEditor] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [toast, setToast] = useState("");

  const course = courseById(courseId);
  const task = taskById(course, taskId);
  const taskRecord = task
    ? progress[courseId]?.submissions?.[task.id] || {}
    : {};

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // Browser storage can be unavailable.
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(selectedSkills));
    } catch {
      // Browser storage can be unavailable.
    }
  }, [selectedSkills]);

  useEffect(() => {
    if (!task) return;

    const saved =
      progress[courseId]?.submissions?.[task.id]?.code ??
      task.starter;

    setEditor(saved);
    setLanguage(
      courseId === "python"
        ? "python"
        : courseId === "html-css"
          ? "html"
          : courseId === "typescript"
            ? "typescript"
            : courseId === "node"
              ? "javascript"
              : "javascript"
    );
  }, [taskId, courseId]); // Load the selected task's saved draft.

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return COURSES.filter((item) => {
      const stats = getCourseStats(progress, item);

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tasks.some((challenge) =>
          challenge.title.toLowerCase().includes(query)
        );

      const matchesFilter =
        filter === "All" ||
        (filter === "In progress" &&
          selectedSkills.includes(item.id) &&
          !stats.earned) ||
        (filter === "Earned badges" && stats.earned) ||
        (filter === "Not started" &&
          !selectedSkills.includes(item.id));

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, selectedSkills, progress]);

  const availableCourses = COURSES.filter(
    (item) =>
      !selectedSkills.includes(item.id) &&
      (!modalSearch ||
        item.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(modalSearch.toLowerCase()))
  );

  const completedLessons = selectedSkills.reduce((sum, id) => {
    const item = courseById(id);
    return sum + (item ? getCourseStats(progress, item).lessonCount : 0);
  }, 0);

  const completedTasks = selectedSkills.reduce((sum, id) => {
    const item = courseById(id);
    return sum + (item ? getCourseStats(progress, item).passedCount : 0);
  }, 0);

  const earnedBadges = selectedSkills.filter((id) => {
    const item = courseById(id);
    return item && getCourseStats(progress, item).earned;
  }).length;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const addSkill = (id) => {
    setSelectedSkills((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
    setModalOpen(false);
    showToast("Skill added to your learning path.");
  };

  const removeSkill = (id) => {
    setSelectedSkills((previous) =>
      previous.filter((item) => item !== id)
    );
    showToast("Skill removed from your learning path.");
  };

  const openCourse = (id) => {
    setCourseId(id);
    setTaskId(null);
    setTab("lessons");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openTask = (item) => {
    setTaskId(item.id);
    setTab("challenge");
  };

  const saveDraft = () => {
    if (!course || !task) return;

    setProgress((previous) => ({
      ...previous,
      [course.id]: {
        ...previous[course.id],
        submissions: {
          ...previous[course.id]?.submissions,
          [task.id]: {
            ...previous[course.id]?.submissions?.[task.id],
            code: editor,
            language,
            status: "Draft saved",
            updatedAt: new Date().toISOString(),
          },
        },
      },
    }));

    showToast("Draft saved in this browser.");
  };

  const submitTask = () => {
    if (!course || !task) return;

    if (!editor.trim()) {
      showToast("Write your solution before submitting.");
      return;
    }

    setProgress((previous) => ({
      ...previous,
      [course.id]: {
        ...previous[course.id],
        submissions: {
          ...previous[course.id]?.submissions,
          [task.id]: {
            ...previous[course.id]?.submissions?.[task.id],
            code: editor,
            language,
            status: "Pending evaluation",
            submittedAt: new Date().toISOString(),
          },
        },
      },
    }));

    showToast(
      "Submission saved. Automated grading requires a connected code runner."
    );
  };

  const markTaskPassed = () => {
    if (!course || !task) return;

    // Demo-only completion control.
    // Production should accept this result only from a trusted grader.
    setProgress((previous) => ({
      ...previous,
      [course.id]: {
        ...previous[course.id],
        passedTasks: {
          ...previous[course.id]?.passedTasks,
          [task.id]: true,
        },
      },
    }));

    showToast("Demo task marked as passed.");
  };

  const toggleLesson = (index) => {
    if (!course) return;

    setProgress((previous) => {
      const record = previous[course.id] || {};

      return {
        ...previous,
        [course.id]: {
          ...record,
          lessons: {
            ...record.lessons,
            [index]: !record.lessons?.[index],
          },
        },
      };
    });
  };

  const backToCatalog = () => {
    setCourseId(null);
    setTaskId(null);
    setTab("lessons");
  };

  return (
    <div className="learning-page">
      <header className="learning-header">
        <button
          type="button"
          className="learning-brand"
          onClick={backToCatalog}
        >
          <span className="learning-brand-icon">
            <BookOpen size={22} />
          </span>
          <span>
            <strong>UniSkills</strong>
            <small>Learn. Build. Prove.</small>
          </span>
        </button>

        <div className="learning-header-right">
          <span>
            <span className="learning-status-dot" />
            Learning workspace
          </span>
          <button
            className="learning-header-dashboard"
            type="button"
            onClick={() => navigate("/student/dashboard")}
          >
            Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </header>

      <main className="learning-main">
        {!course ? (
          <>
            <section className="learning-hero">
              <div className="learning-hero-copy">
                <div className="learning-eyebrow">
                  <Code2 size={14} />
                  SKILLS ARE BUILT, NOT CLAIMED
                </div>
                <h1>
                  Learn it.
                  <br />
                  <span>Build it. Prove it.</span>
                </h1>
                <p>
                  Build real projects, solve practical engineering
                  challenges, and demonstrate your skills through
                  hands-on work.
                </p>

                <div className="learning-hero-actions">
                  <button
                    className="learning-primary-button"
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("learning-catalog")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore challenges <ArrowRight size={16} />
                  </button>
                  <button
                    className="learning-secondary-button"
                    type="button"
                    onClick={() => setModalOpen(true)}
                  >
                    <Plus size={16} /> Add a skill
                  </button>
                </div>
              </div>
            </section>

            <section className="learning-stats">
              <article>
                <span className="learning-stat-icon green">
                  <BookOpen size={20} />
                </span>
                <div>
                  <strong>{completedLessons}</strong>
                  <small>Lessons completed</small>
                </div>
              </article>
              <article>
                <span className="learning-stat-icon blue">
                  <Code2 size={20} />
                </span>
                <div>
                  <strong>{completedTasks}</strong>
                  <small>Tasks passed</small>
                </div>
              </article>
              <article>
                <span className="learning-stat-icon orange">
                  <Trophy size={20} />
                </span>
                <div>
                  <strong>{earnedBadges}</strong>
                  <small>Badges earned</small>
                </div>
              </article>
              <article>
                <span className="learning-stat-icon purple">
                  <Target size={20} />
                </span>
                <div>
                  <strong>{selectedSkills.length}</strong>
                  <small>Skills in your path</small>
                </div>
              </article>
            </section>

            <section className="learning-my-skills">
              <div className="learning-section-heading">
                <div>
                  <span className="learning-section-eyebrow">
                    YOUR LEARNING PATH
                  </span>
                  <h2>Your skills, your progress</h2>
                  <p>
                    Work through lessons and complete practical projects
                    to unlock each skill badge.
                  </p>
                </div>
                <button
                  type="button"
                  className="learning-outline-button"
                  onClick={() => setModalOpen(true)}
                >
                  <Plus size={15} /> Add skill
                </button>
              </div>

              <div className="learning-course-grid">
                {selectedSkills.map((id) => {
                  const item = courseById(id);
                  if (!item) return null;

                  const stats = getCourseStats(progress, item);

                  return (
                    <article
                      className="learning-course-card"
                      key={item.id}
                    >
                      <div className="learning-course-card-top">
                        <span className="learning-tech-logo">
                          <img
                            src={LOGOS[item.name]}
                            alt={`${item.name} logo`}
                          />
                        </span>
                        <button
                          type="button"
                          className="learning-bookmark"
                          onClick={() => removeSkill(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={15} />
                        </button>
                      </div>

                      <span className="learning-category">
                        {item.category}
                      </span>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>

                      <div className="learning-card-meta">
                        <span><BookOpen size={13} /> {item.lessons.length} lessons</span>
                        <span><Code2 size={13} /> {item.tasks.length} projects</span>
                      </div>

                      <div className="learning-card-progress">
                        <div>
                          <span>Learning progress</span>
                          <strong>{stats.percentage}%</strong>
                        </div>
                        <div className="learning-progress-track">
                          <span style={{ width: `${stats.percentage}%` }} />
                        </div>
                      </div>

                      <div className="learning-course-card-bottom">
                        <span>
                          {stats.earned ? (
                            <><CheckCircle2 size={14} /> Badge earned</>
                          ) : (
                            <><Target size={14} /> {stats.passedCount}/{item.tasks.length} projects passed</>
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => openCourse(item.id)}
                        >
                          Continue <ArrowRight size={14} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="learning-discover" id="learning-catalog">
              <div className="learning-section-heading">
                <div>
                  <span className="learning-section-eyebrow">
                    PRACTICAL COURSE LIBRARY
                  </span>
                  <h2>Build your next skill</h2>
                  <p>
                    Search technologies and explore projects from
                    beginner to advanced.
                  </p>
                </div>
              </div>

              <label className="learning-search">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search React, Node.js, Python, projects..."
                />
              </label>

              <div className="learning-filter-row">
                {["All", "Not started", "In progress", "Earned badges"].map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      className={filter === item ? "active" : ""}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              <div className="learning-discover-grid">
                {filteredCourses.map((item) => {
                  const stats = getCourseStats(progress, item);
                  const added = selectedSkills.includes(item.id);

                  return (
                    <article
                      className="learning-discover-card"
                      key={item.id}
                    >
                      <div className="learning-discover-card-top">
                        <span className="learning-tech-logo">
                          <img src={LOGOS[item.name]} alt={`${item.name} logo`} />
                        </span>
                        <span className="learning-new-pill">
                          {stats.earned ? "Badge earned" : `${item.tasks.length} projects`}
                        </span>
                      </div>
                      <span className="learning-category">{item.category}</span>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>

                      <div className="learning-discover-meta">
                        <span><BookOpen size={13} /> {item.lessons.length} lessons</span>
                        <span><Clock3 size={13} /> {item.duration}</span>
                      </div>

                      <button
                        className="learning-discover-action"
                        type="button"
                        onClick={() => {
                          if (!added) addSkill(item.id);
                          openCourse(item.id);
                        }}
                      >
                        {added ? "Open course" : "Add and start learning"}
                        <ArrowRight size={15} />
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          <section className="learning-course-detail">
            <button
              type="button"
              className="learning-back-link"
              onClick={backToCatalog}
            >
              <ArrowLeft size={15} /> Back to learning
            </button>

            <div className="learning-detail-hero">
              <span className="learning-tech-logo large">
                <img src={LOGOS[course.name]} alt={`${course.name} logo`} />
              </span>
              <div className="learning-detail-copy">
                <span className="learning-category">{course.category}</span>
                <h1>{course.name} learning path</h1>
                <p>{course.description}</p>
                <div className="learning-detail-meta">
                  <span><BookOpen size={14} /> {course.lessons.length} lessons</span>
                  <span><Code2 size={14} /> {course.tasks.length} projects</span>
                  <span><Clock3 size={14} /> {course.duration}</span>
                </div>
              </div>
            </div>

            <div className="learning-detail-tabs">
              <button
                type="button"
                className={tab === "lessons" ? "active" : ""}
                onClick={() => {
                  setTab("lessons");
                  setTaskId(null);
                }}
              >
                <BookOpen size={15} /> Lessons
              </button>
              <button
                type="button"
                className={tab === "projects" || tab === "challenge" ? "active" : ""}
                onClick={() => {
                  setTab("projects");
                  setTaskId(null);
                }}
              >
                <Code2 size={15} /> Practical projects
              </button>
              <button
                type="button"
                className={tab === "badge" ? "active" : ""}
                onClick={() => setTab("badge")}
              >
                <Award size={15} /> Skill badge
              </button>
            </div>

            {tab === "lessons" && (
              <section className="learning-lessons-panel">
                <div className="learning-panel-heading">
                  <div>
                    <h2>Course lessons</h2>
                    <p>Study each topic and track your progress.</p>
                  </div>
                  <span>
                    {getCourseStats(progress, course).lessonCount}/{course.lessons.length}
                  </span>
                </div>

                <div className="learning-lesson-list">
                  {course.lessons.map((lesson, index) => {
                    const done = !!progress[course.id]?.lessons?.[index];

                    return (
                      <button
                        type="button"
                        key={lesson}
                        className={`learning-lesson-row ${done ? "completed" : ""}`}
                        onClick={() => toggleLesson(index)}
                      >
                        <span className="learning-lesson-check">
                          {done ? <CheckCircle2 size={17} /> : <Play size={15} />}
                        </span>
                        <span className="learning-lesson-copy">
                          <strong>{index + 1}. {lesson}</strong>
                          <small>{done ? "Completed" : "Mark complete when you finish studying"}</small>
                        </span>
                        {done ? <CheckCircle2 size={17} /> : <ArrowRight size={16} />}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="learning-primary-button"
                  type="button"
                  onClick={() => setTab("projects")}
                >
                  Go to practical projects <ArrowRight size={15} />
                </button>
              </section>
            )}

            {(tab === "projects" || tab === "challenge") && !task && (
              <section className="learning-projects-panel">
                <div className="learning-panel-heading">
                  <div>
                    <h2>Build real projects</h2>
                    <p>
                      Read the requirements, write a solution, and submit
                      your work for evaluation.
                    </p>
                  </div>
                </div>

                {LEVELS.map((itemLevel) => (
                  <div className="learning-project-level" key={itemLevel}>
                    <h3>{itemLevel}</h3>
                    <div className="learning-project-list">
                      {course.tasks
                        .filter((item) => item.level === itemLevel)
                        .map((item) => {
                          const passed =
                            !!progress[course.id]?.passedTasks?.[item.id];

                          return (
                            <article className="learning-project-row" key={item.id}>
                              <span className={`learning-project-icon ${itemLevel.toLowerCase()}`}>
                                <FileCode2 size={20} />
                              </span>
                              <div className="learning-project-copy">
                                <h4>{item.title}</h4>
                                <p>{item.brief}</p>
                                <div className="learning-project-meta">
                                  <span><Clock3 size={13} /> {item.time}</span>
                                  <span><Trophy size={13} /> {item.points} points</span>
                                  {passed && <span><CheckCircle2 size={13} /> Passed</span>}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="learning-primary-button"
                                onClick={() => openTask(item)}
                              >
                                {passed ? "Review" : "Start"}
                                <ArrowRight size={15} />
                              </button>
                            </article>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {tab === "challenge" && task && (
              <section className="learning-coding-workspace">
                <button
                  type="button"
                  className="learning-back-link"
                  onClick={() => {
                    setTaskId(null);
                    setTab("projects");
                  }}
                >
                  <ArrowLeft size={15} /> All projects
                </button>

                <div className="learning-challenge-heading">
                  <div>
                    <span className={`learning-level-tag ${task.level.toLowerCase()}`}>
                      {task.level}
                    </span>
                    <h2>{task.title}</h2>
                    <p>{task.brief}</p>
                  </div>
                  <span className="learning-challenge-points">
                    <Trophy size={16} /> {task.points} points
                  </span>
                </div>

                <div className="learning-coding-grid">
                  <div className="learning-challenge-instructions">
                    <section>
                      <h3><Target size={17} /> Requirements</h3>
                      <ul>
                        {task.requirements.map((requirement) => (
                          <li key={requirement}>{requirement}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3><CheckCircle2 size={17} /> Evaluation criteria</h3>
                      <p>
                        Your solution should satisfy these test cases.
                        They describe the expected behaviour; actual
                        automated execution requires a connected grader.
                      </p>
                      <ul>
                        {task.tests.map((test) => (
                          <li key={test}>{test}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="learning-prototype-note">
                      <ShieldCheck size={16} />
                      Badge awards should be issued by the trusted
                      evaluation backend, not by self-reported completion.
                    </section>
                  </div>

                  <div className="learning-editor-panel">
                    <div className="learning-editor-toolbar">
                      <span><Code2 size={15} /> Solution editor</span>
                      <select
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                        aria-label="Programming language"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                      </select>
                    </div>

                    <textarea
                      className="learning-code-editor"
                      spellCheck={false}
                      autoCapitalize="off"
                      autoCorrect="off"
                      value={editor}
                      onChange={(event) => setEditor(event.target.value)}
                      aria-label="Write your code solution"
                    />

                    <div className="learning-editor-footer">
                      <span>
                        {editor.split("\n").length} lines
                        {taskRecord.status ? ` · ${taskRecord.status}` : ""}
                      </span>
                      <button
                        type="button"
                        className="learning-secondary-button"
                        onClick={() => setEditor(task.starter)}
                      >
                        Reset starter
                      </button>
                    </div>

                    <div className="learning-editor-actions">
                      <button
                        type="button"
                        className="learning-secondary-button"
                        onClick={saveDraft}
                      >
                        Save draft
                      </button>
                      <button
                        type="button"
                        className="learning-primary-button"
                        onClick={submitTask}
                      >
                        Submit solution <Send size={15} />
                      </button>
                    </div>

                    {taskRecord.status && (
                      <div className="learning-submission-status">
                        <Clock3 size={17} />
                        <div>
                          <strong>{taskRecord.status}</strong>
                          <p>
                            {taskRecord.status === "Pending evaluation"
                              ? "Your code is saved, but no automated tests have run yet. Connect a secure code execution backend to evaluate it."
                              : "Your latest draft is saved locally."}
                          </p>
                        </div>
                      </div>
                    )}

                    {progress[course.id]?.passedTasks?.[task.id] && (
                      <div className="learning-submission-status passed">
                        <CheckCircle2 size={18} />
                        <strong>Passed in demo progress</strong>
                      </div>
                    )}

                    {import.meta.env.DEV && (
                      <button
                        type="button"
                        className="learning-demo-pass"
                        onClick={markTaskPassed}
                      >
                        Demo only: Mark task passed
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {tab === "badge" && (
              <section className="learning-badge-panel">
                {getCourseStats(progress, course).earned ? (
                  <Award size={46} />
                ) : (
                  <LockKeyhole size={42} />
                )}
                <h2>{course.name} skill badge</h2>
                <p>
                  Complete all lessons and pass every practical project
                  to qualify for this badge.
                </p>
                <div className="learning-badge-requirements">
                  <span>
                    <BookOpen size={17} />
                    {getCourseStats(progress, course).lessonCount}/{course.lessons.length} lessons complete
                  </span>
                  <span>
                    <Code2 size={17} />
                    {getCourseStats(progress, course).passedCount}/{course.tasks.length} projects passed
                  </span>
                </div>
                <button
                  type="button"
                  className="learning-primary-button"
                  onClick={() => setTab("projects")}
                >
                  View practical projects <ArrowRight size={15} />
                </button>
                <p className="learning-prototype-note">
                  This prototype tracks progress locally. Real badges must
                  be granted by a trusted backend after automated tests
                  pass. Browser-only progress is not independently verified.
                </p>
              </section>
            )}
          </section>
        )}
      </main>

      <footer className="learning-footer">
        <span><ShieldCheck size={13} /> UniSkills Learning Workspace</span>
        <span>Build real skills. Demonstrate real work.</span>
      </footer>

      {modalOpen && (
        <div
          className="learning-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <section className="learning-add-modal" role="dialog" aria-modal="true">
            <div className="learning-modal-heading">
              <Plus size={21} />
              <button
                type="button"
                className="learning-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <h2>Add a skill</h2>
            <p>Choose a technology to add to your learning path.</p>

            <label className="learning-modal-search">
              <Search size={17} />
              <input
                value={modalSearch}
                onChange={(event) => setModalSearch(event.target.value)}
                placeholder="Search skills..."
              />
            </label>

            <div className="learning-add-list">
              {availableCourses.length ? (
                availableCourses.map((item) => (
                  <button
                    type="button"
                    className="learning-add-row"
                    key={item.id}
                    onClick={() => addSkill(item.id)}
                  >
                    <span className="learning-tech-logo">
                      <img src={LOGOS[item.name]} alt="" />
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </span>
                    <Plus size={16} />
                  </button>
                ))
              ) : (
                <p>All matching skills are already in your path.</p>
              )}
            </div>

            <button
              type="button"
              className="learning-secondary-button learning-modal-cancel"
              onClick={() => setModalOpen(false)}
            >
              Done
            </button>
          </section>
        </div>
      )}

      {toast && (
        <div className="learning-toast" role="status">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}
