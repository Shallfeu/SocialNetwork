import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';

import { SideBarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sideBarItemsList: SideBarItemType[] = [
        { path: RoutePath.main, Icon: MainIcon, text: 'main' },
        { path: RoutePath.about, Icon: AboutIcon, text: 'about' },
    ];

    if (userData) {
        sideBarItemsList.push(
            {
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                text: 'profile',
                authOnly: true,
            },
            { path: RoutePath.articles, Icon: ArticlesIcon, text: 'articles', authOnly: true },
        );
    }

    return sideBarItemsList;
});
