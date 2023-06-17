import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback(({ element, path, authOnly }: AppRoutesProps) => {
        const elementJSX = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{element}</div>
            </Suspense>
        );

        return (
            <Route
                key={path}
                path={path}
                element={authOnly ? <RequireAuth>{elementJSX}</RequireAuth> : elementJSX}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
