import { RecordType } from '../models/people-type';

// Типы экшенов
export const SET_RECORDING = 'SET_RECORDING';
export const REMOVE_RECORDING = 'REMOVE_RECORDING';
export const ADD_RECORDING = 'ADD_RECORDING';
export const CLEAR_RECORDING = 'CLEAR_RECORDING';

// Типизация всех возможных действий для записей
export type RecordActionsType =
  | { type: typeof SET_RECORDING; payload: RecordType[] }
  | { type: typeof REMOVE_RECORDING; payload: string }
  | { type: typeof ADD_RECORDING; payload: RecordType }
  | { type: typeof CLEAR_RECORDING; payload: null };

// Действия для работы с записями
export const actionRecording = {
  // Загрузить записи (добавить к существующим)
  setRecording: (records: RecordType[]): RecordActionsType => ({
    type: SET_RECORDING,
    payload: records,
  }),
  // Удалить запись по имени
  removeRecording: (name: string): RecordActionsType => ({
    type: REMOVE_RECORDING,
    payload: name,
  }),
  // Добавить новую запись
  addRecording: (record: RecordType): RecordActionsType => ({
    type: ADD_RECORDING,
    payload: record,
  }),
  // Очистить все записи
  clearRecording: (): RecordActionsType => ({
    type: CLEAR_RECORDING,
    payload: null,
  }),
};