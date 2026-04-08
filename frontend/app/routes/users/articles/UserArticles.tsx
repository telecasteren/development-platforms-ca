import type { Route } from "./+types/UserArticles";
import { useEffect, useState } from "react";
import { useActionData, useLoaderData, useNavigation } from "react-router";
import { SearchBar } from "../../../components/search/SearchBar";
import { getUserArticles } from "services/api/articles/fetch/get-user-articles";
import { postArticle } from "services/api/articles/post-article";
import { requireToken } from "services/session.server";
import ArticlesSection from "../../../components/articles/ArticlesSection";
import NewArticleForm from "../../../components/form/NewArticleForm";

export const meta = ({ loaderData }: Route.MetaArgs) => {
  const userEmail =
    loaderData && loaderData.length > 0
      ? loaderData[0].author_email
      : "My Articles";
  return [
    { title: `${userEmail} - The News Bureau` },
    { name: "description", content: "Manage your articles." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = await requireToken(request);
  return getUserArticles(token);
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const token = await requireToken(request);
    const formData = await request.formData();

    await postArticle(token, {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      category: formData.get("category") as string,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Failed to create article" };
  }
};

const UserArticles = () => {
  const articles = useLoaderData<typeof loader>();
  const [isCreating, setIsCreating] = useState(false);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.ok) {
      setIsCreating(false);
    }
  }, [actionData]);

  return (
    <>
      <h1 className="text-4xl mt-2">My Articles</h1>
      <p>Manage and view your own articles here</p>

      {!isCreating && <SearchBar />}

      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="rounded-sm mt-6 p-3 text-black bg-amber-400 hover:brightness-105 cursor-pointer"
        >
          Create article
        </button>
      )}

      {isCreating && (
        <>
          <NewArticleForm />
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="p-2 mt-2 w-full rounded-sm bg-red-800 hover:brightness-105 text-white cursor-pointer"
          >
            Cancel
          </button>
        </>
      )}

      <ArticlesSection articles={articles} />
    </>
  );
};

export default UserArticles;
