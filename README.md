<div align="center">

# ⚡ create-expresskit

**Scaffold production-ready Express.js backends in seconds.**

[![npm version](https://img.shields.io/npm/v/@aalokpatel/create-expresskit?color=cb3837&label=npm&logo=npm)](https://www.npmjs.com/package/@aalokpatel/create-expresskit)
[![npm downloads](https://img.shields.io/npm/dm/@aalokpatel/create-expresskit?color=cb3837)](https://www.npmjs.com/package/@aalokpatel/create-expresskit)
[![license](https://img.shields.io/npm/l/@aalokpatel/create-expresskit?color=blue)](LICENSE)
[![node](https://img.shields.io/node/v/@aalokpatel/create-expresskit?color=339933&logo=node.js)](https://nodejs.org)

<br/>

```bash
npx @aalokpatel/create-expresskit
```

<br/>

*No config. No boilerplate hunting. Just answer a few questions and get coding.*

</div>

---

## ✨ What You Get

An **instantly runnable**, **production-grade** Express.js project — with only the pieces you actually need.

```
my-backend-app/
├── src/
│   ├── server.ts          # Entry point with graceful shutdown
│   ├── app.ts             # Express app with helmet, cors, compression
│   ├── routes/
│   │   └── health.route.ts
│   ├── controllers/
│   │   └── health.controller.ts
│   ├── middlewares/
│   │   └── error.middleware.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── config/
│   │   ├── mongodb.ts     # (if MongoDB selected)
│   │   └── redis.ts       # (if Redis selected)
│   └── types/
│       └── index.ts       # (if TypeScript selected)
├── .env
├── .env.example
├── .gitignore
├── tsconfig.json          # (if TypeScript selected)
├── Dockerfile             # (if Docker selected)
├── docker-compose.yml     # (if Docker selected)
└── package.json
```

---

## 🚀 Quick Start

Make sure you have **Node.js 18+** installed, then run:

```bash
npx @aalokpatel/create-expresskit
```

The interactive CLI will guide you through:

```
  create-expresskit — Express.js backend scaffolder

  ✔ Project name: › my-backend-app
  ✔ Language: › TypeScript (recommended)
  ✔ Package manager: › npm
  ✔ Database: › MongoDB (Mongoose)
  ✔ Add Redis support? › No
  ✔ Add Docker support? › Yes
  ✔ Initialize a git repository? › Yes
  ✔ Install dependencies now? (via npm) › Yes

  Project summary
  ─────────────────────────────────
  Name             my-backend-app
  Language         TypeScript
  Package Manager  npm
  Database         MongoDB (Mongoose)
  Redis            No
  Docker           Yes
  Git              Yes
  Install Deps     Yes
  ─────────────────────────────────

  ✅ Project created successfully!

  Next steps:
  1. cd my-backend-app
  2. cp .env.example .env
  3. npm run dev

  Server will start at http://localhost:5000
  Health check:   http://localhost:5000/health
```

---

## 🎛️ Options at a Glance

### Language
| Option | Details |
|--------|---------|
| **TypeScript** *(recommended)* | Full type safety, `tsconfig.json`, strict mode |
| **JavaScript** | Plain JS with ES modules |

### Package Manager
| Option | Command |
|--------|---------|
| `npm` | `npm install` / `npm run dev` |
| `pnpm` | `pnpm install` / `pnpm dev` |
| `yarn` | `yarn` / `yarn dev` |
| `bun` | `bun install` / `bun dev` |

### Database
| Option | Details |
|--------|---------|
| **MongoDB (Mongoose)** | Auto-configured connection with retry logic, env-driven URI |
| **None** | Clean setup, add your own later |

### Redis
| Option | Details |
|--------|---------|
| **ioredis** *(recommended)* | Battle-tested, production-ready, cluster support |
| **redis** | Official `node-redis` v4 client |
| **None** | Skip Redis entirely |

### Additional Options
| Option | What It Does |
|--------|-------------|
| **Docker** | Generates `Dockerfile` (multi-stage build) + `docker-compose.yml` with your chosen services |
| **Git** | Runs `git init` in the new project |
| **Install Deps** | Runs install automatically using your chosen package manager |

---

## 🏗️ What's Inside the Generated App

### Built-in middleware stack
Every generated project includes:
- **[helmet](https://helmetjs.github.io/)** — Security headers
- **[cors](https://github.com/expressjs/cors)** — Cross-Origin Resource Sharing
- **[compression](https://github.com/expressjs/compression)** — Gzip response compression
- **[morgan](https://github.com/expressjs/morgan)** — HTTP request logging

### Health check endpoint
```
GET /health
```
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "uptime": 42.3,
    "timestamp": "2026-06-13T17:00:00.000Z",
    "environment": "development"
  }
}
```

### Standard API response format
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

### Graceful shutdown
The server handles `SIGTERM` and `SIGINT` signals — database connections are cleanly closed before the process exits.

### Docker (multi-stage build)
When Docker is enabled, the generated `Dockerfile` uses a **multi-stage build** to keep the final image lean:
- `builder` stage — compiles TypeScript
- `runner` stage — runs only production deps + compiled JS as a non-root user

---

## 📋 Requirements

| Tool | Version |
|------|---------|
| Node.js | `>= 18.0.0` |
| npm | `>= 9.0.0` |

> **Docker** is only needed if you select Docker support and want to run the generated project via containers.

---

## 📦 About This Package

| | |
|---|---|
| **Package** | `@aalokpatel/create-expresskit` |
| **npm** | [npmjs.com/package/@aalokpatel/create-expresskit](https://www.npmjs.com/package/@aalokpatel/create-expresskit) |
| **Repository** | [github.com/patelalok1309/create-expresskit](https://github.com/patelalok1309/create-expresskit) |
| **License** | ISC |
| **Author** | [Aalok Patel](https://github.com/patelalok1309) |

---

## 🔧 Local Development

If you want to contribute or modify the scaffolder itself:

```bash
# Clone the repo
git clone https://github.com/patelalok1309/create-expresskit.git
cd create-expresskit

# Install dependencies
npm install

# Run the CLI locally
npm run dev

# Build
npm run build
```

---

## 🗺️ Roadmap

- [ ] PostgreSQL support (with Prisma / Drizzle)
- [ ] Authentication boilerplate (JWT)
- [ ] Rate limiting setup
- [ ] Unit test scaffolding (Vitest / Jest)
- [ ] GitHub Actions CI/CD workflow generation

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

See [VERSIONING.md](./VERSIONING.md) for the full release and versioning workflow.

---

## 📄 License

ISC © [Aalok Patel](https://github.com/patelalok1309)

---

<div align="center">

Made with ❤️ for developers who just want to start building.

**[⭐ Star on GitHub](https://github.com/patelalok1309/create-expresskit)** · **[📦 View on npm](https://www.npmjs.com/package/@aalokpatel/create-expresskit)**

</div>
