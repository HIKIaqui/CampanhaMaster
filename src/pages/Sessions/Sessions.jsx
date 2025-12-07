import { useState, useEffect } from 'react';
import SessionCard from '../../components/SessionCard/SessionCard.jsx';
import styles from './Sessions.module.css';

const STORAGE_KEY = 'campanhaMaster_sessions';

const initialSessions = [
  {
    id: 1,
    title: 'Sessão #7 - O Laboratório ONI',
    date: '12/12/2025',
    focus: 'Exploração de dungeon e horror psicológico',
    status: 'planejada'
  },
  {
    id: 2,
    title: 'Sessão #6 - Queda em Safira',
    date: '05/12/2025',
    focus: 'Conflitos políticos e combate urbano',
    status: 'jogada'
  },
];

function Sessions() {
  const [sessions, setSessions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialSessions;
    } catch (err) {
      console.error('Erro ao ler sessões do localStorage :(', err);
      return initialSessions;
    }
  });
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    focus: '',
    status: '',
  });
  
    // sempre que sessions mudar, salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (err) {
      console.error('Erro ao salvar sessões no localStorage', err);
    }
  }, [sessions]);
  
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
    
  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.date.trim()) {
      alert('Preencha pelo menos o título e a data da sessão.');
      return;
    }

    const newSession = {
      id: Date.now(),
      ...formData,
    };

    setSessions((prev) => [newSession, ...prev]);

    setFormData({
      title: '',
      date: '',
      focus: '',
      status: '',
    });
  }  

  return (
    <section className={styles.container}>
        <h2>Sessões</h2>
          <p>Cadastre e visualize suas sessões de RPG.</p>
    
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="title">Título</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ex: Sessão #1 - A Jornada Começa"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.field}>
              <label htmlFor="date">Data</label>
              <input
                id="date"
                name="date"
                type="text"
                placeholder="Ex: 12/12/2025"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.field}>
              <label htmlFor="focus">Foco</label>
              <input
                id="focus"
                name="focus"
                type="text"
                placeholder="Ex: Exploração, Combate, Interação..."
                value={formData.focus}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.field}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="jogada">jogada</option>
                <option value="pausada">pausada</option>
                <option value="planejada">planejada</option>
              </select>
            </div>
    
            <button type="submit" className={styles.button}>
              Adicionar sessão
            </button>
          </form>

      <div className={styles.list}>
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            title={session.title}
            date={session.date}
            focus={session.focus}
            status={session.status === 'planejada' ? 'planejada' : session.status === 'pausada' ? 'pausada' : 'jogada'}
          />
        ))}
      </div>
    </section>
  );
}

export default Sessions;
