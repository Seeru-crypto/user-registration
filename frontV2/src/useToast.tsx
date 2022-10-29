import { useEffect, useMemo } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './store';
import { resetToastMessage as resetAppToast, ToastMessage } from './slicers/AppSlice';
import { resetToastMessage as resetUserToast } from './slicers/UserSlice';

const useToast = (): void => {
  const userToast = useAppSelector((state) => state.user.toastMessage);
  const appToast = useAppSelector((state) => state.app.toastMessage);
  const dispatch = useAppDispatch();

  const generalToastOptions: ToastOptions = useMemo(() => {
    return {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      draggable: false,
    };
  }, []);

  type Slicers = 'user' | 'app';

  useEffect(() => {
    function toastCaller(toastMessage: ToastMessage, slicer: Slicers): void {
      switch (toastMessage.variant) {
        case 'success':
          toast.success(toastMessage.header, generalToastOptions);
          break;
        case 'error':
          toast.error(toastMessage.header, generalToastOptions);
          break;
      }

      switch (slicer) {
        case 'user':
          dispatch(resetUserToast());
          break;
        case 'app':
          dispatch(resetAppToast());
          break;
      }
    }

    if (userToast.header !== '') toastCaller(userToast, 'user');
    if (appToast.header !== '') toastCaller(appToast, 'app');

    return () => {
      dispatch(resetAppToast());
      dispatch(resetUserToast());
    };
  }, [userToast, appToast, dispatch, generalToastOptions]);
};

export default useToast;
