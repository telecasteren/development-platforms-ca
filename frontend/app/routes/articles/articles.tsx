import type { Route } from "./+types/articles";
import { useLoaderData } from "react-router";
import { SearchBar } from "../../components/search/SearchBar";
import { getAllArticles } from "utils/api/articles/get-all-articles";
import type { ApiArticle } from "./types";

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

      <section className="mt-20 p-4 grid max-w-800 rounded-sm border border-amber-400">
        {articles.map((item) => (
          <div key={item.id}>
            <h3 className="text-xl">{item.title}</h3>
            <p className="mt-4">{item.body}</p>
            <p className="mt-4">
              <b>Release date:</b> {item.created_at}
            </p>
            <p>
              <b>Author:</b> {item.author_email ?? "Unknown author"}
            </p>
            <hr className="bg-gray-700 m-20 " />
          </div>
        ))}
      </section>
    </>
  );
};

export default Articles;
