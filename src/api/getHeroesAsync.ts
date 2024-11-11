import { api } from './axios';
import { actionsHeroes } from '../store/actions/actionsHeroes';
import { AppDispatch } from '../store';

/** 
 * Получит коллекцию героев 
 * @returns Promise<void>
 */
export const getHeroes = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const allHeroes = [];
    const countResponse = await api.get('/people/');
    const totalHeroes = countResponse.data.count;
    if (!totalHeroes) return;

    const totalPages = Math.ceil(totalHeroes / 10);

    for (let page = 1; page <= totalPages; page++) {
      const response = await api.get(`/people?page=${page}`);
      allHeroes.push(...response.data.results);
    }

    dispatch(actionsHeroes.setHeroes(allHeroes));
  } catch (e: any) {
    console.error(e.response?.data?.detail || 'An error occurred');
  }
};

