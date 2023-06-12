import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';

import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
