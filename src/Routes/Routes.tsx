import React, { Key } from 'react';
import { Location } from 'history';
import { Routes, Outlet, Route as ReactRoute } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';

import Home from './Home';
import Auth, { Login, SignUp } from './Auth';

import TeachHub from '../TeachHub';
import Lecture from './Lecture';
import Subscribe from './Subscribe';
import Profile from './Profile';
import Interests from './Interests';
import AppProviders from '../providers';
import LecturerAbout from './LecturerAbout';

export interface BasicRoute {
    Component: () => JSX.Element;
    name: string;
    path: string;
    Icon?: React.ReactNode;
    subRoutes?: Route[];
    isIndex?: false;
    showInDrawer?: boolean;
}

interface IndexRoute {
    Component: () => JSX.Element;
    isIndex: true;
}

type Route = BasicRoute | IndexRoute;

export const routes: Route[] = [
    { name: 'Home', path: '/', Component: Home, Icon: <HomeIcon />, subRoutes: [] },
    {
        name: 'Auth',
        path: 'auth',
        Component: Auth,
        Icon: <SecurityIcon />,
        showInDrawer: false,
        subRoutes: [
            { isIndex: true, Component: Login },
            { name: 'Sign Up', path: 'signup', Component: SignUp, Icon: <PersonIcon /> }
        ]
    },
    { name: 'Interests', path: 'auth/interests', Component: Interests, showInDrawer: false },
    { name: 'Lecture', path: 'lectures/:id', Component: Lecture, showInDrawer: false },
    {
        name: 'SubscribeLecture',
        path: 'lectures/:id/subscribe',
        Component: Subscribe,
        showInDrawer: false,
    },
    {name: 'Lecture', path: 'lectures/:id', Component: Lecture, showInDrawer: false},
    {name: 'Profile', path: 'profile', Component: Profile, showInDrawer: false},
    {name: 'LecturerAbout', path: 'lecturer/:id', Component: LecturerAbout, showInDrawer: false}
];

export const isBasicRoute = (route: Route): route is BasicRoute => !route.isIndex;

export const getRoute = (location: Location) =>
    routes
        .filter(isBasicRoute)
        .find(
            x =>
                x.path === location.pathname.substring(1) ||
                x.subRoutes
                    ?.filter(isBasicRoute)
                    .some(y => `${x.path}/${y.path}` === location.pathname.substring(1))
        );

const getBasicRouteProps = ({ Component, path }: BasicRoute, routeKey: Key) => ({
    key: routeKey,
    path,
    element: <Component />,
});
const renderIndexRoute = ({ Component }: IndexRoute, routeKey: Key) => (
    <ReactRoute index key={routeKey} element={<Component />} />
);

const renderSubRoute = (subRoute: Route, subRouteKey: Key) =>
    isBasicRoute(subRoute) ? (
        <ReactRoute {...getBasicRouteProps(subRoute, subRouteKey)} />
    ) : (
        renderIndexRoute(subRoute, subRouteKey)
    );

const renderRoute = (route: Route, routeKey: Key) =>
    isBasicRoute(route) ? (
        <ReactRoute {...getBasicRouteProps(route, routeKey)}>
            {route.subRoutes?.map(renderSubRoute)}
        </ReactRoute>
    ) : (
        renderIndexRoute(route, routeKey)
    );

export const renderAllRoutes = () => (
    <AppProviders>
        <Routes>
            {/* <AppProviders> */}
            <ReactRoute path='/' element={<TeachHub />}>
                {routes.map(renderRoute)}
                <ReactRoute path='*' element={<Home />} />
            </ReactRoute>
            {/* </AppProviders> */}
        </Routes>
    </AppProviders>
);
