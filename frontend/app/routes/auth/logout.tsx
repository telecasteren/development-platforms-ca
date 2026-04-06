import type { ActionFunctionArgs } from "react-router";
import { logoutUser } from "utils/helpers/logout-user";

export const action = async ({ request }: ActionFunctionArgs) => {
  return logoutUser(request);
};
