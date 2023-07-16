import { Listbox as HListbox } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Listbox.module.scss';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export interface ListboxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

export interface ListboxProps {
    options: ListboxItem[];
    value?: string;
    onChange: <T extends string>(value: T) => void;
    className?: string;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export const Listbox = (props: ListboxProps) => {
    const {
        className,
        direction = 'top',
        readonly,
        defaultValue,
        options,
        value,
        onChange,
        label,
    } = props;

    const optionsClasses = [cls.options, cls[direction]];

    return (
        <HListbox
            disabled={readonly}
            as="div"
            className={classNames(cls.Listbox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <div className={cls.controls}>
                {label && <span className={cls.label}>{label}</span>}

                <HListbox.Button className={cls.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListbox.Button>
            </div>

            <HListbox.Options className={classNames('', {}, optionsClasses)}>
                {options.map((option) => (
                    <HListbox.Option
                        className={classNames(
                            cls.item,
                            {
                                [cls.active]: value === option.value,
                                [cls.disabled]: option.disabled,
                            },
                            [],
                        )}
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.content}
                    </HListbox.Option>
                ))}
            </HListbox.Options>
        </HListbox>
    );
};
