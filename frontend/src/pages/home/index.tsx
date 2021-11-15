import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CotacaoItem, FornecedorCotacaoCompraSelect } from "types/cotacao";
import { Funcionario } from "types/funcionario";
import { BASE_URL } from "utils/request";

/*let vinistring = localStorage.getItem("user");*/
let user = JSON.parse(localStorage.getItem('user') || '{}');

type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}


type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;

}
const Home = () => {

    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })
    const [todas2, setTodasCotacao2] = useState<Todas>({ cotacoes: [], quantidade: [] })

    const history = useHistory();

    function onSubmit(event: any) {
        axios.get(`${BASE_URL}/cotacoes/pendente`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoesemandamento");
                localStorage.setItem('cotacoesemandamento', JSON.stringify(todas));
                
                let bemvindo = JSON.parse(localStorage.getItem('cotacoesemandamento') || '{}');
                console.log(bemvindo);
                console.log(todas);
            });
        axios.get(`${BASE_URL}/cotacoes`)
            .then(response => {
                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas2.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas2.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas2));
                
                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/cotacoesemandamento");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas2);
            });
    }

    function achaFinalizada() {
        axios.get(`${BASE_URL}/cotacoes/finalizada`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoesfinalizada");
                localStorage.setItem('cotacoesfinalizada', JSON.stringify(todas));
                
                let bemvindo = JSON.parse(localStorage.getItem('cotacoesfinalizada') || '{}');
                console.log(bemvindo);
                console.log(todas);
            });
        axios.get(`${BASE_URL}/cotacoes`)
            .then(response => {
                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas2.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas2.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas2));
                
                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/cotacoesfinalizadas");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas2);
            });
    }



    return (
        <>
            <NavBar />

            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Facebuy</h1>
                    <p className="lead">Sistema de Gestão de Compras</p>
                    <p>{user.nome}</p>
                    <hr />
                    <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                    <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg">Visualizar Respostas</button>
                    <button type="submit" onClick={achaFinalizada} className="btn btn-success btn-lg mx-2">Visualizar Cotacoes Finalizadas</button>
                    <Link className="btn btn-success btn-lg mx-3" to="/cadastrofuncionario"> Cadastrar Funcionário</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/cadastroproduto"> Cadastrar Produto</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/estoque"> Estoque</Link>
                    <Link className="btn btn-success btn-lg mx-5 my-4" to="/nota"> Nota Fiscal</Link>
                    <Link className="btn btn-success btn-lg mx-5 my-4" to="/cotacao"> Cotacao</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;