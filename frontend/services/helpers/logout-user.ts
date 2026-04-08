import { destroyAuthSession } from "services/session.server";

export const logoutUser = (request: Request) => {
  return destroyAuthSession(request, "/auth/login");
};
