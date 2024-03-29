import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN, PATH_NAME, REFRESH_TOKEN } from '../const/path';
import storage from '../utils/localStorage';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    storage.remove(REFRESH_TOKEN);
    storage.remove(ACCESS_TOKEN);
    storage.remove('username');
    toast.success('로그아웃 완료');
    navigate(PATH_NAME.MAIN);
  };

  return { logout };
};

export default useLogout;
