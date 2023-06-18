export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export type { Article } from './model/types/article';
export { ArticleDetailSchema } from './model/types/articleDetailsSchema';
export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleSlice';
export { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';
