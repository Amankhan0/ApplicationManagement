import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import apireducer from './features/ApplicationApiSlice';
import applicationSlice from './features/ApplicationSlice';

export const store = configureStore({
    reducer: {
        ApplicationSlice: applicationSlice,
        ApplicationApiSlice:apireducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
