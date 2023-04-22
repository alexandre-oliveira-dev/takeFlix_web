import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./filme.css";
import "../Filme/filme.css";
import api from "../../services/api";
import { toast } from "react-toastify";
import Header from "../../components/Header";

function Series() {
  const { idserie } = useParams();
  const [filme, setFilme] = useState([]);
  const [diretores, setDiretores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [seasonsnumber, setSeasonsnumber] = useState();
  const [ep, setEp] = useState([]);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/tv/${idserie}`)
        .then((response) => {
          setFilme([response.data]);
          //setDiretores(response.data.created_by)
          setLoading(false);
          setSeasons(response.data.seasons);
          //console.log(response.data);
        })
        .catch(() => {
          console.log("FILME NAO ENCONTRADo");
        });
    }
    loadFilme();
    setUrl(`https://embedder.net/e/series?tmdb=${idserie}&sea=${1}&epi=${1}`);
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

    //console.log(minhaLista);
    minhaLista.push(filme[0]);
    localStorage.setItem("@primeflix", JSON.stringify(minhaLista));
    toast.success("Série salva com sucesso!");
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
                  {
                    <iframe
                      id="EmbedderContainer"
                      src={url}
                      width="100%"
                      height={window.screen.width > 500 ? "350px" : "300px"}
                      allowfullscreen="allowfullscreen"
                      frameborder="0"
                    ></iframe>
                  }
                  <div className="selectSeasonandEp">
                    <select
                      onChange={async (e) => {
                        await api.get(`/tv/${idserie}/season/${e.target.value}`).then((value) => {
                          setEp(value.data.episodes);
                         // console.log(ep);
                        });
                        setSeasonsnumber(e.target.value);
                      }}
                    >
                      <option>Escolha a temporada</option>
                      {seasons?.map((item) => {
                        return (
                          <option key={item.id} value={item.season_number}>
                            {Number(item.season_number) == 0
                              ? +Number(item.season_number) + 1
                              : Number(item.season_number)}
                            ° Temporada
                          </option>
                        );
                      })}
                    </select>
                    {ep !== "[]" && (
                      <select
                        onChange={(e) => {
                          setUrl(
                            `https://embedder.net/e/series?tmdb=${idserie}&sea=${seasonsnumber}&epi=${e.target.value}`
                          );
                        }}
                      >
                        <option>Escolha o episodio</option>
                        {ep.map((item) => {
                          return (
                            <option key={item.id} value={item.episode_number}>
                              {item.episode_number} - {item.name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className="info-text">
                <h3>Sinopse</h3>
                <span>{item.overview}</span>
                <span>{item.imdb_id}</span>

                <strong>Avalição: {item.vote_average} / 10</strong>
                <br></br>

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
