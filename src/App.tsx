import styles from './styles/app.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getHeroes } from './api/getHeroesAsync';
import { RootState, AppDispatch } from './store';
import { Table } from "./components/Table/Table";
import { useState } from 'react';
import { actionRecording } from './store/actions/actionRecording';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const heroes = useSelector((state: RootState) => state.recording.records);
  const [loading, setLoading] = useState(false);

  const setHeroes = async () => {
    setLoading(true);
    await dispatch(getHeroes(1));
    setLoading(false);
  };

  const clearHeroes = () => {
    dispatch(actionRecording.clearRecording());
  }

  return (
    <div className={styles.app}>
      <h1>Star Wars Heroes</h1>
      {
        heroes.length ? (<button 
          type="button" 
          className={styles.button}
          onClick={clearHeroes}
        >
          CLEAR HEROES
        </button>) : (<button 
          type="button" 
          className={styles.button}
          onClick={setHeroes}
        >
          GET HEROES
        </button>)
      }
      <Table 
        heroes={heroes} 
        loading={loading} 
      />
    </div>
  );
}