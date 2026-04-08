import type { Route } from "./+types/logout";
import { logoutUser } from "services/helpers/logout-user";

export const action = async ({ request }: Route.ActionArgs) => {
  return logoutUser(request);
};
