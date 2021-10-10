import CadastroFornecedor from "pages/cadastrofornecedor";
import CadastroProduto from "pages/cadastroproduto";
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
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;