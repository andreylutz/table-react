import { SET_RECORDING, REMOVE_RECORDING, ADD_RECORDING, type RecordActionsType } from "../actions/actionRecording";
import { type RecordType } from '../models/people-type' 

/** Начальное состояние записей таблицы */
const initialState = {
  records: [] as RecordType[],
};

export const myRecordsReducer = (state = initialState, action: RecordActionsType) => {
  switch (action.type) {
    // Загрузить записи
    case SET_RECORDING:
      return { ...state.records, records: [...action.payload as RecordType[]] };
    // Удалить запись
    case REMOVE_RECORDING:
      return { ...state, records: state.records.filter((record: RecordType) => record.name !== action.payload) }
    // Добавить новую запись
    case ADD_RECORDING:
      return { ...state, records: [...state.records, action.payload] }
    default:
      return state;
  }
};