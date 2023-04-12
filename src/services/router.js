import { Switch, Route } from 'react-router-dom'

import Home from '../Pages/Home'
import Filme from '../Pages/Filme'
import Favoritos from "../Pages/Favoritos";
import Serie from '../Pages/Serie'
import Cadastro from '../Pages/Cadastro';
import Filmes from '../Pages/Filmes';

function RoutesApp() {
    return (
        <Switch>
            <Route  exact path="/" component={Home}></Route> 
            <Route  exact path="/page/:number" component={Home}></Route> 
            <Route path='/filme/:idfilme' component={Filme}></Route>
            <Route path='/serie/:idserie' component={Serie}></Route>
            <Route path='/Favoritos/' component={Favoritos}></Route>
            <Route path='/cadastro' component={Cadastro}></Route>
            <Route path='/filmes/page/:number' component={Filmes}></Route>
        </Switch >
    )
}
export default RoutesApp;