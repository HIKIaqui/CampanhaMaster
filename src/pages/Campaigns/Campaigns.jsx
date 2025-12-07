import { useState, useEffect } from 'react';
import CampaignCard from '../../components/CampaignCard/CampaignCard.jsx';
import styles from './Campaigns.module.css';

const STORAGE_KEY = 'campanhaMaster_campaigns';

const initialCampaigns = [
  {
    id: 1,
    title: 'Os Vales - Sussurros na Penumbra',
    system: 'Sistema dos Vales',
    status: 'Ativa',
    nextSession: '12/12/2025',
  },
  {
    id: 2,
    title: 'Maldição da Cidade Submersa',
    system: 'D&D 5e',
    status: 'Pausada',
    nextSession: 'A definir',
  },
];

function Campaigns() {
  // carrega do localStorage na inicialização
  const [campaigns, setCampaigns] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialCampaigns;
    } catch (err) {
      console.error('Erro ao ler campanhas do localStorage :(', err);
      return initialCampaigns;
    }
  });

  const [formData, setFormData] = useState({
    title: '',
    system: '',
    status: 'Ativa',
    nextSession: '',
  });

  // sempre que campaigns mudar, salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    } catch (err) {
      console.error('Erro ao salvar campanhas no localStorage', err);
    }
  }, [campaigns]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.system.trim()) {
      alert('Preencha pelo menos o título e o sistema da campanha.');
      return;
    }

    const newCampaign = {
      id: Date.now(),
      ...formData,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    setFormData({
      title: '',
      system: '',
      status: 'Ativa',
      nextSession: '',
    });
  }

  return (
    <section className={styles.container}>
      <h2>Campanhas</h2>
      <p>Cadastre e visualize suas campanhas de RPG.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">Título da campanha</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Ex: Horror em Safira"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="system">Sistema</label>
          <input
            id="system"
            name="system"
            type="text"
            placeholder="Ex: Sistema dos Vales, D&D 5e..."
            value={formData.system}
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
            <option value="Ativa">Ativa</option>
            <option value="Pausada">Pausada</option>
            <option value="Encerrada">Encerrada</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="nextSession">Próxima sessão</label>
          <input
            id="nextSession"
            name="nextSession"
            type="text"
            placeholder="Ex: 20/12/2025"
            value={formData.nextSession}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.button}>
          Adicionar campanha
        </button>
      </form>

      <div className={styles.grid}>
        {campaigns.length === 0 ? (
          <p>Nenhuma campanha cadastrada ainda.</p>
        ) : (
          campaigns.map((camp) => (
            <CampaignCard
              key={camp.id}
              title={camp.title}
              system={camp.system}
              status={camp.status}
              nextSession={camp.nextSession || 'A definir'}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Campaigns;
