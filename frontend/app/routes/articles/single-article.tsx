import type { Route } from "./+types/articles";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getArticleById } from "utils/api/articles/get-article-by-id";
import type { ApiArticle } from "./types";

export const meta = ({}: Route.MetaArgs) => {
  const title = "Article Title";
  return [
    { title: ` ${title} - The News Bureau` },
    { name: "description", content: "Check out all these amazing articles." },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
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
            <b>Release date:</b> {article.created_at}
          </p>
          <p>
            <b>Author:</b> {article.author_email ?? "Unknown author"}
          </p>
          <hr className="bg-gray-700 m-20" />
        </div>
      </section>
    </>
  );
};

export default SingleArticle;
