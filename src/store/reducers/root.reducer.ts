import { combineReducers } from 'redux';
import { myRecordsReducer } from './recording.reducer';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  recording: myRecordsReducer,
});
