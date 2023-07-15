import { createAsyncThunk } from '@reduxjs/toolkit';

import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const orderFormUrl = searchParams.get('order');
            const sortFormUrl = searchParams.get('sort');
            const searchFormUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type');

            if (orderFormUrl) {
                dispatch(articlesPageActions.setOrder(orderFormUrl as SortOrder));
            }

            if (sortFormUrl) {
                dispatch(articlesPageActions.setSort(sortFormUrl as ArticleSortField));
            }

            if (searchFormUrl) {
                dispatch(articlesPageActions.setSearch(searchFormUrl as string));
            }

            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl as ArticleType));
            }

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList());
        }
    },
);
