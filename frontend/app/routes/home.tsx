"use client";

import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { getAllArticles } from "utils/api/articles/get-all-articles";
import type { ApiArticle } from "../routes/articles/types";

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

      <section className="mt-20 p-4 grid max-w-800 border border-amber-400">
        {mostRecentArticles.map((item) => (
          <div key={item.id}>
            <h3 className="text-xl">{item.title}</h3>
            <p className="mt-4">{item.body}</p>
            <p className="mt-4">
              <b>Release date:</b> {item.created_at}
            </p>
            <p>
              <b>Author:</b> {item.author_email}
            </p>
            <hr className="bg-gray-700 m-20 " />
          </div>
        ))}
      </section>

      <Link to="/articles" className="hover:underline">
        See all articles
      </Link>
    </>
  );
};

export default Home;
