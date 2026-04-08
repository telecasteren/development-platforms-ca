import type { Route } from "./+types/[id]";
import { useParams } from "react-router";
import { contentData } from "../../utils/data/data";

export const meta = ({ params }: Route.MetaArgs) => {
  const id = params.id;
  const item = contentData.find((item) => item.id === id);
  const title = item?.title || params.id;
  return [
    { title: `${title} - The News Bureau"` },
    {
      name: "description",
      content: "A guide for how to use The News Bureau application.",
    },
  ];
};

const HelpContent = () => {
  const { id } = useParams();
  const item = contentData.find((item) => item.id === id);
  if (!item) return <p>Help subject not found.</p>;

  return (
    <>
      <h1 className="text-4xl mt-2">{item.title}</h1>
      <section className="mt-20 p-4 grid max-w-800 rounded-sm border border-amber-400">
        <p style={{ whiteSpace: "pre-line" }}>{item.desc}</p>
      </section>
    </>
  );
};

export default HelpContent;
