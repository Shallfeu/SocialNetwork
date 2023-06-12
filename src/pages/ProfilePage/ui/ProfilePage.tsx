import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return <div className={classNames(cls.ProfilePage, {}, [className])}>123</div>;
});

export default ProfilePage;
