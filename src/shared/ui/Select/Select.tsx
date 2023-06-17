import { ChangeEvent, memo, useMemo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const { className, label, options, value, readonly, onChange } = props;
    const mods: Mods = {};

    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const optionList = useMemo(() => {
        return options?.map((option) => (
            <option key={option.value} className={cls.option} value={option.value}>
                {option.content}
            </option>
        ));
    }, [options]);

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            <span className={cls.label}>{label}</span>

            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={changeHandler}
            >
                {optionList}
            </select>
        </div>
    );
});
