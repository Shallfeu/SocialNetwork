import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    children: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (
    props: DynamicModuleLoaderProps,
) => {
    const { children, reducers, removeAfterUnmount } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            Object.entries(reducers).forEach(([name, _]: ReducersListEntry) => {
                if (removeAfterUnmount) {
                    store.reducerManager.remove('loginForm');
                    dispatch({ type: `@DESTROY ${name} reducer` });
                }
            });
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
};
