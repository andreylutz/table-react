import { SET_RECORDING, REMOVE_RECORDING, UPDATE_RECORDING_ORDER, CLEAR_RECORDING, type RecordActionsType } from "../actions/actionRecording";
import { type RecordType } from '../models/people-type';

/** Начальное состояние записей таблицы */
const initialState = {
  records: [] as RecordType[],
};

export const myRecordsReducer = (state = initialState, action: RecordActionsType) => {
  switch (action.type) {
    // Добавить записи к существующему списку
    case SET_RECORDING:
      return { ...state, records: [...state.records, ...(action.payload as RecordType[])] };
    // Удалить запись
    case REMOVE_RECORDING:
      return { ...state, records: state.records.filter((record: RecordType) => record.name !== action.payload) };
    // Полная очистка списка записей
    case CLEAR_RECORDING:
      return { ...state, records: [] };
    // Обновить порядок записей
    case UPDATE_RECORDING_ORDER:
      return { ...state, records: action.payload };
    default:
      return state;
  }
};