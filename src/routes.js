import React from 'react';

const HomePage = React.lazy(() => import('./views/home'));
const CountryView = React.lazy(() => import('./views/country'));

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    name: 'home',
  },
  {
    path: '/country/:countryCode',
    component: CountryView,
    name: 'country',
  },
];

export default routes;
