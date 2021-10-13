import CadastroFornecedor from "pages/cadastrofornecedor";
import CadastrarFuncionario from "pages/cadastrofuncionario";
import CadastroProduto from "pages/cadastroproduto";
import Estoque from "pages/estoque";
import Home from "pages/home";
import Login from "pages/login";
import { BrowserRouter, Route, Switch } from "react-router-dom"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/cadastrofornecedor" exact>
                    <CadastroFornecedor/>
                </Route>
                <Route path="/cadastroproduto">
                    <CadastroProduto />
                </Route>
                <Route path="/estoque">
                    <Estoque/>
                </Route>
                <Route path="/cadastrofuncionario">
                    <CadastrarFuncionario/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;