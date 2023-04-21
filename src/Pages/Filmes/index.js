import react, { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

export default function Filmes() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [generes, setGeneres] = useState([]);
  const [nomefilme, setNomefilme] = useState("");

  const { number } = useParams("page");

  useEffect(() => {
    async function loadFilmes() {
      await api.get(`/movie/popular?page=${number}`).then((value) => {
        setData(value.data.results);
      });
    }
    console.log(data);
    loadFilmes();
  }, []);

  useEffect(() => {
    api
      .get("/genre/movie/list")
      .then((value) => {
        //console.log(value);
        setGeneres(value.data.genres);
        console.log(generes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="containerPageFilmes">
      <Header></Header>
      <div className="boxCategorias">
        <input
          type="search"
          onChange={(e) => {
            setNomefilme(e.target.value);
          }}
        ></input>
        <button
          onClick={async () => {
            if (!nomefilme) {
              return;
            }
            await api
              .get(
                `/search/movie?api_key=6488e6c48fd609153ab42d7243bf5670&query=${nomefilme}&page${number}&per_page=${50}`
              )
              .then((value) => {
                setData(value.data.results);
              });
          }}
        >
          Pesquisar
        </button>
        <select
          onChange={async (value) => {
            window.location.pathname = `/filmes/page/${number}/${value.target.value}`;
            await api
              .get(
                `/discover/movie?api_key=6488e6c48fd609153ab42d7243bf5670&with_genres=${
                  value.target.value
                }&page${number}&per_page=${30}`
              )
              .then((value) => {
                setData(value.data.results);
              });
          }}
        >
          {generes.map((item) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
      </div>
      <section className="containerListFilms">
        <div className="boxListfilmesFilmes">
          {data.map((item) => {
            return (
              <div key={item.id}>
                <div className="item-filme">
                  <img
                    onClick={() => (window.location.href = `/filme/${item.id}`)}
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="boxBtnNextPage">
        <button
          id="btnNextPage"
          onClick={() => (window.location.href = `/filmes/page/${Number(number) + 1}`)}
        >
          Próxima página {Number(number) + 1}
        </button>
      </div>
    </div>
  );
}
