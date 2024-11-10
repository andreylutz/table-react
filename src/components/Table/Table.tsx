import styles from './table.module.scss';
import { RecordType } from '../../store/models/people-type';
import { Loader } from '../../ui/Loader/Loader';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

interface TableProps {
  heroes: RecordType[];
  loading: boolean;
  onRemove: (name: string) => void;
}

export const Table: React.FC<TableProps> = ({ heroes, loading, onRemove }) => {
  const [showModal, setShowModal] = useState(false);
  const [heroToDelete, setHeroToDelete] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

  const handleDeleteClick = (heroName: string) => {
    setHeroToDelete(heroName);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (heroToDelete) {
      onRemove(heroToDelete)
      setShowModal(false);
      setHeroToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setHeroToDelete(null);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHeroes = [...heroes].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key as keyof RecordType];
    const bValue = b[sortConfig.key as keyof RecordType];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Имя {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('height')}>
              Рост {sortConfig.key === 'height' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('mass')}>
              Вес {sortConfig.key === 'mass' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('eye_color')}>
              Цвет глаз {sortConfig.key === 'eye_color' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('gender')}>
              Пол {sortConfig.key === 'gender' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>
              Действие
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className={styles.centeredCell}>
                <Loader />
              </td>
            </tr>
          ) : sortedHeroes && heroes.length > 0 ? (
            sortedHeroes.map((hero) => (
              <tr key={hero.name}>
                <td>{hero.name}</td>
                <td>{hero.height}</td>
                <td>{hero.mass}</td>
                <td>{hero.eye_color}</td>
                <td>{hero.gender}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(hero.name)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className={styles.centeredCell}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <Modal
          title="Подтверждение удаления"
          message={`Вы уверены, что хотите удалить ${heroToDelete}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};