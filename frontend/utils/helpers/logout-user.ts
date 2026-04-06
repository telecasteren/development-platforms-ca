import { destroyAuthSession } from "utils/session.server";

export const logoutUser = (request: Request) => {
  return destroyAuthSession(request, "/auth/login");
};
