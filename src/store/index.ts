import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { myRecordsReducer } from './reducers/recording.reducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, myRecordsReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);