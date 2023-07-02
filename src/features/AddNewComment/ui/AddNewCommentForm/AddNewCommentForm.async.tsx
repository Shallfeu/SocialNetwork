import { lazy, FC } from 'react';
import { AddNewCommentFormProps } from './AddNewCommentForm';

export const AddNewCommentFormAsync = lazy<FC<AddNewCommentFormProps>>(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
            setTimeout(() => resolve(import('./AddNewCommentForm')), 1500);
        }),
);
