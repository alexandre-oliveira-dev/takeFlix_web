import axios from 'axios';
// base da url :https://api.themoviedb.org/3
//https://api.themoviedb.org/3/movie/now_playing?api_key=12990211cbab45d41f7cbfc2d2f55434


//6488e6c48fd609153ab42d7243bf5670

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: "6488e6c48fd609153ab42d7243bf5670",
        language: "pt-BR",
    }
})

export default api;