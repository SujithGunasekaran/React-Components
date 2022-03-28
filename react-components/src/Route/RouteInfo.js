import React from 'react';

const HomePage = React.lazy(() => import('../Pages/Home'));
const OTPPage = React.lazy(() => import('../Pages/OTP'));
const ContactListPage = React.lazy(() => import('../Pages/ContactList'));


export const RouteInfo = [
    {
        id: 1,
        component: HomePage,
        path: '/'
    },
    {
        id: 2,
        component: OTPPage,
        path: '/otp',
    },
    {
        id: 3,
        component: ContactListPage,
        path: '/contactList'
    }
];

