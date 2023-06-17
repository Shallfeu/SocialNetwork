import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

import cls from './CountrySelect.module.scss';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Armenia, content: Country.Armenia },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, onChange, value, readonly } = props;
    const { t } = useTranslation('profile');

    const changeCountryHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    return (
        <Select
            className={classNames(cls.CurrenctSelect, {}, [className])}
            options={options}
            label={t('country')}
            value={value}
            onChange={changeCountryHandler}
            readonly={readonly}
        />
    );
});
