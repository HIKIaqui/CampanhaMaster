import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        CampanhaMaster &copy; {year} – Mestre de RPG cansado, mas organizado.
      </p>
    </footer>
  );
}

export default Footer;
