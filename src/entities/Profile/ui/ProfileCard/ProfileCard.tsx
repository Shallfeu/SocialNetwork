import { useTranslation } from 'react-i18next';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';

import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    readonly?: boolean;
    isLoading?: boolean;
    error?: string;
    onChangeFirstName?: (value: string) => void;
    onChangeLastName?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        readonly,
        data,
        isLoading,
        error,
        onChangeFirstName,
        onChangeAge,
        onChangeCity,
        onChangeLastName,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    align={TextAlign.CENTER}
                    title={t('error')}
                    text={t('try_to_reload')}
                    theme={TextTheme.ERROR}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <div className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} alt="avatar" />
                </div>
            )}

            <Input
                onChange={onChangeFirstName}
                className={cls.input}
                value={data?.first}
                placeholder={t('name')}
                readonly={readonly}
            />
            <Input
                onChange={onChangeLastName}
                className={cls.input}
                value={data?.lastname}
                placeholder={t('surname')}
                readonly={readonly}
            />
            <Input
                onChange={onChangeAge}
                className={cls.input}
                value={data?.age}
                onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                placeholder={t('age')}
                readonly={readonly}
            />
            <Input
                onChange={onChangeCity}
                className={cls.input}
                value={data?.city}
                placeholder={t('city')}
                readonly={readonly}
            />
            <Input
                onChange={onChangeUsername}
                className={cls.input}
                value={data?.city}
                placeholder={t('username')}
                readonly={readonly}
            />
            <Input
                onChange={onChangeAvatar}
                className={cls.input}
                value={data?.avatar}
                placeholder={t('avatar')}
                readonly={readonly}
            />

            <CurrencySelect
                className={cls.input}
                readonly={readonly}
                value={data?.currency}
                onChange={onChangeCurrency}
            />

            <CountrySelect
                className={cls.input}
                readonly={readonly}
                value={data?.country}
                onChange={onChangeCountry}
            />
        </div>
    );
};
