import { configureStore } from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import appReducer from './slicers/AppSlice';
import userReducer from './slicers/UserSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type IRootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
