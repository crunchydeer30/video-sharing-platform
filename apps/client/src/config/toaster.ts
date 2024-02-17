import { ToastPosition } from 'react-hot-toast';

export const toasterConfig = {
  position: 'top-center' as ToastPosition,
  reverseOrder: false,
  toastOptions: {
    className:
      'text-var-text-primary dark:text-var-text-primary-dark bg-var-bg-primary dark:bg-var-bg-tertiary-dark shadow-lg'
  }
};
