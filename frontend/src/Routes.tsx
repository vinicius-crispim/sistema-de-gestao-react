
import CadastroCategoriaTela from "pages/cadastrocategoria";
import CadastroCidadeTela from "pages/cadastrocidade";
import CadastroCotacao from "pages/cadastrocotacao";
import CadastroEstadoTela from "pages/cadastroestado";
import CadastroFornecedor from "pages/cadastrofornecedor";
import CadastrarFuncionario from "pages/cadastrofuncionario";
import CadastroProduto from "pages/cadastroproduto";
import CotacoesEmAndamentoTela from "pages/cotacoesemandamento";
import CotacoesFinalizadastela from "pages/cotacoesfinalizadas";
import Estoque from "pages/estoque";
import GerirCotacoesTela from "pages/gerircotacoes";
import Home from "pages/home";
import HomeFornecedor from "pages/home/index forn";
import Login from "pages/login";
import NotaFiscalteste from "pages/notafiscal";
import RespostaTela from "pages/respostafornecedor";
import VerificaNotaFiscalTela from "pages/verificanotafiscal";
import VerificaNotaFiscalFornecedorTela from "pages/verificanotafiscalfornecedor";
import VerificaNotaFornecedor from "pages/verificanotafornecedor";
import VerificaOrdemTela from "pages/verificaordem";
import VerificaPedidoTela from "pages/verificapedido";
import VerificaRespostaProdutosTela from "pages/verificarespostaprodutos";
import VerificaRespostasTela from "pages/verificarespostas";
import VerificaOrdemProdutosTela from "pages/verificarordemprodutos";
import VisualizarProdutoTela from "pages/VisualizarProdutoTela";
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
                <Route path="/gerircotacoes" exact>
                    <GerirCotacoesTela />
                </Route>
                <Route path="/cadastrocategoria" exact>
                    <CadastroCategoriaTela />
                </Route>
                <Route path="/cadastroestado" exact>
                    <CadastroEstadoTela />
                </Route>
                <Route path="/cadastrocidade" exact>
                    <CadastroCidadeTela />
                </Route>
                <Route path="/cotacao" exact>
                    <CadastroCotacao />
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
                <Route path="/visualizarproduto">
                    <VisualizarProdutoTela />
                </Route>
                <Route path="/verificarrespostas">
                    <VerificaRespostasTela />
                </Route>
                <Route path="/verificarrespostaprodutos">
                    <VerificaRespostaProdutosTela />
                </Route>
                <Route path="/cotacoesemandamento">
                    <CotacoesEmAndamentoTela />
                </Route>
                <Route path="/verificaordens">
                    <VerificaOrdemTela />
                </Route>
                <Route path="/verificaordemprodutos">
                    <VerificaOrdemProdutosTela />
                </Route>
                <Route path="/notafiscal">
                    <VerificaNotaFiscalTela />
                </Route>
                <Route path="/notafiscalfornecedor">
                    <VerificaNotaFiscalFornecedorTela />
                </Route>
                <Route path="/cotacoesfinalizadas">
                    <CotacoesFinalizadastela />
                </Route>
                <Route path="/verificanotasfornecedor">
                    <VerificaNotaFornecedor />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;