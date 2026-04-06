import type { User } from "./user.js";

export interface Article {
  id: number;
  title: string;
  body: string;
  category: string;
  submitted_by: User["id"];
  created_at: Date;
  author_email?: string | null;
}
