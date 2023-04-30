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
    if (!name || !email || !password) {
      document.getElementById("error").innerText = "Preencha todos os dados!";
      document.getElementById("error").setAttribute("style", "color:#2d2d2d");
      setLoad(false);
      return;
    }

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
      <Header color="dimgrey"></Header>
      <div className="box-area-form">
        <form className="form" onSubmit={(e) => handleSingUp(e)}>
          <Title texto="Cadastre-se" color="#fff"></Title>
          <p>🖤Assista Filmes e Séries Grátis!</p>
          <input type={"text"} onChange={(e) => setName(e.target.value)} placeholder="Nome"></input>
          <input
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            name="email"
          ></input>
          <input
            type={"text"}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
            name="telefone"
          ></input>
          <input
            type={"text"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            name="password"
          ></input>

          <button type="submit" disabled={load}>
            {load ? <span id="loadspan">Aguarde...</span> : "Cadastrar"}
          </button>
          <span id="error"></span>
          <a href="/login">Já possui cadastro?, login.</a>
        </form>
      </div>
    </div>
  );
};
export default Cadastro;
