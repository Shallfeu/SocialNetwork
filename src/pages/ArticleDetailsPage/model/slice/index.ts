import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentReducer } from './articleDetailsCommentSlice';
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers({
    comments: articleDetailsCommentReducer,
    recommendations: articleDetailsRecommendationsReducer,
});
