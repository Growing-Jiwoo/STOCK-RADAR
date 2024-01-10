import { Navigate, Outlet, useLocation } from 'react-router';
import token from '../utils/token';
import { ACCESS_TOKEN, PATH_NAME } from '../const/path';
import NotFound from '../pages/NotFound';
import NavBar from '../components/Commons/Navbar';
import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../types/stock';

const Auth = () => {
  const { stockName, stockDetailId } = useParams<StockDetailParams>();
  const PRIVATE_ROUTES = [
    PATH_NAME.STOCK_INFO,
    `${PATH_NAME.STOCK_INFO}/${stockName}/${stockDetailId}`,
    PATH_NAME.MY_INFO,
  ];
  const PUBLIC_ROUTES = [PATH_NAME.MAIN, PATH_NAME.SIGN_IN, PATH_NAME.SIGN_UP];
  const { pathname } = useLocation();
  const accessToken = token.get(ACCESS_TOKEN);
  const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPrivateRoute) {
    if (!accessToken) {
      return <Navigate to={PATH_NAME.MAIN} />;
    }
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  }

  if (isPublicRoute) {
    if (accessToken) {
      return <Navigate to={PATH_NAME.STOCK_INFO} />;
    }
    return <Outlet />;
  }

  return <NotFound />;
};

export default Auth;
