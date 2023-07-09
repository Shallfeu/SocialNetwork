import { ChangeEvent, useMemo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, readonly, onChange } = props;
    const mods: Mods = {};

    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
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
};
