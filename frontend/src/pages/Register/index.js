import React from "react";
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from '../../services/api';
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Register(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory(); //History serve para fazer a navegação pelo LINK.
  
  async function handleRegister(e){
    e.preventDefault();   //Previne que a página recarregue quando o formulário for enviado.
    const data = {name, email, whatsapp, city, uf}
    try{
      const response = await api.post('ongs', data); // Pego os dados acima e coloco no back-end.
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (err) {
      toast.error('❌ Erro no cadastro, tente novamente. ❌', {duration: 2000});
    }
  }

  return(
    <div className="register-container">
      <Toaster />
      <div className="content">
        <section>
          <img src={logoImg} alt="BeTheHero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para o Login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input type="text"  placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
          <input type="email"  placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

          <div className="input-group">
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
            <input placeholder="UF" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)}/>
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}