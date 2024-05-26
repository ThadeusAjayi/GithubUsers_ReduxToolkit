import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {githubUserSlice} from '.';

const store = configureStore({
  reducer: {
    githubUser: githubUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
