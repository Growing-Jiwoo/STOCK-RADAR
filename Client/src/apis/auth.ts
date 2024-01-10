import { Auth } from '../types/auth';
import { API_URL } from '../const/apiUrl';
import { instance } from './axios';

export const signin = async (req: Auth) => {
  const { data } = await instance.post(API_URL.signin, {
    username: req.username,
    password: req.password,
  });

  return data;
};

export const signup = async (req: Auth) => {
  const { data } = await instance.post(API_URL.signup, {
    username: req.username,
    password: req.password,
  });

  return data;
};
