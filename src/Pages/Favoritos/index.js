import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    let localstorage = JSON.parse(localStorage.getItem("@primeflix")) || [];

    setFilmes(localstorage);
    console.log(localstorage);
  }, []);

  function excluir(id) {
    let filtro = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtro);
    localStorage.setItem("@primeflix", JSON.stringify(filtro));
    toast.success("Filme excluido com sucesso!");
  }

  return (
    <div className="meus-filmes">
      <Header color='#2d2d2d'></Header>
      <h2 className="titleGenere">Meus Favoritos</h2>
      <ul
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {filmes?.map((item) => {
          return (
            <>
              <li className="item" key={item.id}>
                <div className="box-info">
                  <img
                    className="imgposter2"
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt={item.title}
                  />
                  {item.type == "filme" ? <span>{item.title}</span> : <span>{item.name}</span>}
                  <span>Avaliação: {item.vote_average}</span>
                </div>
                <div className="btn-area2">
                  {item.type == "filme" ? (
                    <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                  ) : (
                    <Link to={`/serie/${item.id}`}>Ver detalhes</Link>
                  )}
                  <button onClick={() => excluir(item.id)}>Excluir</button>
                </div>
              </li>
              <hr className="hr"></hr>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
