import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import takeFlixApi from "../../services/takeFlixApi";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  async function handleSingUp(e) {
    e.preventDefault();
    setLoad(true);

    const data = {
      name: name,
      email: email,
      telefone: telefone,
      password: password,
    };

    await takeFlixApi
      .post("/users", data)
      .then(() => {
        setLoad(false);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="containercadastro">
      <Header></Header>
      <div className="box-area-form">
        <form className="form" onSubmit={(e) => handleSingUp(e)}>
          <Title texto="Cadastre-se" color="#121212"></Title>
          <p>🖤Obtenha informações atualizadas de Filmes e Séries </p>
          <input type={"text"} onChange={(e) => setName(e.target.value)} placeholder="Nome"></input>
          <input
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          ></input>
          <input
            type={"text"}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
          ></input>
          <input
            type={"text"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          ></input>

          <button type="submit" disabled={load}>
            {load ? "Aguarde..." : "Cadastrar"}
          </button>
          <a href="/login">Já possui cadastro?, login.</a>
        </form>
      </div>
    </div>
  );
};
export default Cadastro;
