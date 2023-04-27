import React from "react";
import { Link } from "react-router-dom";
import img from "../Footer/favicon.ico";
import './style.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="boxButtons">
        <h3>TakeFlix</h3>
        <Link to={"/"}>Início</Link>
        <Link to={"/filmes/page/1"}>Filmes</Link>
        <Link to={"/series/page/1"}>Séries</Link>
        <Link to={"/favoritos"}>Favoritos</Link>
      </div>
      <div className="boxButtons">
        <h3>Contatos</h3>
        <p>📩 webgeekagency@gmail.com</p>
        <p>📩 alexandredev.frontend@gmail.com</p>
        <p>📱 (11)99440-7328</p>
      </div>
      <div className="boxButtons">
        <img alt="img" src={img}></img>
      </div>
    </footer>
  );
}
