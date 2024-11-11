import styles from './table.module.scss';
import { HeroType } from '../../store/models/hero-type';
import { Loader } from '../../ui/Loader/Loader';
import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';

interface TableProps {
  /** Список героев */
  heroes: HeroType[];
  /** Флаг загрузки героев */
  loading: boolean;
  /**  Удалит героя по имени */
  onRemove: (name: string) => void;
  /**  Обновит сортировку героев */
  onUpdateHeroesOrder: (heroes: HeroType[]) => void;
}

export const Table: React.FC<TableProps> = ({ heroes, loading, onRemove, onUpdateHeroesOrder }) => {
  // Локальное состояние списка героев
  const [localHeroes, setLocalHeroes] = useState<HeroType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  // Герой для удаления
  const [heroToDelete, setHeroToDelete] = useState<string | null>(null);
  // Настройка сортировки
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

  useEffect(() => {
    setLocalHeroes(heroes);
  }, [heroes]);

  // Откроет модальное окно для удаления героя
  const handleDeleteClick = (heroName: string) => {
    setHeroToDelete(heroName);
    setShowModal(true);
  };

  // Удалит героя
  const handleConfirmDelete = () => {
    if (heroToDelete) {
      onRemove(heroToDelete);
      setShowModal(false);
      setHeroToDelete(null);
    }
  };

  // Закроет модальное окно удаления героя
  const handleCancelDelete = () => {
    setShowModal(false);
    setHeroToDelete(null);
  };

  // Отсортирует таблицу
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...localHeroes].sort((a, b) => {
      const aValue = a[key as keyof HeroType];
      const bValue = b[key as keyof HeroType];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
    setLocalHeroes(sortedData);
  };

  // Обработчик начала перемещения элемента таблицы
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, heroName: string) => {
    e.dataTransfer.setData("text/plain", heroName);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Обработчик окончания перемещения элемента таблицы
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Drop событие
  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, dropIndex: number) => {
    e.preventDefault();

    const draggedHeroName = e.dataTransfer.getData("text/plain");
    const draggedHeroIndex = localHeroes.findIndex(hero => hero.name === draggedHeroName);

    if (draggedHeroIndex === -1) return;

    const updatedHeroes = [...localHeroes];
    const [draggedHero] = updatedHeroes.splice(draggedHeroIndex, 1);
    updatedHeroes.splice(dropIndex, 0, draggedHero);

    setLocalHeroes(updatedHeroes);
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
                <div className={styles.wrapper}>
                  <Loader />
                </div>
              </td>
            </tr>
          ) : localHeroes.length > 0 ? (
            localHeroes.map((hero, index) => (
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
                <div className={styles.wrapper}>
                  No data
                </div>
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