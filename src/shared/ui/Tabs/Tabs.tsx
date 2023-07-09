import { ReactNode, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

export const Tabs = (props: TabsProps) => {
    const { className, tabs, value, onTabClick } = props;

    const clickHandler = useCallback((tab: TabItem) => () => onTabClick(tab), [onTabClick]);

    const renderTab = (tab: TabItem) => (
        <Card
            key={tab.value}
            theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
            className={cls.tab}
            onClick={clickHandler(tab)}
        >
            {tab.content}
        </Card>
    );

    return <div className={classNames(cls.Tabs, {}, [className])}>{tabs.map(renderTab)}</div>;
};
