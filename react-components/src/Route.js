import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Header = lazy(() => import('./Components/Header'));


const RouteComponent = () => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
            </Suspense>
            <div className='body'>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>

                    </Suspense>
                </Router>
            </div>
        </Fragment>
    )

}

export default RouteComponent;
