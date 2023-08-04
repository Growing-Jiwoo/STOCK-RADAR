import { Auth } from '../@types/auth';
import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const signin = async (req: Auth) => {
  const { data } = await instance.post(ApiUrl.signin, {
    username: req.username,
    password: req.password,
  });

  return data;
};

export const signup = async (req: Auth) => {
  const { data } = await instance.post(ApiUrl.signup, {
    username: req.username,
    password: req.password,
  });

  return data;
};
