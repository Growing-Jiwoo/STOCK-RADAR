import { useMutation } from '@tanstack/react-query';
import { Auth, Token } from '../types/auth';
import { signin, signup } from '../apis/auth';
import storage from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../const/path';

export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (req: Auth) => signin(req),
    onSuccess: (res: Token) => {
      storage.set(ACCESS_TOKEN, res.access_token);
      storage.set(REFRESH_TOKEN, res.refresh_token);
      navigate('/stock');
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (req: Auth) => signup(req),
    onSuccess: () => {
      toast.success('회원가입이 성공적으로 완료됐습니다 !');
      navigate('/signin');
    },
  });
};
