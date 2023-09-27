import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Wait from './pages/Wait';
import Complete from './pages/Complete';
import Total from './pages/Total';
import Detail from './pages/Detail';
import Write from './pages/Write';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Receive from './pages/Receive';
import ProtectRoute from './components/ProtectRoute';
import MstPage from './pages/MstPage';
import Reject from './pages/Reject';

const routes = [
  { path: 'total', component: Total },
  { path: 'wait', component: Wait },
  { path: 'reject', component: Reject },
  { path: 'complete', component: Complete },
  { path: 'write', component: Write },
  { path: 'receive', component: Receive, requireAdmin: true },
  { path: 'mst', component: MstPage, requireAdmin: true },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      ...routes.map((route) => ({
        path: route.path,
        element: (
          <ProtectRoute requireAdmin={route.requireAdmin}>
            {React.createElement(route.component)}
          </ProtectRoute>
        ),
        children: [{ path: 'page/:pageId', element: <MstPage /> }],
      })),
      { path: ':path/detail/:id', element: <Detail /> },
    ],
  },
  {
    path: '/sign',
    element: <SignUp />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
