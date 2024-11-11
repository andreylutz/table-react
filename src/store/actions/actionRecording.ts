import { RecordType } from '../models/people-type';

// Типы экшенов
export const SET_RECORDING = 'SET_RECORDING';
export const REMOVE_RECORDING = 'REMOVE_RECORDING';
export const CLEAR_RECORDING = 'CLEAR_RECORDING';
export const UPDATE_RECORDING_ORDER = 'UPDATE_RECORDING_ORDER';

// Типизация всех возможных действий для записи
export type RecordActionsType =
  | { type: typeof SET_RECORDING; payload: RecordType[] }
  | { type: typeof REMOVE_RECORDING; payload: string }
  | { type: typeof CLEAR_RECORDING; payload: null }
  | { type: typeof UPDATE_RECORDING_ORDER; payload: RecordType[] };

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
  // Очистить все записи
  clearRecording: (): RecordActionsType => ({
    type: CLEAR_RECORDING,
    payload: null,
  }),
  // Обновить порядок записей
  updateRecordingOrder: (newOrder: RecordType[]): RecordActionsType => ({
    type: UPDATE_RECORDING_ORDER,
    payload: newOrder,
  })
};