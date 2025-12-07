import styles from './About.module.css';

function About() {
  return (
    <section className={styles.container}>
      <h2>Sobre o CampanhaMaster</h2>
      <p>
        Este sistema foi desenvolvido como trabalho da disciplina de Desenvolvimento Web,
        usando React, React Router, componentes reutilizáveis, props, CSS Modules e até mesmo Local Storage!
      </p>
      <p>
        A ideia é ter um exemplo simples de aplicação para organizar campanhas de RPG,
        mas que também demonstre boas práticas de desenvolvimento web com React. É isso.
      </p>
    </section>
  );
}

export default About;
