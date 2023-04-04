import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import educationSlice from './features/education/educationSlice';
import usersSlice from './features/user/usersSlice';

const store = configureStore({
  reducer: {
    education: educationSlice,
    users: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
