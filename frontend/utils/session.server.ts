import { createCookieSessionStorage, redirect } from "react-router";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const isProd = process.env.NODE_ENV === "production";

const storage = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: "__news_bureau_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: isProd,
    maxAge: 60 * 60 * 24,
  },
});

export const getAuthToken = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  return typeof token === "string" ? token : null;
};

export const requireToken = async (
  request: Request,
  redirectTo = "/auth/login",
) => {
  const token = await getAuthToken(request);
  if (!token) {
    throw redirect(redirectTo);
  }
  return token;
};

export const requireGuest = async (request: Request, redirectTo = "/users") => {
  const token = await getAuthToken(request);
  if (token) {
    throw redirect(redirectTo);
  }
};

export const createAuthSession = async (
  request: Request,
  token: string,
  redirectTo: string,
) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const destroyAuthSession = async (
  request: Request,
  redirectTo: string,
) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const { getSession, commitSession, destroySession } = storage;
