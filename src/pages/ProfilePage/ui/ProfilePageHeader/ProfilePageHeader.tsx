import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('profile')} />

            {readonly ? (
                <Button onClick={editHandler} className={cls.editBtn}>
                    {t('edit')}
                </Button>
            ) : (
                <div className={cls.buttons}>
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={saveHandler}
                        className={cls.saveBtn}
                    >
                        {t('save')}
                    </Button>
                    <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={cancelEditHandler}
                        className={cls.cancelBtn}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            )}
        </div>
    );
};
