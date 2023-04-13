import react, { useEffect, useState } from "react";
import './style.css'
import api from "../../services/api";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";


export default function Series() {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const { number } = useParams('number')

    useEffect(() => {
        async function loadSeries() {
            await api.get(`/tv/popular?page=${number}`)
                .then((value) => {
                    setData(value.data.results)
                })
        }
        loadSeries()
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
                                        <img onClick={() => window.location.href = `/serie/${item.id}`} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <div className="boxBtnNextPage">
                <button id="btnNextPage" onClick={(() => window.location.href = `/series/page/${Number(number) + 1}`)}>Próxima página {Number(number) + 1}</button>
            </div>
        </div>
    )
}