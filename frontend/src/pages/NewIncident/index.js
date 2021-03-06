import React, { useState } from "react";
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';


export default function NewIncident(){
  
  const [title, setTitle] = useState('');
  const [description , setDescription] = useState('');
  const [value, setValue] = useState(0);

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();
    const data = {title, description, value};
    
    try {
      await api.post('incidents', data, { headers: {Authorization: ongId} });
      history.push('/profile');
    } catch (err) {
      toast.error("❌ Erro ao cadastrar , tente novamente! ❌", {duration: 2000});
    }
  }

  return(
    <div className="new-incident-container">
      <Toaster />
      <div className="content">
        <section>
          <img src={logoImg} alt="BeTheHero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text"  placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)} required/>
          <textarea  placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required/>
          <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} required/>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}