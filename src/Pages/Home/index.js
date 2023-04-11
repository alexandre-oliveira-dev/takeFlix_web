import { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../App.css'
import { toast } from 'react-toastify'
import Header from '../../components/Header'
import './style.css'
import Title from '../../components/Title';


function Home() {
    const [filmes, setFilmes] = useState([]);
    const [filmes2, setFilmes2] = useState([]);
    const [series, setSeries] = useState([]);
    const [series2, setSeries2] = useState([]);

    useEffect(() => {

        async function loadFilmes() {
            await api.get("movie/now_playing")
                .then((data) => {
                    setFilmes(data.data.results.slice(0, 9))
                    setFilmes2(data.data.results.slice(10, 20))

                })

            await api.get("/tv/on_the_air")
                .then((data) => {
                    setSeries(data.data.results.slice(0, 9))
                    setSeries2(data.data.results.slice(10, 20))
                    //console.log(data.data)
                })


            document.querySelector('.section-1').setAttribute('style', `background-image:url(${`https://image.tmdb.org/t/p/original/${series.map(item => item.backdrop_path)[0]}`})`)
        }
        loadFilmes();

    }, [filmes])

    return (
        <div className='container-home'>
            <Header></Header>
            <section className='section-1'>
                <div className='title'><h1>Em Cartaz</h1></div>
                <div className='title-fime-cartaz'>
                    <h1>{series.map(item => item.name)[0]}</h1>
                    <h3>Avaliação: {series.map(item => item.vote_average)[0]}</h3>
                    <div className='btns-filme-cartaz'>
                        <a target={'_blank'} href={`https://www.youtube.com/results?search_query=trailer ${series.map(item => item.name)[0]}`}>Ver Trailer</a>
                        <button>Adicionar aos Favoritos</button>
                    </div>
                </div>
                <div className='banner-filme-cartaz'>
                    <img onClick={() => window.location.href = `/filme/${series.map(item => item.id)[0]}`} src={`https://image.tmdb.org/t/p/original/${series.map(item => item.poster_path)[0]}`}></img>
                </div>
            </section>
            <section className='section2'>
                <Title color="#fff" texto='Lançamentos'></Title>

                <div className='container-lista-filmes'>

                    {
                        filmes.map(item => {
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
                <div className='container-lista-filmes'>

                    {
                        filmes2.map(item => {
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

                <Title color="#fff" texto='Series - Ultimos lançamentos'></Title>
                <div className='container-lista-filmes'>

                    {
                        series.map(item => {
                            return (
                                <div key={item.id}>
                                    <div className='item-filme'>
                                        <img onClick={() => window.location.href = `/series/${item.id}`} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container-lista-filmes'>

                    {
                        series2.map(item => {
                            return (
                                <div key={item.id}>
                                    <div className='item-filme'>
                                        <img onClick={() => window.location.href = `/series/${item.id}`} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default Home;