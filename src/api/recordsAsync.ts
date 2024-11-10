import { api } from './axios';
import { actionRecording } from '../store/actions/actionRecording';
import { AppDispatch } from '../store';

export const getRecords = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/people?page=${ page }`);

    dispatch(actionRecording.setRecording(response.data.results));
  } catch (e: any) {
    console.error(e.response?.data?.detail || 'An error occurred');
  }
};

