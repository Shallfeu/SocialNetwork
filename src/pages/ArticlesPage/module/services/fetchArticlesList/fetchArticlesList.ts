import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArticleType } from 'entities/Article/model/types/article';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps | void,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const limit = getArticlesPageLimit(getState());

    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const page = getArticlesPageNum(getState());
    const type = getArticlesPageType(getState());

    try {
        addQueryParams({ sort, order, search, type });

        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _order: order,
                _sort: sort,
                q: search,
                type: type === ArticleType.ALL ? undefined : type,
            },
        });

        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
