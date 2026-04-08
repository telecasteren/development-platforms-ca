import type { Route } from "./+types/[id]";
import type { ApiArticle } from "services/api/articles/types";
import { useLoaderData } from "react-router";
import { getArticleById } from "services/api/articles/fetch/get-article-by-id";

export const meta = ({ loaderData, params }: Route.MetaArgs) => {
  const title = loaderData?.title ?? params.id ?? "Article";
  return [
    { title: ` ${title} - The News Bureau` },
    { name: "description", content: "Check out all these amazing articles." },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const id = Number(params.id);
  return (await getArticleById(id)) as ApiArticle;
};

const SingleArticle = () => {
  const article = useLoaderData<typeof loader>();

  return (
    <>
      <section className="mt-20 p-4 grid max-w-800 rounded-sm border border-amber-400">
        <div key={article.id}>
          <h3 className="text-xl">{article.title}</h3>
          <p className="mt-4">{article.body}</p>
          <p className="mt-4">
            <b>Category:</b> {article.category}
          </p>
          <p>
            <b>Author:</b> {article.author_email ?? "Unknown author"}
          </p>
          <p>
            <b>Release date:</b> {article.created_at}
          </p>
          <hr className="bg-gray-700 m-20" />
        </div>
      </section>
    </>
  );
};

export default SingleArticle;
