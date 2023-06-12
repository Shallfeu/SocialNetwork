import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';

import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');

    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('profile')} />
                <Button className={cls.editBtn}>{t('edit')}</Button>
            </div>

            <div className={cls.data}>
                <Input className={cls.input} value={data?.first} placeholder={t('name')} />
                <Input className={cls.input} value={data?.lastname} placeholder={t('surname')} />
            </div>
        </div>
    );
};
