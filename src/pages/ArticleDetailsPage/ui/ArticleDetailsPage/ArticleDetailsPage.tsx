/* eslint max-len:0 */
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ArticleDetails } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    articleDetailsCommentReducer,
    getArticleComments,
} from '../../model/slice/articleDetailsCommentSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchArticleCommentsById } from '../../model/services/fetchCommentByArticleId/fetchCommentByArticleId';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const commentIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => dispatch(fetchArticleCommentsById(id)));

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('article-not-found')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('comments')} />
                <CommentList isLoading={commentIsLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
