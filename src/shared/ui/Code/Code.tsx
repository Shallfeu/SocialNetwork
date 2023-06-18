import { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = (props: CodeProps) => {
    const { className, text } = props;

    const copyHandler = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button onClick={copyHandler} theme={ButtonTheme.CLEAR} className={cls.copyBtn}>
                <CopyIcon className={cls.copyIcon} />
            </Button>

            <code>{text}</code>
        </pre>
    );
};
