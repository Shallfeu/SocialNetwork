import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import cls from './AddNewCommentForm.module.scss';
import {
    getNewCommentError,
    getNewCommentText,
} from '../../model/selectors/addNewCommentSelectors';

export interface AddNewCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addNewComment: addNewCommentReducer,
};

const AddNewCommentForm = (props: AddNewCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('article-details');
    const text = useSelector(getNewCommentText);
    const error = useSelector(getNewCommentError);
    const dispatch = useAppDispatch();

    const changeCommentHandler = useCallback(
        (value: string) => {
            dispatch(addNewCommentActions.setText(value));
        },
        [dispatch],
    );

    const createCommentHandler = () => {
        changeCommentHandler('');
        onSendComment(text);
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.AddNewCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    value={text}
                    onChange={changeCommentHandler}
                    placeholder={t('comment')}
                />

                <Button onClick={createCommentHandler} theme={ButtonTheme.OUTLINE}>
                    {t('send')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default AddNewCommentForm;
