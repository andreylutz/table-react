import { SET_HEROES, REMOVE_HERO, UPDATE_HEROES_ORDER, CLEAR_HEROES, type HeroesActionsTypes } from "../actions/actionsHeroes";
import { type HeroType } from '../models/hero-type';

/** Начальное состояние записей таблицы */
const initialState = {
  heroes: [] as HeroType[],
};

export const myHeroesReducer = (state = initialState, action: HeroesActionsTypes) => {
  switch (action.type) {
    // Добавить героя к существующему списку
    case SET_HEROES:
      return { ...state, heroes: [...state.heroes, ...(action.payload as HeroType[])] };
    // Удалить запись
    case REMOVE_HERO:
      return { ...state, heroes: state.heroes.filter((record: HeroType) => record.name !== action.payload) };
    // Полная очистка списка записей
    case CLEAR_HEROES:
      return { ...state, heroes: [] };
    // Обновить порядок записей
    case UPDATE_HEROES_ORDER:
      return { ...state, heroes: action.payload };
    default:
      return state;
  }
};