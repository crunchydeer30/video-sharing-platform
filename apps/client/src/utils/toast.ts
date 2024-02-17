import { AxiosError } from 'axios';

export const toastErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data.message ?? 'Something went wrong';
  }
  return 'Something went wrong';
};
