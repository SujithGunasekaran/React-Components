import React, { Fragment, Suspense, lazy } from 'react';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));
const Contact = lazy(() => import('../../Components/ContactComponents/Contact'));


const ContactListPage = () => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName={'Contact List CRUD Example'}
                    githubUrl={'ContactList'}
                />
                <Contact />
            </Suspense>
        </Fragment>
    )

}

export default ContactListPage;
