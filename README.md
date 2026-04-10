# NEWS BUREAU - REST API

**Author:** Tele Caster Nilsen<br/>
**Website:** [www.telecasternilsen.com](https://telecasternilsen.com)

**Table of Contents**

- [Motivation letter](#motivation-letter)
- [Technologies](#technologies)
- [Project structure](#project-structure)
- [Get started](#get-started)
- [OpenApi Swagger](#openapi-swagger)
- [Resources](#resources)
- [AI usage](#ai-usage)

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

### OpenAPI Swagger

[swagger.ts](/config/documentation/swagger.ts) centralises all configuration of the Swagger documentation, including centralising repeated patterns used across routes.

When the server is running, go to **URL:** http://localhost:4000/api-docs/ , to see and test the API documentation. Adjust port to match where the server is running.

**!Note!** The config allows a URL selection in the documentation, exposing all the URLs listed in the servers array in the swagger.ts configuration file. When used in production, these should be updated to the actual production and dev URLs. For now, I've listed 'localhost:4000' for prod and 'localhost:3000' for dev.

---

### Resources

- [Error handling with Express.js](https://expressjs.com/en/guide/error-handling.html)
- [zod validation](https://zod.dev/basics)

### AI Usage

During this project, AI tools such as Github CoPilot and Perplexity has been used to assist me in:

- Explaining concepts related to Express.js, zod and best practices
- Improving code documentation quality
- Providing commit message suggestions

The architecture, implementation and code decisions are all performed by me.
