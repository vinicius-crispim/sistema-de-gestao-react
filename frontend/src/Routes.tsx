import FornecedorRespondeProdutos from "components/FornecedorRepondeProduto";
import FornecedorVisualizaProdutos from "components/FornecedorResposta";
import OrdemCompra from "components/OrdemCompra";
import VerificaPedido from "components/VerificaPedidos";
import CadastroCotacao from "pages/cadastrocotacao";
import CadastroFornecedor from "pages/cadastrofornecedor";
import CadastrarFuncionario from "pages/cadastrofuncionario";
import CadastroProduto from "pages/cadastroproduto";
import Estoque from "pages/estoque";
import RespostaTelaProduto from "pages/fornecedorrespondeprodutos";
import Home from "pages/home";
import HomeFornecedor from "pages/home/index forn";
import Login from "pages/login";
import NotaFiscalteste from "pages/notafiscal";
import RespostaTela from "pages/respostafornecedor";
import VerificaPedidoTela from "pages/verificapedido";
import { BrowserRouter, Route, Switch } from "react-router-dom"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/homefornecedor" exact>
                    <HomeFornecedor />
                </Route>
                <Route path="/cotacao" exact>
                    <CadastroCotacao />
                </Route>
                <Route path="/ordemcompra" exact>
                    <OrdemCompra />
                </Route>
                <Route path="/cadastrofornecedor" exact>
                    <CadastroFornecedor />
                </Route>
                <Route path="/cadastroproduto" exact>
                    <CadastroProduto />
                </Route>
                <Route path="/estoque" exact>
                    <Estoque />
                </Route>
                <Route path="/cadastrofuncionario" exact>
                    <CadastrarFuncionario />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/nota">
                    <NotaFiscalteste />
                </Route>
                <Route path="/verificarpedidos">
                    <VerificaPedidoTela />
                </Route>
                <Route path="/resposta">
                    <RespostaTela />
                </Route>
                <Route path="/respostaitemcotacao">
                    <RespostaTelaProduto />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;