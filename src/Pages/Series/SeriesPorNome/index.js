import react, { useEffect, useState } from "react";
import "../style.css";
import api from "../../../services/api";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import BoxSearchSeries from "../../../components/BoxSearchSeries";

export default function FilmesPorGenero() {
  const [data, setData] = useState([]);
  const [generes, setGeneres] = useState([]);
  const [nomefilme, setNomefilme] = useState("");
  const [totalPage, setTotalPage] = useState();

  const { number, nomefilmeurl } = useParams();

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(
          `/search/tv?api_key=6488e6c48fd609153ab42d7243bf5670&query=${nomefilmeurl}&page=${number}`
        )
        .then((value) => {
          setData(value.data.results);
          setTotalPage(value.data.total_pages);
        });
    }

    loadFilmes();
  }, []);

  useEffect(() => {
    api
      .get("/genre/tv/list")
      .then((value) => {
        //console.log(value);
        setGeneres(value.data.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="containerPageFilmes">
      <Header color="#1d1d1d"></Header>
      <BoxSearchSeries></BoxSearchSeries>

      <section className="containerListFilms">
        <div>
          <h2 className="titleGenere">{String(nomefilmeurl)}</h2>
        </div>
        <div className="boxListfilmesFilmes">
          {data.map((item) => {
            return (
              <div key={item.id}>
                <div className="item-filme">
                  <img
                    onClick={() => (window.location.href = `/serie/${item.id}`)}
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="boxBtnNextPage">
        {totalPage !== number && number > 1 && (
          <button
            id="btnNextPage"
            onClick={() => {
              if (totalPage == 1) {
                return;
              }

              window.location.href = `/series/${nomefilmeurl}/page/${Number(number) - 1}`;
            }}
          >
            Voltar para a pagina {Number(number - 1)}
          </button>
        )}
        <button
          id="btnNextPage"
          onClick={() => {
            if (totalPage <= 1) {
              return;
            }
            if (number == totalPage) {
              return;
            }
            window.location.href = `/series/${nomefilmeurl}/page/${Number(number) + 1}`;
          }}
        >
          {totalPage > 1 && totalPage > number ? "Próxima página " : ""}
          {totalPage > 1 && totalPage > number && Number(number) + 1} total - {totalPage}
        </button>
      </div>
    </div>
  );
}
