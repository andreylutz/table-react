import { RecordType } from '../models/people-type'

export const SET_RECORDING = 'SET_RECORDING';
export const REMOVE_RECORDING = 'REMOVE_RECORDING';
export const ADD_RECORDING = 'ADD_RECORDING';

export type RecordActionsType = {
  type: string
  payload: RecordType[] | RecordType | string
}

/** Действия для записей в таблице */
export const actionRecording = {
  /** Загрузить записи */
  setRecording: (record: RecordType[]) => ({
    type: SET_RECORDING,
    payload: record,
  }),
  /** Удалить запись */
  removeRecording: (name: string) => ({
    type: REMOVE_RECORDING,
    payload: name,
  }),
  /** Добавить новую запись */
  addRecording: (record: RecordType) => ({
    type: ADD_RECORDING,
    payload: record,
  }),
};