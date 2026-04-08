export type ApiArticle = {
  id: number;
  title: string;
  body: string;
  category: string;
  created_at: string;
  submitted_by: number;
  author_email?: string | null;
};

export type PartialApiArticleData = {
  title: string;
  body: string;
  category: string;
};
