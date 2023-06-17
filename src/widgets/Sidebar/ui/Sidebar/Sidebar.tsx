import { memo, useMemo, useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { SideBarItemsList } from 'widgets/Sidebar/model/item';

import cls from './Sidebar.module.scss';
import { SideBarItem } from '../SideBarItem/SideBarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            SideBarItemsList.map((item) => (
                <SideBarItem key={item.path} item={item} collapsed={collapsed} />
            )),
        [collapsed],
    );

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
            >
                {collapsed ? '>' : '<'}
            </Button>

            <div className={cls.items}>{itemsList}</div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    );
});
