import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserAuthData } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Article';

import { fetchArticleCommentsById } from '../fetchCommentByArticleId/fetchCommentByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!text || !userData || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                aticleId: article.id,
                userId: userData.id,
                text,
            });

            if (!response.data) throw new Error();

            dispatch(fetchArticleCommentsById(article.id));

            return response.data;
        } catch (error) {
            return rejectWithValue(i18n.t('error'));
        }
    },
);
