import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "AppLayout.tsx", [
    index("routes/home.tsx"),

    route("auth/register", "routes/auth/register.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    route("auth/logout", "routes/auth/logout.tsx"),
    route("users", "routes/users/users.tsx"),
    route("users/articles", "routes/users/articles/UserArticles.tsx"),
    route("articles", "routes/articles/articles.tsx"),
    route("articles/:id", "routes/articles/single-article.tsx"),
  ]),
] satisfies RouteConfig;
