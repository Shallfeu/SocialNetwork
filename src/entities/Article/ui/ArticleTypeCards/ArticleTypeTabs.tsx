import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';

import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChange: (tab: TabItem) => void;
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, value, onChange } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            { value: ArticleType.ALL, content: t('all-tab') },
            { value: ArticleType.IT, content: t('it-tab') },
            { value: ArticleType.SCIENCE, content: t('science-tab') },
            { value: ArticleType.ECONOMY, content: t('economy-tab') },
        ],
        [t],
    );

    return (
        <Tabs
            className={classNames(cls.ArticleTypeTabs, {}, [className])}
            value={value}
            tabs={typeTabs}
            onTabClick={onChange}
        />
    );
};
