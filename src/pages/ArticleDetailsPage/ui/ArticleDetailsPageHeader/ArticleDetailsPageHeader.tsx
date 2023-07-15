import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { getArticleDetailsData } from 'entities/Article';

import cls from './ArticleDetailsPageHeader.module.scss';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${article?.id}/edit`);
    }, [navigate, article]);

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
                {t('back-to-list')}
            </Button>

            {canEdit && (
                <Button onClick={onEditArticle} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
                    {t('edit-article')}
                </Button>
            )}
        </div>
    );
};
