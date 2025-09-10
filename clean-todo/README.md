# 📝 Clean Architecture Todo App

A full-stack Todo application built with **React (Vite)**, **Express**, and **MongoDB**, following **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

## 🚀 Features
- User authentication (JWT)
- Register / Login / Protected routes
- CRUD for Todos
- Separation of concerns with Clean Architecture
- Reusable service + repository patterns
- Frontend + Backend in a Monorepo

## 🏗️ Project Structure
apps/
├─ api/ # Express backend (Clean Architecture)
│ ├─ application/ # Use cases (business logic)
│ ├─ domain/ # Entities, schemas
│ ├─ infrastructure # Repositories, DB
│ └─ interfaces/ # Controllers, routes, middlewares
│
├─ web/ # React frontend (Vite + TS)
│ ├─ src/
│ │ ├─ pages/ # Login, Todos
│ │ ├─ hooks/ # useAuth, etc.
│ │ ├─ services/ # API client
│ │ └─ app/ # Routing
│ └─ vite.config.ts
│
└─ package.json


###  Setup Environment Variables

Create a `.env` file at the **root** of your project:

# Server
PORT=4000
MONGO_URI=mongodb://localhost:27017/clean_todo
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173

# Web
VITE_API_BASE_URL=http://localhost:4000/api


## ⚙️ Setup

### 1️⃣ Clone the repo


git clone https://github.com/your-username/clean-architecture-mern-todo.git
cd clean-architecture-mern-todo


## 🏛️ Notes on Architecture & Patterns

- **Layered + Clean boundaries**:  
  - `domain` (entities)  
  - `application` (use cases/services)  
  - `infrastructure` (db, repos, JWT)  
  - `interfaces` (http/controllers)  
  → Promotes testability & Single Responsibility Principle (SRP).

- **Repository pattern**: `TodoRepository`, `UserRepository` abstract persistence from domain logic.

- **Use Case pattern**: each app action is a class with a single `execute` method (Command pattern flavor).

- **Composition over inheritance (React)**: feature components, hooks, and service modules. Controlled component composition for Todo UI.

- **Validation at the edge**: `zod` schemas + `validate` middleware.

- **Dependency inversion**: wiring in `routes.ts` (naive DI). Could be swapped with a DI container like Awilix.

- **Security**: JWT Bearer with `requireAuth` middleware; bcrypt for password hashing.

- **DX / Quality**: TS strict mode, ESLint + Prettier, EditorConfig.

---

## ⚙️ Backend (Express + TS + MongoDB/Mongoose)

📂 Folder structure:  
- `domain` → entities  
- `application` → use cases / services  
- `infrastructure` → db / models / repositories / security  
- `interfaces` → controllers / http  

🔑 Features:  
- JWT auth + password hashing (bcrypt)  
- `zod` validation middleware  
- Helmet + CORS  
- Structured logging (pino)  
- Repository pattern for **User** and **Todo**  
- Use cases per operation  
- Clean controller layer  

---

## 🎨 Frontend (React + TS + Vite)

📂 Feature-based structure:  
- `pages/`  
- `components/`  
- `services/`  
- `hooks/`  
- `types/`  

🔑 Features:  
- Zustand for minimal auth state  
- Axios client with Bearer token interceptor  
- Auth flow (login/register)  
- Protected route wrapper  
- CRUD UI for todos  
