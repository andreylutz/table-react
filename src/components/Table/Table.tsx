import styles from './table.module.scss';
import { RecordType } from '../../store/models/people-type';
import { Loader } from '../../ui/Loader/Loader';

interface TableProps {
  heroes: RecordType[];
  loading: boolean;
}

export const Table: React.FC<TableProps> = ({ heroes, loading }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Рост</th>
            <th>Вес</th>
            <th>Цвет глаз</th>
            <th>Пол</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td 
                colSpan={5} 
                className={styles.centeredCell}
              >
                <Loader />
              </td>
            </tr>
          ) : heroes && heroes.length > 0 ? (
            heroes.map((hero) => (
              <tr key={hero.name}>
                <td>{hero.name}</td>
                <td>{hero.height}</td>
                <td>{hero.mass}</td>
                <td>{hero.eye_color}</td>
                <td>{hero.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={5} 
                className={styles.centeredCell}
              >
                No data, place click GET HEROES
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};