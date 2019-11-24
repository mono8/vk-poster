import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import groupsReducer from './groups/groupsSlice';

export const store = configureStore({
    reducer: { user: userReducer, groups: groupsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
