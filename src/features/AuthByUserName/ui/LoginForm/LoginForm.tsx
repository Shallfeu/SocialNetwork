import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

import { Button } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input autoFocus type="text" placeholder={t('login')} className={cls.input} />
            <Input type="text" placeholder={t('password')} className={cls.input} />
            <Button className={cls.loginBtn}>{t('enter')}</Button>
        </div>
    );
};
