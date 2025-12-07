import styles from './CampaignCard.module.css';

export default function CampaignCard({ title, system, status, nextSession }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p><strong>Sistema:</strong> {system}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Próxima sessão:</strong> {nextSession}</p>
    </div>
  );
}
