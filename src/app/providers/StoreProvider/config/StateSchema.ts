import {
    AnyAction,
    EnhancedStore,
    ReducersMapObject,
    Reducer,
    CombinedState,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailSchema } from 'entities/Article';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddNewCommentSchema } from 'features/AddNewComment';
import { LoginSchema } from 'features/AuthByUserName';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
    user: UserSchema;

    // async
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetials?: ArticleDetailSchema;
    articleDetailsComments?: ArticleDetailsCommentSchema;
    addNewComment?: AddNewCommentSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
