import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
    ProfileCard,
    fetchProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    profileReducer,
    getProfileForm,
    getProfileValidateErrors,
} from 'entities/Profile';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

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

    const readonly = useSelector(getProfileReadonly);

    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const validateErrors = useSelector(getProfileValidateErrors);
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

    const changeFirstNameHandler = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ first: value }));
        },
        [dispatch],
    );

    const changeLastNameHandler = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ lastname: value }));
        },
        [dispatch],
    );

    const changeAgeHandler = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
        },
        [dispatch],
    );

    const changeCityHandler = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ city: value }));
        },
        [dispatch],
    );

    const changeAvatarHandler = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ avatar: value }));
        },
        [dispatch],
    );

    const changeUsernameHandler = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ username: value }));
        },
        [dispatch],
    );

    const changeCurrencyHandler = useCallback(
        (value: Currency) => {
            dispatch(profileActions.updateProfile({ currency: value }));
        },
        [dispatch],
    );

    const changeCountryHandler = useCallback(
        (value: Country) => {
            dispatch(profileActions.updateProfile({ country: value }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfilePageHeader />

                {validateErrors?.length &&
                    validateErrors.map((error) => (
                        <Text
                            key={error}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslate[error]}
                        />
                    ))}

                <ProfileCard
                    onChangeFirstName={changeFirstNameHandler}
                    onChangeLastName={changeLastNameHandler}
                    onChangeAge={changeAgeHandler}
                    onChangeCity={changeCityHandler}
                    onChangeAvatar={changeAvatarHandler}
                    onChangeUsername={changeUsernameHandler}
                    onChangeCurrency={changeCurrencyHandler}
                    onChangeCountry={changeCountryHandler}
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                />
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
