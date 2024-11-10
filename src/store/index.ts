import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root.reducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});

export default store;