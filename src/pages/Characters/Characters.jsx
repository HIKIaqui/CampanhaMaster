import { useState, useEffect } from 'react';
import CharacterCard from '../../components/CharacterCard/CharacterCard.jsx';
import styles from './Characters.module.css';

const STORAGE_KEY = 'campanhaMaster_characters';

const initialCharacters = [
  {
    id: 1,
    name: 'Violet',
    role: 'Caçadora de Monstros / Rainha de Diamante',
    level: 4,
    campaign: 'Os Vales - Sussurros na Penumbra'
  },
  {
    id: 2,
    name: 'Tom',
    role: 'Caçador de Monstros',
    level: 3,
    campaign: 'Os Vales - Sussurros na Penumbra'
  },
  {
    id: 3,
    name: 'Kabuki',
    role: 'Feral Lobo furtivo',
    level: 2,
    campaign: 'Os Vales - Sussurros na Penumbra'
  },
];

function Characters() {
  const [characters, setCharacters] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialCharacters;
    } catch (err) {
      console.error('Erro ao ler personagens do localStorage :(', err);
      return initialCharacters;
    }
  });
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    level: '',
    campaign: '',
  });
  
    // sempre que characters mudar, salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
    } catch (err) {
      console.error('Erro ao salvar personagens no localStorage', err);
    }
  }, [characters]);
  
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
    
  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim() || !formData.role.trim()) {
      alert('Preencha pelo menos o nome e o papel do personagem.');
      return;
    }

    const newCharacter = {
      id: Date.now(),
      ...formData,
    };

    setCharacters((prev) => [newCharacter, ...prev]);

    setFormData({
      name: '',
      role: '',
      level: '',
      campaign: '',
    });
  }  

  return (
    <section className={styles.container}>
          <h2>Personagens</h2>
          <p>Cadastre e visualize seus personagens de RPG.</p>
    
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ex: Fulano da Silva"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.field}>
              <label htmlFor="role">Função</label>
              <input
                id="role"
                name="role"
                type="text"
                placeholder="Ex: Mercador, Guerreiro, Mago..."
                value={formData.role}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.field}>
              <label htmlFor="level">Nível</label>
              <input
                id="level"
                name="level"
                type="number"
                placeholder="Ex: 1, 2, 3..."
                value={formData.level}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.field}>
              <label htmlFor="campaign">Campanha</label>
              <input
                id="campaign"
                name="campaign"
                type="text"
                placeholder="Ex: Campanha X"
                value={formData.campaign}
                onChange={handleChange}
              />
            </div>
    
            <button type="submit" className={styles.button}>
              Adicionar personagem
            </button>
          </form>

      <div className={styles.grid}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            name={char.name}
            role={char.role}
            level={char.level}
            campaign={char.campaign}
          />
        ))}
      </div>
    </section>
  );
}

export default Characters;
