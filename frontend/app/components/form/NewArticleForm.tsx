import { useNavigation } from "react-router";

const NewArticleForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <form method="post" className="grid gap-2 mt-6">
      <input
        name="title"
        type="text"
        placeholder="Title here..."
        className="p-2 rounded-sm border border-gray-900 dark:border-0 dark:bg-white text-black"
      ></input>
      <input
        name="category"
        type="text"
        placeholder="Politics, Crime, Weather Forecast..."
        className="p-2 rounded-sm border border-gray-900 dark:border-0 dark:bg-white text-black"
      ></input>
      <textarea
        name="body"
        placeholder="Write article here..."
        className="p-2 rounded-sm border border-gray-900 dark:border-0 dark:bg-white text-black"
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className="p-2 rounded-sm bg-blue-600 hover:brightness-105 text-white cursor-pointer"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default NewArticleForm;
