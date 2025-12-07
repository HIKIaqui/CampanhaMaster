import styles from './Home.module.css';

function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>Bem-vindo(a) ao CampanhaMaster</h1>
        <p>
          Um painel simples para organizar suas campanhas, personagens e sessões de RPG.
          Porque perder ficha já basta, perder a campanha inteira é sacanagem.
        </p>
      </div>

      <div className={styles.panel}>
        <h2>Resumo rápido</h2>
        <ul>
          <li>3 campanhas ativas</li>
          <li>5 personagens cadastrados</li>
          <li>Próxima sessão: sábado, 20h</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
