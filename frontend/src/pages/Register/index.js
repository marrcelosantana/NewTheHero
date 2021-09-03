import React from "react";
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Register(){
  return(
    <div className="register-container">
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
        <form>
          <input type="text"  placeholder="Nome da ONG"/>
          <input type="email"  placeholder="E-mail"/>
          <input placeholder="WhatsApp" />

          <div className="input-group">
            <input placeholder="Cidade" />
            <input placeholder="UF" style={{ width: 80 }}/>
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}