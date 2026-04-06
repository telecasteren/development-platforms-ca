export type ApiArticle = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  submitted_by: number;
  author_email?: string | null;
};
