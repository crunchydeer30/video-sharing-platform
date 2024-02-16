import axios from 'axios';
import { LoginBody } from '@shared/schemas';
import { NonSensitiveAccount } from '@shared/schemas';

const login = async (body: LoginBody) => {
  const response = await axios.post('api/auth/login', body);
  return response.data;
};

const getAccounts = async () => {
  const response = await axios.get('api/accounts');
  return response.data;
};

const me = async (): Promise<NonSensitiveAccount> => {
  const response = await axios.get('api/auth/me');
  return response.data;
};

export default { login, getAccounts, me };
