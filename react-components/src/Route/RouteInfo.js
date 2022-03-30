import { lazy } from 'react';

const HomePage = lazy(() => import('../Pages/Home'));
const OTPPage = lazy(() => import('../Pages/OTP'));
const ContactListPage = lazy(() => import('../Pages/ContactList'));
const SignupPage = lazy(() => import('../Pages/Signup'));


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
    },
    {
        id: 4,
        component: SignupPage,
        path: '/signup'
    }
];

