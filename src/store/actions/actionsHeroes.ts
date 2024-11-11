import { HeroType } from '../models/hero-type';

// Типы экшенов
export const SET_HEROES = 'SET_HEROES';
export const REMOVE_HERO = 'REMOVE_HERO';
export const CLEAR_HEROES = 'CLEAR_HEROES';
export const UPDATE_HEROES_ORDER = 'UPDATE_HEROES_ORDER ';

// Типизация всех возможных действий для героев
export type HeroesActionsTypes =
  | { type: typeof SET_HEROES; payload: HeroType[] }
  | { type: typeof REMOVE_HERO; payload: string }
  | { type: typeof CLEAR_HEROES; payload: null }
  | { type: typeof UPDATE_HEROES_ORDER; payload: HeroType[] };

// Действия для работы с героями
export const actionsHeroes = {
  // Загрузить героев (добавить к существующим)
  setHeroes: (records: HeroType[]): HeroesActionsTypes => ({
    type: SET_HEROES,
    payload: records,
  }),
  // Удалить героя по имени
  removeHero: (name: string): HeroesActionsTypes => ({
    type: REMOVE_HERO,
    payload: name,
  }),
  // Очистить всех героев
  clearHeroes: (): HeroesActionsTypes => ({
    type: CLEAR_HEROES,
    payload: null,
  }),
  // Обновить порядок героев
  updateHeroesOrder: (newOrder: HeroType[]): HeroesActionsTypes => ({
    type: UPDATE_HEROES_ORDER,
    payload: newOrder,
  })
};