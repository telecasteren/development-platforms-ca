"use client";

export const SearchBar = () => {
  return (
    <form className="flex gap-2 mt-6">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="w-full bg-white text-black p-2 border rounded-sm"
      ></input>
      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-700 rounded-sm p-2 cursor-pointer"
      >
        SEARCH
      </button>
    </form>
  );
};
