import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import "../../App.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import "./style.css";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [filmes2, setFilmes2] = useState([]);
  const [series, setSeries] = useState([]);
  const [series2, setSeries2] = useState([]);

  const [totalPage, setTotalPage] = useState(0);

  const { number } = useParams("number");

  useMemo(() => {
    async function loadFilmes() {
      await api.get(`movie/now_playing?page=${!number ? 1 : number}`).then((data) => {
        setFilmes(data.data.results.slice(0, 9));
        setFilmes2(data.data.results.slice(10, 20));
        setTotalPage(data.data.total_pages);
        document
          .querySelector(".section-1")
          .setAttribute(
            "style",
            `background-image:url(${`https://image.tmdb.org/t/p/original/${data.data.results[0].backdrop_path}`})`
          );
      });

      await api.get(`/tv/top_rated?page=${!number ? 1 : number}`).then((data) => {
        setSeries(data.data.results.slice(0, 9));
        setSeries2(data.data.results.slice(10, 20));
      });
    }
    loadFilmes();
  }, [number]);

  const Pagination = () => {
    const buttons = [];
    useMemo(() => {
      for (let i = 0; i < totalPage; i++) {
        buttons.push(
          <div>
            <button
              onClick={() => {
                if (Number(number) === i) {
                  window.location.reload();
                  return;
                }
                window.location.href = `/page/${i}`;
              }}
              key={i}
              type="button"
              className="btnPage"
            >
              {i}
            </button>
          </div>
        );
      }
    }, [number]);

    return (
      <div id="boxPagination">
        {buttons.slice(1, !number ? 1 + 2 : Number(number) + 2)} ...
        <button onClick={() => (window.location.href = `/page/${totalPage}`)} className="btnPage">
          {totalPage}
        </button>
      </div>
    );
  };

  return (
    <div className="container-home">
      <Header></Header>

      <section className="section-1">
        <div className="title">
          <h1>Em Cartaz</h1>
        </div>
        <div className="title-fime-cartaz">
          <h1>{filmes.map((item) => item.title)[0]}</h1>
          <h3>Avaliação: {filmes.map((item) => item.vote_average)[0]}</h3>
          <div className="btns-filme-cartaz">
            <a
              target={"_blank"}
              href={`https://www.youtube.com/results?search_query=trailer ${
                filmes.map((item) => item.title)[0]
              }`}
            >
              Ver Trailer
            </a>
            <button
              onClick={() => {
                const minhaLista = JSON.parse(localStorage.getItem("@primeflix")) || [];

                const hasFilme = minhaLista.some((filmesSalvo) => filmesSalvo.id === filmes[0].id);

                if (hasFilme) {
                  toast.error("Esse filme ja está na lista");
                  return;
                }

                //console.log(minhaLista);
                minhaLista.push(filmes[0]);
                localStorage.setItem("@primeflix", JSON.stringify(minhaLista));
                toast.success("Filme salvo com sucesso!");
              }}
            >
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
        <div className="banner-filme-cartaz">
          <img
            onClick={() => (window.location.href = `/filme/${filmes.map((item) => item.id)[0]}`)}
            src={`https://image.tmdb.org/t/p/original/${filmes.map((item) => item.poster_path)[0]}`}
          ></img>
        </div>
        <div className="blurImage"></div>
      </section>
      <section className="section2">
        <Title color="#fff" texto="Lançamentos"></Title>

        <div className="container-lista-filmes">
          {filmes.map((item) => {
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
        <div className="container-lista-filmes">
          {filmes2.map((item) => {
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

        <Title color="#fff" texto="Series - Ultimos lançamentos"></Title>
        <div className="container-lista-filmes">
          {series.map((item) => {
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
        <div className="container-lista-filmes">
          {series2.map((item) => {
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
        <Pagination></Pagination>
      </section>
    </div>
  );
}

export default Home;
