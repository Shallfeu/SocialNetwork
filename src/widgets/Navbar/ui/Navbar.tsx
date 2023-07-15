/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { getUserAuthData, userActions } from 'entities/User';
import { Text } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <nav className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title="ULBITVAPP" />

                <AppLink
                    className={cls.createBtn}
                    theme={AppLinkTheme.INVERTED}
                    to={RoutePath.article_create}
                >
                    {t('create-article')}
                </AppLink>

                <Button onClick={onLogOut} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
                    {t('exit')}
                </Button>
            </nav>
        );
    }

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <Button onClick={onShowModal} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
                {t('authorize')}
            </Button>

            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </nav>
    );
});
