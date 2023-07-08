import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import cls from './ArticleListItem.module.scss';
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const { className, article, view } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const types = <Text text={article.type.join(',')} className={cls.types} />;

    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [navigate, article.id]);

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />

                        <Text text={article.user.username} className={cls.username} />

                        <Text text={article.createdAt} className={cls.createdAt} />
                    </div>

                    <Text text={article.title} className={cls.title} />

                    {types}

                    <img src={article.img} alt={article.title} className={cls.img} />

                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}

                    <div className={cls.footer}>
                        <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
                            {t('read-more')}
                        </Button>

                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div
            onClick={onOpenArticle}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt="article_image" className={cls.image} />

                    <Text text={article.createdAt} className={cls.date} />
                </div>

                <div className={cls.infoWrapper}>
                    {types}

                    {views}
                </div>

                <Text text={article.title} className={cls.title} />
            </Card>
        </div>
    );
};
