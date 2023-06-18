import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleDetailSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';

const initialState: ArticleDetailSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleById.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchArticleById.fulfilled,
            (state, { payload }: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = payload;
            },
        );
        builder.addCase(fetchArticleById.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });
    },
});

export const { actions: articleDetailsActions, reducer: articleDetailsReducer } =
    articleDetailsSlice;
