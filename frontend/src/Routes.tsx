import CadastroFornecedor from "pages/cadastrofornecedor";
import CadastrarFuncionario from "pages/cadastrofuncionario";
import CadastroProduto from "pages/cadastroproduto";
import Estoque from "pages/estoque";
import Home from "pages/home";
import Login from "pages/login";
import NotaFiscalteste from "pages/notafiscal";
import { BrowserRouter, Route, Switch } from "react-router-dom"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Login/>
                </Route>
                <Route path="/home" exact>
                    <Home/>
                </Route>
                <Route path="/cadastrofornecedor" exact>
                    <CadastroFornecedor/>
                </Route>
                <Route path="/cadastroproduto" exact>
                    <CadastroProduto />
                </Route>
                <Route path="/estoque"exact>
                    <Estoque/>
                </Route>
                <Route path="/cadastrofuncionario" exact>
                    <CadastrarFuncionario/>
                </Route>
                <Route path="/login"exact>
                    <Login/>
                </Route>
                <Route path="/nota">
                    <NotaFiscalteste/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;