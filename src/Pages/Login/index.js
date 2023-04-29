import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import takeFlixApi from "../../services/takeFlixApi";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  async function handleSingin(e) {
    e.preventDefault();
    setLoad(true);

    const data = {
      email: email,
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
        setLoad(false)
        console.log(error);
        document.getElementById("error").innerText = "Dados invalidos ou não cadastrados!";
        document.getElementById("error").setAttribute("style", "color:red");
        setTimeout(() => {
          document.getElementById("error").setAttribute("style", "display:none");
        }, 2000);
      });
  }
  return (
    <div className="containercadastro">
      <Header></Header>
      <div className="box-area-form">
        <form className="form" onSubmit={(e) => handleSingin(e)}>
          <Title texto="Entrar" color="#121212"></Title>
          <p>🖤 TakeFlix Filmes e séries online grátis! </p>
          <input
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          ></input>
          <input
            type={"text"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          ></input>

          <button type="submit">{load ? 'Entrando...' : 'Entrar'}</button>
          <span id="error"></span>
          <a href="/cadastro">Não possui cadastro?, cadatre-se</a>
        </form>
      </div>
    </div>
  );
};
export default Cadastro;
