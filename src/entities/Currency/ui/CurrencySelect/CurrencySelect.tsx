import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';
import cls from './CurrencySelect.module.scss';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, onChange, value, readonly } = props;
    const { t } = useTranslation('profile');

    const changeCurrencyHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    return (
        <Select
            className={classNames(cls.CurrenctSelect, {}, [className])}
            options={options}
            label={t('currency')}
            value={value}
            onChange={changeCurrencyHandler}
            readonly={readonly}
        />
    );
});
