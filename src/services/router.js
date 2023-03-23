import { Switch, Route } from 'react-router-dom'

import Home from '../Pages/Home'
import Filme from '../Pages/Filme'
import Favoritos from "../Pages/Favoritos";
import Series from '../Pages/Series'
import Cadastro from '../Pages/Cadastro';

function RoutesApp() {
    return (
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path='/filme/:idfilme' component={Filme}></Route>
            <Route path='/series/:idserie' component={Series}></Route>
            <Route path='/Favoritos/' component={Favoritos}></Route>
            <Route path='/cadastro' component={Cadastro}></Route>
        </Switch >
    )
}
export default RoutesApp;