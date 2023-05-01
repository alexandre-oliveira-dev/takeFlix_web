import React from "react";
import { Link } from "react-router-dom";
import img from "../Footer/favicon.ico";
import "./style.css";
import { BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="boxButtons">
          <h3>TakeFlix</h3>
          <Link to={"/"}>Início</Link>
          <Link to={"/filmes/page/1"}>Filmes</Link>
          <Link to={"/series/page/1"}>Séries</Link>
          <Link to={"/favoritos"}>Favoritos</Link>
        </div>
       
        <div className="boxButtons">
          <img alt="img" src={img}></img>
        </div>
      </footer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#fff",
            margin: "10px 0 10px 0",
            fontSize: "14px",
            width: "80%",
          }}
        >
          ©️copyright - Todos direitos reservados a TakeFlix filmes e séries.
        </p>
      </div>
    </>
  );
}
