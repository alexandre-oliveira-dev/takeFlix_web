import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import takeFlixApi from "../../services/takeFlixApi";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    async function load() {
      const user = JSON.parse(localStorage.getItem("@tokenTakeflix")) || [];

      await takeFlixApi.get(`/favoritos/${user.id}`).then((data) => {
        setLoad(false);
        setFilmes(data.data);
      });
    }
    load();
  }, []);

  async function excluir(id) {
    await takeFlixApi
      .delete(`/favoritos/${id}`)
      .then(() => {
        toast.success("Excluido com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        toast.error("ops!, tente novamente mais tarde.");
      });
  }

  return (
    <div className="meus-filmes">
      <Header color="#1d1d1d"></Header>
      <h2 className="titleGenere">Meus Favoritos</h2>
      <ul
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {load && <h2 style={{ color: "#fff" }}>Carregando...</h2>}
        {filmes?.map((item) => {
          return (
            <>
              <li className="item" key={item.imdid}>
                <div className="box-info">
                  <img
                    className="imgposter2"
                    src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                    alt={item.title}
                  />
                  <span>{item.title}</span>
                  <span>Avaliação: {item.avaliation}</span>
                </div>
                <div className="btn-area2">
                  {item.type == "filme" ? (
                    <Link to={`/filme/${item.imdid}`}>Ver detalhes</Link>
                  ) : (
                    <Link to={`/serie/${item.imdid}`}>Ver detalhes</Link>
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
