import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article/model/types/article';
import ListIcon from 'shared/assets/icons/list-icon.svg';
import CardIcon from 'shared/assets/icons/card-icon.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
    {
        view: ArticleView.SMALL,
        icon: CardIcon,
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (view: ArticleView) => () => {
        onViewClick?.(view);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    className={cls.btn}
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        className={classNames(
                            cls.ArticleViewSelector,
                            { [cls.selected]: viewType.view === view },
                            [],
                        )}
                        Svg={viewType.icon}
                    />
                </Button>
            ))}
        </div>
    );
};
