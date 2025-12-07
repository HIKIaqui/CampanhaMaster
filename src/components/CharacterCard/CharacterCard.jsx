import styles from './CharacterCard.module.css';

function CharacterCard({ name, role, level, campaign }) {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p><strong>Papel:</strong> {role}</p>
      <p><strong>Nível:</strong> {level}</p>
      <p><strong>Campanha:</strong> {campaign}</p>
    </div>
  );
}

export default CharacterCard;
