import type { Route } from "./+types/login";
import { createAuthAction, type ActionData } from "./action.server";
import { Form, useActionData, Link } from "react-router";

export { loader } from "./action.server";
export const action = createAuthAction("login");

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Login - The News Bureau" },
    { name: "description", content: "Log in to connect." },
  ];
};

const Login = () => {
  const actionData = useActionData<ActionData>();

  return (
    <section className="max-w-md mt-8 p-6 rounded-sm border border-amber-400 grid gap-4">
      <h1 className="text-3xl">Sign In</h1>

      <Form method="post" className="grid gap-3">
        <label className="grid gap-1">
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            className="border border-gray-400 px-3 py-2"
          />
        </label>

        <label className="grid gap-1">
          <span>Password</span>
          <input
            type="password"
            name="password"
            required
            className="border border-gray-400 px-3 py-2"
          />
        </label>

        {actionData?.error ? (
          <p className="text-red-600">{actionData.error}</p>
        ) : null}

        <Link to="/auth/register" className="underline">
          Create an account
        </Link>

        <button
          type="submit"
          className="px-4 py-2 border border-amber-500 hover:bg-amber-500"
        >
          Sign In
        </button>
      </Form>
    </section>
  );
};

export default Login;
