import React from "react";
import Title from "../Title";
import "./style.css";
export default function Wellcome() {
  return (
    <div className="containerWellcome">
      <div className="boxWellcome">
        <div className="boxbtnClose">
          <button
            onClick={() => {
              localStorage.setItem("@takeflixmodalremove", JSON.stringify(true));
              document.querySelector(".containerWellcome").setAttribute("style", "display:none");
            }}
          >
            X
          </button>
        </div>
        <Title color="#fff" texto="Seja bem vindo(a) ao TakeFlix filmes e séries grátis!"></Title>
        <p>Melhor site de streaming grátis!</p>
        <p>1° lugar no Google 🎉🥳</p>
      </div>
    </div>
  );
}
