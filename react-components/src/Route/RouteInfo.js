import { lazy } from 'react';

const HomePage = lazy(() => import('../Pages/Home'));
const OTPPage = lazy(() => import('../Pages/OTP'));
const ContactListPage = lazy(() => import('../Pages/ContactList'));
const SignupPage = lazy(() => import('../Pages/Signup'));
const DataTable = lazy(() => import('../Pages/DataTable'));
const InfiniteScroll = lazy(() => import('../Pages/InfiniteScroll'));
const Search = lazy(() => import('../Pages/Search'));
const Accordian = lazy(() => import('../Pages/Accordian'));

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
    },
    {
        id: 5,
        component: DataTable,
        path: '/dataTable'
    },
    {
        id: 6,
        component: InfiniteScroll,
        path: '/infiniteScroll'
    },
    {
        id: 7,
        component: Search,
        path: '/search'
    },
    {
        id: 8,
        component: Accordian,
        path: '/accordian'
    }
];

