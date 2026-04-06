# NEWS BUREAU - REST API

**Author:** Tele Caster Nilsen<br/>
**Website:** [www.telecasternilsen.com](https://telecasternilsen.com)

**Table of Contents**

- [Motivation letter](#motivation-letter)
- [Technologies](#technologies)
- [Project structure](#project-structure)
- [Get started](#get-started)
- [Resources](#resources)

---

### Motivation letter

Tough call. I decided to build the REST API with Express.js, because I want to become a fullstack developer. It's important to understand whats going on under the hood, and to know how everything is wired together, is in my opinion the key to create great software. And also, I've fallen in love with programming. :)

---

### Technologies

- Express.js
- TypeScript
- SQL

### Project structure

```bash
src/
|-  routes/
|    articles.ts
|    users.ts
|-  controllers/
|    articlesController.ts
|    authController.ts
|    usersController.ts
|-  models/
|    article.ts
|    user.ts
|-  middleware/
|-  config/
|-  app.ts
|-  server.ts
```

---

### Get started

#### Start the project

Clone the repository and open it in your IDE

```bash
git clone https://github.com/telecasteren/development-platforms-ca.git
cd development-platforms-ca
code . // or open with other IDE
```

Start the server

```bash
npm run dev
```

**Base URL:** http://localhost:4000/

**Swagger docs:** http://localhost:4000/api-docs/

Now you can use the API with Postman or any other application by following the API documentation.

---

**Frontend & Backend**

You can start both the frontend and the backend server simultaneously by running

```bash
npm run dev:all
```

The terminal will show you where the backend and frontend is running:

```bash
[backend] Server is running on port 4000
[frontend]   ➜  Local:   http://localhost:5173/
```

Open the frontend URL in your browser to view, test or watch live code changes on the frontend.

---

### OpenAPI Swagger

[swagger.ts](/config/documentation/swagger.ts) centralises all configuration of the Swagger documentation, including centralising repeated patterns used across routes.

When the server is running, go to **URL:** http://localhost:4000/api-docs/ , to see and test the API documentation. Adjust port to match where the server is running.

**!Note!** The config allows a URL selection in the documentation, exposing all the URLs listed in the servers array in the swagger.ts configuration file. When used in production, these should be updated to the actual production and dev URLs. For now, I've listed 'localhost:4000' for prod and 'localhost:3000' for dev.
