import React from 'react';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useState } from "react";
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
  
  const [id, setId] = useState('');
  const history = useHistory();
  
  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      console.log(`Bem vindo ${response.data.name}!`);

      localStorage.setItem('ongId', id); //Salvando no storage do navegador.
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
    } catch (error) {
      alert('Erro no Login, tente novamente.')
    }
  }
  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
          <button type="submit" className="button">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
        <img src={heroesImg} alt="Heroes" />
    </div>
  );
}