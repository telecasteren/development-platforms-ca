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
|    auth.ts
|    users.ts
|-  controllers/
|--  articles/
|--  auth/
|--  users/
|-  models/
|    article.ts
|    user.ts
|-  middleware/
|--  auth/
|--  error/
|--  logs/
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

#### Start the server

_Prerequisites:_

- Install dependencies:
  ```bash
  npm install
  ```
- Create a new database (news_bureau) with the provided .sql database export (MySQL Workbench or other)
  - Follow .env.example for DB credentials needed in .env
- Configure your .env file (follow .env.example)
  - Generate a random JWT_SECRET:<br/>
    <b style="color: green">online:</b><br/>
    [generate-random](https://generate-random.org/base64-string)<br/>
    <b style="color: green">with node:</b><br/>
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
  - (optional) Add custom PORT

**Then start the server by running:**

```bash
npm run dev
```

**Base URL:** http://localhost:3000/ <br/>
_or custom PORT if set_

**Swagger docs:** http://localhost:3000/api-docs/<br/>
_Can be opened in your browser._

Now you can use the API with Postman or any other application by following the API documentation.

---

💡 **Recommended testing route:**

<div style="padding: 10px; background-color: gray; color: black; border-radius: 4px;">
<ul>
<li>Start by testing all endpoints with empty headers and body</li>
<li>Then register a new user (try first with invalid body and then a valid body)</li>
<li>Login as the new user (try first with invalid body and then a valid body)</li>
<li>Create an article (try first with invalid body and then a valid body)</li>
<li>Fetch the article by its id</li>
<li>Try to update someone elses article (see database export for article ids)</li>
<li>Update the article (try first with empty or invalid body, then with one or more fields)</li>
<li>Search for the article by querying title, body or category</li>
<li>Delete the article</li>
<li>Fetch all articles</li>
</ul>
</div>

---

### OpenAPI Swagger

[swagger.ts](/config/documentation/swagger.ts) centralises all configuration of the Swagger documentation, including centralising repeated patterns used across routes.

When the server is running, go to **URL:** http://localhost:4000/api-docs/ , to see and test the API documentation. <span style="color: green">Adjust port to match where the server is running.</span>

**!Note!** The config allows a URL selection in the documentation, exposing all the URLs listed in the servers array in the swagger.ts configuration file. When used in production, these should be updated to the actual production and dev URLs. For now, I've listed 'localhost:4000' for prod and 'localhost:3000' for dev.

---

### Resources

- [Error handling with Express.js](https://expressjs.com/en/guide/error-handling.html)
- [zod validation](https://zod.dev/basics)
- [Swagger schema objects](https://swagger.io/specification/)

### AI Usage

During this project, AI tools such as Github CoPilot and Perplexity has been used to assist me in:

- Explaining concepts related to Express.js, zod and best practices
- Improving code documentation quality
- Providing commit message suggestions
- Debugging, ex: explaining or pointing to where 500 internal server errors

The file [swagger.ts](src/config/documentation/swagger.ts) is co-authored with CoPilot Codex.

**Important:** this projects architecture, implementation and code decisions are all performed by me.
