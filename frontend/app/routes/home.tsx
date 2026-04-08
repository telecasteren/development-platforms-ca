import type { Route } from "./+types/home";
import type { ApiArticle } from "services/api/articles/types";
import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { getAllArticles } from "services/api/articles/fetch/get-all-articles";
import ArticlesSection from "../components/articles/ArticlesSection";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "The News Bureau" },
    { name: "description", content: "Welcome to News Bureau!" },
  ];
};

export const loader = async () => {
  return (await getAllArticles()) as ApiArticle[];
};

const Home = () => {
  const allArticles = useLoaderData<typeof loader>();
  const mostRecentArticles = allArticles.slice(0, 3);

  return (
    <>
      <h1 className="text-4xl mt-2">The News Bureau</h1>
      <p>The 3 most recent articles posted are displayed here</p>
      <ArticlesSection articles={mostRecentArticles} />
      <Link to="/articles" className="hover:underline">
        See all articles
      </Link>
    </>
  );
};

export default Home;
