import React, { useState, useEffect } from "react";
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';


export default function Profile(){

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName'); //Pegamos o nome que guardamos na localStorage lá no Login e usamos aqui.
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  
  useEffect(() => { //Usado para carregar os dados em determinado momento na página.
    api.get('profile', { headers: {Authorization: ongId,} }).then(response => {setIncidents(response.data)})
  }, [ongId]);

  async function handleDeleteIncident(id){ //Função de deletar um caso.
    try {
      await api.delete(`incidents/${id}`, {headers: {Authorization: ongId}});
      setIncidents(incidents.filter(incident => incident.id !== id)); //Para o caso sumir da tela em tempo real sem precisar dar F5.
      toast.success('Deletado com sucesso! 🗑️✅', {duration: 2000});
    } catch (error) {
      toast.error('Erro ao deletar caso, tente novamente ❌', {duration: 2000});
    }
  }

  function handleLogout(){ //Função para fazer logout.
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="profile-container">
      <Toaster />
      <Toaster />
      <header>
        <img src={logoImg} alt="BeTheHero" />
        <span>Bem vinda, <label className="span-ong-name">{ongName}</label>!</span>
        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p> 

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

          <button type="button" onClick={() => handleDeleteIncident(incident.id)}> {/* Sempre use uma arrowFunction na função de deletar */}
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}