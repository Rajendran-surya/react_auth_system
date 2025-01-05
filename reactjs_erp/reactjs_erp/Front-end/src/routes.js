import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route} from 'react-router-dom';

// import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

// import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  // <Suspense fallback={<Loader />}>
   <Suspense > 
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    exact: 'true',
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '*',
    layout: AdminLayout,
  
    routes: [
      {
        exact: 'true',
        path: '/app/process/default',
        element: lazy(() => import('./process'))
      },
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./components/admindashboard'))
      },
      {
        exact: 'true',
        path: '/basic/reset_password',
        element: lazy(() => import('./components/process_definition/process_creation'))
      },
      {
        exact: 'true',
        path: '/basic/change_password',
        element: lazy(() => import('./components/process_definition/process_creation/editscreen'))
      },
      {
        exact: 'true',
        path: '/basic/modifyuser',
        element: lazy(() => import('./components/process_definition/process_creation/viewscreen'))
      },
      {
        exact: 'true',
        path: '/basic/add',
        element: lazy(() => import('./components/process_definition/process_creation/addscreen'))
      }
    ,
    {
      exact: 'true',
      path: '/basic/viewmapping',
      element: lazy(() => import('./components/process_definition/viewprocessmapping'))
    }
    ]
  }
];

export default routes;
