import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { Article, ArticleList, ArticleView } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const article = {
    id: '1',
    title: 'Javascript news',
    user: {
        id: '1',
        username: 'Ulbi',
    },
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: ['IT', 'SCIENCE', 'POLITICS', 'ECONOMICS'],
    blocks: [
        {
            id: '1',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [],
        },
        {
            id: '4',
            type: 'CODE',
            code: '',
        },
        {
            id: '5',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [],
        },
        {
            id: '2',
            type: 'IMAGE',
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '3',
            type: 'CODE',
            code: '',
        },
        {
            id: '7',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [],
        },
        {
            id: '8',
            type: 'IMAGE',
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '9',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [],
        },
    ],
} as Article;

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList
                view={ArticleView.BIG}
                articles={new Array(16)
                    .fill(0)
                    .map((item, index) => ({ ...article, id: String(index) }))}
                isLoading
            />
        </div>
    );
};

export default memo(ArticlesPage);
