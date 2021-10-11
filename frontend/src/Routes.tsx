import EstoqueTable from "components/EstoqueTable";
import CadastroFornecedor from "pages/cadastrofornecedor";
import CadastroProduto from "pages/cadastroproduto";
import Estoque from "pages/estoque";
import Home from "pages/home";
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
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;