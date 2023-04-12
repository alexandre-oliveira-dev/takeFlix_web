import react, { useEffect, useState } from "react";
import './style.css'
import api from "../../services/api";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";


export default function Filmes() {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const { number } = useParams('page')

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/popular?page=${number}`)
                .then((value) => {
                    setData(value.data.results)
                })
        }
        loadFilmes()
    }, [page])

    return (
        <div className="containerPageFilmes">
            <Header></Header>
            <section className="containerListFilms">
                <div className='boxListfilmesFilmes'>
                    {
                        data.map(item => {
                            return (
                                <div key={item.id}>
                                    <div className='item-filme'>
                                        <img onClick={() => window.location.href = `/filme/${item.id}`} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <div className="boxBtnNextPage">
                <button id="btnNextPage" onClick={(() => window.location.href = `/filmes/page/${Number(number) + 1}`)}>Próxima página {Number(number) + 1}</button>
            </div>
        </div>
    )
}