import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from 'widgets/Page/Page';
import { fetchProfileData, profileReducer } from 'entities/Profile';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';

import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');

    const { id } = useParams<{ id: string }>();

    const validateErrorTranslate = {
        [ValidateProfileError.SERVER_ERROR]: t('server_error'),
        [ValidateProfileError.NO_DATA]: t('no_data'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('incor_data'),
        [ValidateProfileError.INCORRECT_AGE]: t('incor_age'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('incor_country'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page className={classNames(cls.ProfilePage, {}, [className])}>
                <VStack gap="16">
                    <ProfilePageHeader />

                    <EditableProfileCard />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
