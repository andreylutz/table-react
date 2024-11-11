import styles from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.lsParticles} ${styles.lsPart1}`}></div>
      <div className={`${styles.lsParticles} ${styles.lsPart2}`}></div>
      <div className={`${styles.lsParticles} ${styles.lsPart3}`}></div>
      <div className={`${styles.lsParticles} ${styles.lsPart4}`}></div>
      <div className={`${styles.lsParticles} ${styles.lsPart5}`}></div>
      <div className={`${styles.lightsaber} ${styles.lsLeft} ${styles.lsGreen}`}></div>
      <div className={`${styles.lightsaber} ${styles.lsRight} ${styles.lsRed}`}></div>
    </div> 
  );
};