import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import cls from './SideBarItem.module.scss';
import { SideBarItemType } from '../../model/types/sidebar';

interface SideBarItemProps {
    item: SideBarItemType;
    collapsed: boolean;
}

export const SideBarItem = memo((props: SideBarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) return null;

    return (
        <AppLink
            theme={AppLinkTheme.INVERTED}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
});
