import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = memo((props: MainPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return <div className={classNames(cls.MainPage, {}, [className])}>123</div>;
});

export default MainPage;
