import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import NewsPage_2 from './pages/NewsPage_2.jsx';
import NewsPage_3 from './pages/NewsPage_3.jsx';
import NewsPage_5 from './pages/NewsPage_5.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>, 

},
{
    path: '/news/1',
    element: <NewsPage/>,
  },
{

    path: '/news/2',
    element: <NewsPage_2/>,
  },
  {
    path: '/news/3',
    element: <NewsPage_3/>,
  },
  {
    path: '/news/5',
    element: <NewsPage_5/>,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
