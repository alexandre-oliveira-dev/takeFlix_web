import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./filme.css";
import api from "../../services/api";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import dayjs from "dayjs";

function Series() {
  const { idfilme } = useParams();
  const [filme, setFilme] = useState([]);
  const [diretores, setDiretores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${idfilme}`, {})
        .then((response) => {
          setFilme([response.data]);
          //setDiretores(response.data.created_by)
          setLoading(false);
          console.log(response.data);
          document.title = response.data.title;
        })
        .catch(() => {
          console.log("FILME NAO ENCONTRADo");
        });
    }
    setUrl(`https://embedder.net/e/movie?tmdb=${idfilme}`);

    loadFilme();
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  function salvarFilme() {
    const minhaLista = JSON.parse(localStorage.getItem("@primeflix")) || [];

    const hasFilme = minhaLista.some((filmesSalvo) => filmesSalvo.id === filme[0].id);

    if (hasFilme) {
      toast.error("Esse filme ja está na lista");
      return;
    }
    let list = {
      ...filme[0],
      type: "filme",
    };
    minhaLista.push(list);
    localStorage.setItem("@primeflix", JSON.stringify(minhaLista));
    toast.success("Filme salvo com sucesso!");
  }

  return (
    <>
      <Header></Header>
      <div className="filme-info">
        {filme.map((item) => {
          return (
            <>
              <img
                className="background"
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                alt={item.title}
              />

              <div className="box-info-filme">
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                />
                <div className="boxVideo">
                  <iframe
                    id="EmbedderContainer"
                    src={url}
                    width="100%"
                    height={window.screen.width > 500 ? "330px" : "300px"}
                    allowfullscreen="allowfullscreen"
                    frameborder="0"
                  ></iframe>
                  <div className="boxPlayers">
                    <p>Players disponíveis:</p>
                    <button
                      onClick={() => {
                        setUrl(`https://embedder.net/e/movie?tmdb=${idfilme}`);
                      }}
                    >
                      Player 1
                    </button>
                    <button
                      onClick={() => {
                        setUrl(`https://embed.warezcdn.com/filme/${item.imdb_id}`);
                      }}
                    >
                      Player 2 (contém mais anuncios)
                    </button>
                  </div>
                </div>
              </div>
              <div className="info-text">
                <h3>Sinopse</h3>
                <span>{item.overview}</span>
                <span>Lançamento: {dayjs(item.release_date).format("DD/MM/YYYY")}</span>
                <span>Duração: {item.runtime} min</span>

                <strong>
                  Avalição: {item.vote_average} / 10 - {item.vote_count} avaliações 🌟
                </strong>

                <div className="btn-area">
                  <button className="Salvar" onClick={salvarFilme}>
                    Salvar
                  </button>
                  <a
                    target="blank"
                    rel="external"
                    href={`https://youtube.com/results?search_query=${item.title} filme trailer`}
                    className="trailer"
                  >
                    Trailer
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Series;
