import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { BsSearch } from "react-icons/bs";
import "../../Pages/Filmes/style.css";
import { useParams } from "react-router-dom";

export default function BoxSearchSeries() {
  const [generes, setGeneres] = useState([]);
  const [nomefilme, setNomefilme] = useState("");

  const { nomefilmeurl } = useParams();

  useEffect(() => {
    api
      .get("/genre/tv/list")
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
    <div className="boxCategorias">
      <div className="inputSearch">
        <input
          type="search"
          placeholder="Nome da série"
          onChange={(e) => {
            setNomefilme(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            if (!nomefilme) {
              return;
            }
            window.location.href = `/series/${nomefilme}/page/${1}`;
            setNomefilme("");
          }}
        >
          <BsSearch color="#fff"></BsSearch>
        </button>
      </div>
      <select
        onChange={async (value) => {
          window.location.href = `/series/genero/${value.target.value}/page/${1}`;
        }}
      >
        <option>Generos</option>
        {generes.map((item) => {
          return (
            <>
              <option value={item.id}>{item.name}</option>
            </>
          );
        })}
      </select>
    </div>
  );
}
