import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageLimit,
    getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const fetchNextPartofArticles = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesPage/fetchNextPartofArticles',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState, dispatch } = thunkAPI;
        const limit = getArticlesPageLimit(getState());
        const hasMore = getArticlesPageHasMore(getState());
        const page = getArticlesPageNum(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticlesList({ page: page + 1 }));
        }

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                },
            });

            if (!response.data) throw new Error();

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
