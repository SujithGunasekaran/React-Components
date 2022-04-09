import React, { Fragment, Suspense, lazy } from 'react';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const Rating = () => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='Star Rating'
                    githubUrl='Rating'
                />
            </Suspense>
        </Fragment>
    )

}


export default Rating;
