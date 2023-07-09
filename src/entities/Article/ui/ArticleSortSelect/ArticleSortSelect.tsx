import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { Article, ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

import cls from './ArticleSortSelect.module.scss';

interface ArticleSortSelectProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
}

export const ArticleSortSelect = (props: ArticleSortSelectProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            { value: 'asc', content: t('asc') },
            { value: 'desc', content: t('desc') },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            { value: ArticleSortField.CREATED, content: t('sort-by-date') },
            { value: ArticleSortField.TITLE, content: t('sort-by-title') },
            { value: ArticleSortField.VIEWS, content: t('sort-by-views') },
        ],
        [t],
    );

    return (
        <div className={classNames(cls.ArticleSortSelect, {}, [className])}>
            <Select<ArticleSortField>
                onChange={onChangeSort}
                value={sort}
                options={sortFieldOptions}
                label={t('sort-by')}
            />

            <Select<SortOrder>
                onChange={onChangeOrder}
                options={orderOptions}
                value={order}
                label={t('sort-asc-desc')}
            />
        </div>
    );
};
