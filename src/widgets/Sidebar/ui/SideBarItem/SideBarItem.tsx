import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './SideBarItem.module.scss';
import { SideBarItemType } from '../../model/item';

interface SideBarItemProps {
    item: SideBarItemType;
    collapsed: boolean;
}

export const SideBarItem = memo((props: SideBarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();

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
