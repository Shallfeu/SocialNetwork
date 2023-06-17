import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';

export interface SideBarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SideBarItemsList: SideBarItemType[] = [
    { path: RoutePath.main, Icon: MainIcon, text: 'main' },
    { path: RoutePath.about, Icon: AboutIcon, text: 'about' },
    { path: RoutePath.profile, Icon: ProfileIcon, text: 'profile', authOnly: true },
    { path: RoutePath.articles, Icon: ArticlesIcon, text: 'articles', authOnly: true },
];
