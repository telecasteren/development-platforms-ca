export type LoginSuccess = {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
  };
};

export type RegisterSuccess = {
  message: string;
  user: { id: number; email: string };
};

export type ActionError = { error: string };
