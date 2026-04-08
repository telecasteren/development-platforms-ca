import type { ApiArticle } from "services/api/articles/types";

type MyArticleProps = {
  articles: ApiArticle[];
};

const ArticlesSection = ({ articles }: MyArticleProps) => {
  return (
    <section className="mt-20 p-4 grid gap-20 max-w-800 rounded-sm border border-amber-400">
      {articles.map((item) => (
        <div key={item.id}>
          <h3 className="text-xl">{item.title}</h3>
          <p className="mt-4">{item.body}</p>
          <p className="mt-4">
            <b>Category: </b> {item.category}
          </p>
          <p>
            <b>Author:</b> {item.author_email}
          </p>
          <p>
            <b>Release date:</b> {item.created_at}
          </p>
          <hr className="bg-gray-700 m-20 " />
        </div>
      ))}
    </section>
  );
};

export default ArticlesSection;
