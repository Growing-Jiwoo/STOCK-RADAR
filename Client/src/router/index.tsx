import { createBrowserRouter } from 'react-router-dom';
import StockDetailInfo from '../pages/StockDetailInfo';
import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import StockInfo from '../pages/StockInfo';
import { PATH_NAME } from '../const/path';
import Auth from './Auth';
import MyInfo from '../pages/Myinfo';

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
        path: PATH_NAME.MY_INFO,
        element: <MyInfo />,
      },
      {
        path: PATH_NAME.STOCK_INFO,
        element: <StockInfo />,
      },
      {
        path: `${PATH_NAME.STOCK_INFO}/:stockName/:stockDetailId`,
        element: <StockDetailInfo />,
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
