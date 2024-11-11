import styles from './table.module.scss';
import { RecordType } from '../../store/models/people-type';
import { Loader } from '../../ui/Loader/Loader';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

interface TableProps {
  heroes: RecordType[];
  loading: boolean;
  onRemove: (name: string) => void;
  onUpdateHeroesOrder: (heroes: RecordType[]) => void;
}

export const Table: React.FC<TableProps> = ({ heroes, loading, onRemove, onUpdateHeroesOrder }) => {
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
      onRemove(heroToDelete);
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

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, heroName: string) => {
    e.dataTransfer.setData("text/plain", heroName);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, dropIndex: number) => {
    e.preventDefault();

    const draggedHeroName = e.dataTransfer.getData("text/plain");
    const draggedHeroIndex = heroes.findIndex(hero => hero.name === draggedHeroName);

    if (draggedHeroIndex === -1) return; // Пропустить, если элемент не найден

    const updatedHeroes = [...heroes];
    const [draggedHero] = updatedHeroes.splice(draggedHeroIndex, 1);
    updatedHeroes.splice(dropIndex, 0, draggedHero);

    onUpdateHeroesOrder(updatedHeroes);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('height')}>
              Height {sortConfig.key === 'height' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('mass')}>
              Mass {sortConfig.key === 'mass' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('eye_color')}>
              Eye color {sortConfig.key === 'eye_color' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('gender')}>
              Gender {sortConfig.key === 'gender' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
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
            sortedHeroes.map((hero, index) => (
              <tr
                key={hero.name}
                draggable
                onDragStart={(e) => handleDragStart(e, hero.name)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
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
          title="Confirm deletion"
          message={`Are you sure you want to delete ${heroToDelete}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};