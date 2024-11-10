import React from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <button onClick={onCancel} className={styles.cancelButton}>Отмена</button>
          <button onClick={onConfirm} className={styles.confirmButton}>Удалить</button>
        </div>
      </div>
    </div>
  );
};