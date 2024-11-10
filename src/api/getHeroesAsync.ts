import { api } from './axios';
import { actionRecording } from '../store/actions/actionRecording';
import { AppDispatch } from '../store';

/** 
 * Получит коллекцию героев 
 * @param page - номер списка получаемых данных на одной странице 10 экземпляров<div className=""></div>
 * @returns Promise<void>
 */
export const getHeroes = (page = 1) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await api.get(`/people?page=${ page }`);

    dispatch(actionRecording.setRecording(response.data.results));
  } catch (e: any) {
    console.error(e.response?.data?.detail || 'An error occurred');
  }
};
