import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    ProfileCard,
    fetchProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    profileReducer,
    getProfileForm,
} from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

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

    const readonly = useSelector(getProfileReadonly);

    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

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
