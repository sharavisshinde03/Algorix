# ALGORIX

**Learn Data Structures and Algorithms. Understand the logic. Practice with Java.**

ALGORIX is an interactive Data Structures and Algorithms (DSA) learning platform designed to help students develop strong problem-solving and algorithmic thinking skills.

The platform combines structured learning modules, algorithm implementations, coding practice, quizzes, resource discovery, and learning progress tracking.

Unlike a platform that only presents algorithm explanations, ALGORIX is designed to apply algorithmic concepts to practical features within the learning system itself.

## Key Features

### 1. Structured DSA Learning

ALGORIX organizes learning into structured modules and chapters, helping learners progress from programming fundamentals to advanced algorithmic concepts.

The learning experience includes:

- Organized chapters and lessons
- Concept explanations
- Algorithm-focused learning content
- Quizzes and knowledge checks
- Related coding problems
- Learning progress tracking

### 2. Algorithm-Based Platform Features

ALGORIX incorporates data structures and algorithms into practical platform functionality.

| Algorithm | Application in ALGORIX |
|---|---|
| Trie | Search suggestions and autocomplete |
| Knuth–Morris–Pratt (KMP) | Phrase searching within lesson content |
| Bloom Filter | Fast resource existence checks |
| Disjoint Set Union (DSU) | Connected resource grouping |
| Segment Tree | Range-based learning analytics |
| Quickselect | Student ranking and percentile calculations |
| Bipartite Matching | Student–mentor or student–opportunity matching |

#### Trie — Search Suggestions

A Trie stores strings according to their prefixes.

ALGORIX uses the Trie concept for searching and autocomplete, allowing matching suggestions to be found based on the characters entered by a learner.

#### KMP — Lesson Content Search

The Knuth–Morris–Pratt algorithm searches for a pattern within a text.

It uses a prefix table to avoid unnecessary repeated comparisons, making it suitable for searching phrases inside lesson content.

#### Bloom Filter — Resource Existence Checks

A Bloom Filter is a space-efficient probabilistic data structure.

It quickly checks whether a resource may exist in a collection. A negative result means the resource is definitely absent, while a positive result means it may exist and can be checked against the actual resource store.

#### Disjoint Set Union — Resource Connectivity

Disjoint Set Union maintains groups of connected elements.

ALGORIX can use this structure to identify connected groups of learning resources and efficiently determine whether two resources belong to the same group.

#### Segment Tree — Learning Analytics

A Segment Tree supports efficient range queries and updates.

It can be applied to learning analytics involving aggregated values across lessons, activities, or time ranges.

#### Quickselect — Student Ranking

Quickselect finds a kth smallest or largest value without requiring a complete sort.

ALGORIX can use it for rank-related calculations and percentile positions based on learner performance.

#### Bipartite Matching — Student–Mentor Matching

Bipartite Matching finds valid connections between two separate groups.

In ALGORIX, this algorithm can support matching students with mentors or learning opportunities according to defined eligibility and matching rules.

## Learning Modules

ALGORIX is organized into four major learning modules:

### 1. Introduction to Java
Programming fundamentals and the Java concepts required for algorithmic problem solving.

### 2. DSA Structures
Data structures used to organize, store, retrieve, and process information efficiently.

### 3. Introduction to Algorithms
Core algorithmic techniques, problem-solving strategies, and computational thinking.

### 4. Advanced Algorithms
Advanced data structures, algorithm optimization, graph algorithms, and other higher-level problem-solving techniques.

## Learning and Practice

ALGORIX is designed to connect learning with practice through:

- Algorithm explanations
- Visual learning experiences
- Chapter-based progression
- Quizzes
- Java coding practice
- Related LeetCode problems
- Lesson completion tracking
- Learning analytics
- Leaderboard and ranking features

## LeetCode Integration

ALGORIX provides a workflow for connecting a learner's LeetCode identity with their learning experience.

The platform tracks its own accepted submissions and learning progress independently.

Official LeetCode progress is synchronized only when it can be verified through an authorized integration. ALGORIX does not treat an unverified submission as an official LeetCode completion.

## Technology Stack

### Frontend
- React
- Vite
- JavaScript / TypeScript
- CSS

### Backend
- Java 21
- Spring Boot
- Spring Security
- REST APIs
- JWT Authentication

### Database
- PostgreSQL

### Development and Deployment Tools
- Git and GitHub
- Docker
- Maven
- Visual Studio Code

## Project Structure

```text
ALGORIX/
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   ├── pom.xml
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following tools:

- Java 21
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sharavisshinde03/Algorix.git
cd Algorix
```

### 2. Configure the database

Create a PostgreSQL database for ALGORIX.

Configure the backend database connection and authentication settings in the backend application configuration.

Keep passwords, JWT secrets, and other sensitive credentials out of the repository.

### 3. Start the backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite.

## Project Goals

ALGORIX aims to make DSA learning more practical by connecting algorithmic concepts with real platform applications.

The project focuses on:

- Understanding algorithms through structured learning
- Applying data structures to practical features
- Improving problem-solving skills through Java practice
- Connecting lessons with coding challenges
- Tracking learning progress and performance

## Author

**Sharavi Shinde**

B.Tech Computer Science — Artificial Intelligence & Machine Learning

## Project Status

ALGORIX is under active development. Learning content, algorithm applications, integrations, and platform features continue to evolve.
Soon will be updated and deployed.
