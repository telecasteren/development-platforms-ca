import type { Route } from "./+types/articles";
import type { ApiArticle } from "services/api/articles/types";
import { useLoaderData } from "react-router";
import { SearchBar } from "../../components/search/SearchBar";
import { getAllArticles } from "services/api/articles/fetch/get-all-articles";
import ArticlesSection from "../../components/articles/ArticlesSection";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Articles - The News Bureau" },
    {
      name: "description",
      content: "Check out the articles at The News Bureau.",
    },
  ];
};

export const loader = async () => {
  return (await getAllArticles()) as ApiArticle[];
};

const Articles = () => {
  const articles = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-4xl mt-2">Articles</h1>
      <p>View, search and read all articles here</p>
      <SearchBar />
      <ArticlesSection articles={articles} />
    </>
  );
};

export default Articles;
