type Credentials = { email: string; password: string };

type CredentialsResult =
  | { ok: true; value: Credentials }
  | { ok: false; error: string };

export const parseCredentials = (formData: FormData): CredentialsResult => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    return { ok: false, error: "Email and password are required" };
  }

  return { ok: true, value: { email, password } };
};
