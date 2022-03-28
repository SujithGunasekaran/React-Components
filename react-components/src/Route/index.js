import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouteInfo } from './RouteInfo';

const Header = lazy(() => import('../Components/Header'));


const RouteComponent = () => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
            </Suspense>
            <div className='body'>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {
                                RouteInfo.map((routeData) => (
                                    <Route
                                        key={routeData.id}
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <routeData.component />
                                            </Suspense>
                                        }
                                        path={routeData.path}
                                    />
                                ))
                            }
                        </Routes>
                    </Suspense>
                </Router>
            </div>
        </Fragment>
    )

}

export default RouteComponent;
