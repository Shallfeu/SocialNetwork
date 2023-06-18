import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsData = (state: StateSchema) => state.articleDetials?.data;
export const getArticleDetailsError = (state: StateSchema) => state.articleDetials?.error;
export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetials?.isLoading;
