# THE NEWS BUREAU - FRONTEND

**Author:** Tele Caster Nilsen<br/>
**Website:** [www.telecasternilsen.com](https://telecasternilsen.com)

**Table of Contents**

- [Technologies](#technologies)
- [Project structure](#project-structure)
- [Get started](#get-started)
- [Resources](#resources)

---

### Technologies

- TypeScript
- React Router
- Vite
- Tailwind

### Project structure

```bash
src/
|-  app/
|--  components/
|--  css/
|--  routes/
|    AppLayout.ts
|    root.ts
|    routes.ts
|-  utils/
|--  api/
|--  config/
|--  helpers/
|-  public/
|-  package.json
```

---

### Get started

#### Start the project

Clone the repository and open it in your IDE

```bash
git clone https://github.com/telecasteren/development-platforms-ca.git
cd development-platforms-ca

git switch frontend

cd frontend
code . // or open with other IDE
```

### **!NOTE!** The frontend application must be started after backend server is running, follow these steps:

**Frontend & Backend**

You can start both the frontend and the backend server simultaneously by running

```bash
cd news-bureau-api-server
npm run dev:all
```

The terminal will show you where the backend and frontend is running:

```bash
[backend] Server is running on port 4000
[frontend]   ➜  Local:   http://localhost:5173/
```

Open the **frontend** URL in your browser to view, test or watch live code changes on the frontend.

<span style="color:green;">**!Note!** Any requests you make through the frontend UI speaks directly with the database using production data. This means if you create a user or article, these will be stored in the database.</span> <span style="color:red">**Please use responsibly.**</span>

---

### Resources

[React Router](https://reactrouter.com/start/framework/installation)
[Sessions and cookies](https://reactrouter.com/explanation/sessions-and-cookies)
