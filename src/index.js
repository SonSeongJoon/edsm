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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'total',
        element: (
          <ProtectRoute>
            <Total />
          </ProtectRoute>
        ),
        children: [{ path: 'page/:pageId', element: <Total /> }],
      },
      {
        path: 'wait',
        element: (
          <ProtectRoute>
            <Wait />
          </ProtectRoute>
        ),
        children: [{ path: 'page/:pageId', element: <Wait /> }],
      },
      {
        path: 'complete',
        element: (
          <ProtectRoute>
            <Complete />
          </ProtectRoute>
        ),
        children: [{ path: 'page/:pageId', element: <Complete /> }],
      },
      { path: 'detail/:id', element: <Detail /> },
      {
        path: 'write',
        element: (
          <ProtectRoute>
            <Write />
          </ProtectRoute>
        ),
      },
      {
        path: 'receive',
        element: (
          <ProtectRoute requireAdmin={true}>
            <Receive />
          </ProtectRoute>
        ),
      },
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
