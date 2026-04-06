import type { Route } from "./+types/users";
import type { ApiUser } from "./types";
import { useLoaderData } from "react-router";
import { SearchBar } from "../../components/search/SearchBar";
import { ApiError, getAllUsers } from "utils/api/users/get-all-users";
import { requireToken, destroyAuthSession } from "utils/session.server";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Users - The News Bureau" },
    { name: "description", content: "Find users to connect with." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = await requireToken(request);

  try {
    return await getAllUsers(token);
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 401 || error.status === 403)
    ) {
      return destroyAuthSession(request, "/auth/login");
    }
    throw error;
  }
};

const Users = () => {
  const users = useLoaderData<typeof loader>() as ApiUser[];

  return (
    <>
      <h1 className="text-4xl mt-2">Users</h1>
      <p>A list of all users will be displayed here</p>

      <SearchBar />

      <section className="mt-20 p-4 grid max-w-800 rounded-sm border border-amber-400">
        {users.map((item) => (
          <div key={item.id}>
            <p className="text-xl">{item.email}</p>
            <hr className="bg-gray-700 m-20 " />
          </div>
        ))}
      </section>
    </>
  );
};

export default Users;
