import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
    getProfileForm,
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from 'entities/Profile';
import { getUserAuthData } from 'entities/User';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/ui/Stack/HStack/HStack';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileForm);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);

    const editHandler = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const cancelEditHandler = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const saveHandler = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack max gap="8" justify="between" className={classNames('', {}, [className])}>
            <Text title={t('profile')} />

            {canEdit && (
                <>
                    {readonly ? (
                        <Button onClick={editHandler}>{t('edit')}</Button>
                    ) : (
                        <HStack max gap="8">
                            <Button theme={ButtonTheme.OUTLINE} onClick={saveHandler}>
                                {t('save')}
                            </Button>
                            <Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelEditHandler}>
                                {t('cancel')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
};
