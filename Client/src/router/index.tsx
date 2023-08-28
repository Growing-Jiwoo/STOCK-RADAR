import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import StockInfo from '../pages/StockInfo';
import { PATH_NAME } from '../utils/constants';
import Auth from './Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: PATH_NAME.STOCK_INFO,
        element: <StockInfo />,
      },
      {
        path: PATH_NAME.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: PATH_NAME.SIGN_UP,
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
