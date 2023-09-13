import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Wait from "./pages/Wait";
import Complete from "./pages/Complete";
import Total from "./pages/Total";
import Detail from "./pages/Detail";
import Write from "./pages/Write";


const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
         { index: true, element: <Home /> },
         { path: 'total', element: <Total />, children: [
               { path: 'page/:pageId', element: <Total /> }
            ]},
         { path: 'wait', element: <Wait />, children: [
               { path: 'page/:pageId', element: <Wait /> }
            ]},
         { path: 'complete', element: <Complete />, children: [
               { path: 'page/:pageId', element: <Complete /> }
            ]},
         { path: 'detail/:id', element: <Detail /> },
         { path: 'write', element: <Write /> }
      ]
   }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

