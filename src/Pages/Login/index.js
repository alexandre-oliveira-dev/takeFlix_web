import React, { useState } from "react";
import "../Cadastro/style.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import takeFlixApi from "../../services/takeFlixApi";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  async function handleSingin(e) {
    e.preventDefault();
    if (!email || !password) {
      document.getElementById("error").innerText = "Preencha os campos!";
      document.getElementById("error").setAttribute("style", "color:#2d2d2d");
      return;
    }
    setLoad(true);

    const data = {
      email: email.toLowerCase(),
      password: password,
    };

    await takeFlixApi
      .post("/login", data)
      .then((data) => {
        setLoad(false);
        localStorage.setItem("@tokenTakeflix", JSON.stringify(data.data));
        window.location.href = "/";
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
        document.getElementById("error").innerText = "Dados invalidos ou não cadastrados!";
        document.getElementById("error").setAttribute("style", "color:#2d2d2d");
        setTimeout(() => {
          document.getElementById("error").setAttribute("style", "display:none");
        }, 2000);
      });
  }
  return (
    <div className="containercadastro">
      <Header color="dimgrey"></Header>
      <div className="box-area-form">
        <form className="form" onSubmit={(e) => handleSingin(e)}>
          <Title texto="Entrar" color="#fff"></Title>
          <p>🖤 TakeFlix Filmes e séries online grátis! </p>
          <input
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            name="email"
          ></input>
          <input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            name="password"
          ></input>

          <button disabled={load} type="submit">
            {load ? <span id="loadspan">Entrando...</span> : "Entrar"}
          </button>
          <span id="error"></span>
          <a href="/cadastro">Não possui cadastro?, cadatre-se</a>
        </form>
      </div>
    </div>
  );
};
export default Cadastro;
