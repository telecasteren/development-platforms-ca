"use client";

import { useState } from "react";
import { useLoaderData } from "react-router";
import { SearchBar } from "../../../components/search/SearchBar";
import { getUserArticles } from "utils/api/articles/get-user-articles";
import { requireToken } from "utils/session.server";
import type { Route } from "./+types/UserArticles";
import type { ApiArticle } from "../../articles/types";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "My Articles - The News Bureau" },
    { name: "description", content: "Manage your articles." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = await requireToken(request);
  return getUserArticles(token);
};

export default function UserArticles() {
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [hideSearchBar, setHideSearchBar] = useState(false);

  const articles = useLoaderData<typeof loader>() as ApiArticle[];

  const handleOpenForm = () => {
    setShowForm(true);
    setShowButton(false);
    setHideSearchBar(true);
  };

  const handleSubmit = () => {
    setShowForm(false);
    setShowButton(true);
    setHideSearchBar(false);
  };

  return (
    <>
      <h1 className="text-4xl mt-2">My Articles</h1>
      <p>Manage and view your own articles here</p>

      {!hideSearchBar && <SearchBar />}

      {showButton && (
        <button
          onClick={handleOpenForm}
          className="rounded-sm mt-6 p-3 text-black bg-amber-400 hover:brightness-105 cursor-pointer"
        >
          Create article
        </button>
      )}

      {showForm && !showButton && (
        <form className="grid gap-2 mt-6">
          <input
            type="text"
            placeholder="Title here"
            className="p-2 rounded-sm border border-gray-900 dark:border-0 dark:bg-white text-black"
          ></input>
          <textarea
            placeholder="Write article here"
            className="p-2 rounded-sm border border-gray-900 dark:border-0 dark:bg-white text-black"
          ></textarea>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="p-2 rounded-sm bg-blue-600 text-white"
          >
            Submit
          </button>
        </form>
      )}

      <section className="mt-20 p-4 grid gap-20 max-w-800 rounded-sm border border-amber-400">
        {articles.map((item) => (
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
    </>
  );
}
