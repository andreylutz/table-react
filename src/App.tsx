import styles from './styles/app.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getHeroes } from './api/getHeroesAsync';
import { RootState, AppDispatch } from './store';
import { Table } from './components/Table/Table';
import { useState } from 'react';
import { actionsHeroes } from './store/actions/actionsHeroes';
import { HeroType } from './store/models/hero-type';
import video from './styles/img/dart.mp4';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const heroes = useSelector((state: RootState) => state.heroes);
  const [loading, setLoading] = useState<boolean>(false);

  // Загрузить информацию о героях
  const setInitHeroes = async () => {
    setLoading(true);
    await dispatch(getHeroes());
    setLoading(false);
  };

  // Полностью отчистит таблицу героев
  const clearHeroes = () => {
    dispatch(actionsHeroes.clearHeroes());
  };

  // Удалит информацию о герое
  const removeHero = (name: string): void => {
    dispatch(actionsHeroes.removeHero(name));
  };

  // Обновит список героев
  const updateHeroesOrder = (heroes: HeroType[]) => {
    dispatch(actionsHeroes.updateHeroesOrder(heroes));
  };

  return (
    <div className={styles.app}>
      <h1>Star Wars Heroes</h1>
      {heroes.length ? (
        <button 
          type="button" 
          className={styles.button}
          onClick={clearHeroes}
        >
          CLEAR HEROES
        </button>
      ) : (
        <button 
          type="button" 
          className={styles.button}
          onClick={setInitHeroes}
        >
          GET HEROES
        </button>
      )}
      <Table
        heroes={heroes} 
        loading={loading}
        onRemove={removeHero}
        onUpdateHeroesOrder={updateHeroesOrder}
      />
      <video autoPlay loop muted className={styles.myVideo}>
         <source src={video} type="video/mp4"/>
      </video>
    </div>
  );
}