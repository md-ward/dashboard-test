# 📝 Next.js Auth0 Blog — Simple Authenticated Posts App

This is a **minimal blog-like app** built using **Next.js App Router**, **Auth0** for authentication, and **MongoDB** for backend storage.  
It was built quickly as a **test/demo project**, and while functional, it still requires updates, monitoring, and improvements.

---

## 🚀 Tech Stack

- **Next.js App Router**
- **Auth0** — Authentication & Authorization
- **MongoDB** — Data storage for posts
- **Mongoose** — MongoDB ODM
- **Shadcn/ui** — Beautiful UI components
- **Tailwind CSS** — Utility-first CSS framework
- **GSAP** — Scroll and interaction animations
- **CSS Animations** — Custom transitions and visuals

---

## 🔐 Authentication

User authentication is handled via **Auth0**. Users must log in to interact with certain routes (e.g., create, edit, or delete posts).

---

## 🔧 Environment Variables

Create a `.env.local` file in the root and add the following variables:

| Variable              | Description                                        |
| --------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL used for frontend API calls               |
| `AUTH0_DOMAIN`        | Your Auth0 domain (e.g., `dev-xxxxx.us.auth0.com`) |
| `AUTH0_CLIENT_ID`     | Your Auth0 Client ID                               |
| `AUTH0_CLIENT_SECRET` | Auth0 Client Secret                                |
| `AUTH0_BASE_URL`      | App's base URL (e.g., `http://localhost:3000`)     |
| `AUTH0_SECRET`        | A random secret used to encrypt session cookies    |
| `NEXT_MONGO_URI`      | MongoDB connection string                          |
| `DB_NAME`             | MongoDB database name                              |

---

## 📦 Features

- 🔒 Secure login/logout via **Auth0**
- 📝 Add, delete, and list posts
- 📌 Pin a post to always appear first but its hard coded in db so need update to handle in code .
- 💅 Styled with **Tailwind CSS** and **Shadcn UI**
- 🎬 Animated with **GSAP** and **CSS transitions**

---

## 🛠️ How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/md-ward/dashboard-test.git
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env.local` file in the root and add the variables from the table above.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📚 Available Routes

| Route    | Description                                                 |
| -------- | ----------------------------------------------------------- |
| `/`      | Homepage displaying all public posts                        |
| `/tech`  | Technology section — shows tech-related or tagged posts     |
| `/admin` | Admin dashboard — protected, accessible only when logged in |

---
