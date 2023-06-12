import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    type?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        type = 'text',
        placeholder,
        autoFocus,
        value,
        onChange,
        ...otherProps
    } = props;
    const inpRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (autoFocus) inpRef.current?.focus();
    }, [autoFocus]);

    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && <div className={cls.placeholder}>{`${placeholder}:`}</div>}
            <input
                className={cls.input}
                type={type}
                value={value}
                onChange={ChangeHandler}
                ref={inpRef}
                {...otherProps}
            />
        </div>
    );
});
