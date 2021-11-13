import axios from "axios";
import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CotacaoItem } from "types/cotacao";
import { Funcionario } from "types/funcionario";
import { BASE_URL } from "utils/request";
import { useHistory } from 'react-router';
import { OrdemCompra } from "types/ordemcompra";


/*let vinistring = localStorage.getItem("user");*/
let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;

}

type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}
type Todas2 = {
    ordens: OrdemCompra[];
    quantidade: number[];
}


const HomeFornecedor = () => {

    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })
    const [cotacao, setCotacao] = useState<CotacaoTeste>({
        item: [], id: 0, funcionario: {
            id: 0,
            nome: "",
            login: "",
            senha: "",
            email: "",
            telefone: "",
            tipo: {
                id: 0,
                tipo: "",
            },
        },
    });
    const [todasordens,setOrdens] = useState<Todas2>({ordens:[],quantidade:[]})
    const history = useHistory();

    function onSubmit(event: any) {
        axios.get(`${BASE_URL}/cotacoes/autentica/${fornecedor.id}`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas));
                
                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/verificarpedidos");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas);
            });
    }

    function onSubmit2(event: any) {
        axios.get(`${BASE_URL}/ordemcompras/autentica/${fornecedor.id}`)
            .then(response => {

                const data = response.data as OrdemCompra[];
                todasordens.ordens = data;
                for (let index = 0; index < data.length; index++) {
                    todasordens.quantidade.push(index);

                }
                localStorage.removeItem("ordens");
                localStorage.setItem('ordens', JSON.stringify(todasordens));
                
                let bemvindo = JSON.parse(localStorage.getItem('ordens') || '{}');
                console.log(bemvindo);
                history.push("/verificaordens");
                window.location.reload();

                console.log(todasordens);
            });
    }

    return (
        <>
            <NavBarFornecedor />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Facebuy</h1>
                    <p className="lead">Sistema de Gestão de Compras</p>
                    <p>{fornecedor.nome}</p>
                    <hr />
                    <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                    <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg">Visualizar Pedidos</button>
                    <button type="submit" onClick={onSubmit2} className="mx-3 btn btn-success btn-lg">Visualizar Ordens</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomeFornecedor;