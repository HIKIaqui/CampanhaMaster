import styles from './SessionCard.module.css';

function SessionCard({ title, date, focus, status }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p><strong>Data:</strong> {date}</p>
      <p><strong>Foco:</strong> {focus}</p>
      <p className={styles[status === 'planejada' ? 'planned' : status === 'pausada' ? 'paused' : 'played']}>
        Status: {status}
      </p>
    </div>
  );
}

export default SessionCard;
