import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem, FornecedorCotacaoCompraSelect } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;
}

type Todas2 = {
    fornecedorCotacaoCompra: FornecedorCotacaoCompraSelect[];
    quantidade: number[];
}

type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade:number[];
}

let user = JSON.parse(localStorage.getItem('user') || '{}');
let todascotacoes = JSON.parse(localStorage.getItem('cotacoes') || '{}');


type TodosItens = {
    ids: number[];
    nomepro: String[];
    quantidadepedida: number[];
    descricao: String[];
}

type Mostra = {
    idCotacao: number;
    nomes: string[][];
}

const CotacoesEmAndamento = () => {

    const [todas2, setTodasCotacao2] = useState<Todas2>({ fornecedorCotacaoCompra: [], quantidade: [] })

    const [cotacoes, setCotacoes] = useState<CotacaoItem>({
        id: 0,
        cotacaocompra: {funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" } }, id: 0 },
        produto: {
            id: 0,
            descrição: "",
            estoque: 0,
            nome: "",
            quantidademin: 0,
            categoria: {
                id: 0,
                nome: "",
            },
        },
        quantidade: 200
    })
    const history = useHistory();
    const [id, setID] = useState<0>();

    const [cotacoestodas, setCotacoesTodas] = useState<TodosItens>({ ids: [], descricao: [], quantidadepedida: [], nomepro: [] });
    const [mostranomes, setMostraNomes] = useState<Mostra>({ nomes: [], idCotacao: 0 });
    function onSubmit(event: any) {
        const { name, value } = event.target
        axios.get(`${BASE_URL}/fornecedorcotacaocompras/bycotacao/${value}`)
            .then(response => {

                const data = response.data as FornecedorCotacaoCompraSelect[];
                todas2.fornecedorCotacaoCompra = data;
                for (let index = 0; index < data.length; index++) {
                    todas2.quantidade.push(index);

                }
                console.log(todas2);
                localStorage.removeItem("fornecedorcotacaocompra");
                localStorage.setItem('fornecedorcotacaocompra', JSON.stringify(todas2));

                let bemvindo = JSON.parse(localStorage.getItem('fornecedorcotacaocompra') || '{}');
                console.log(bemvindo);
                history.push("/verificarrespostas");
                window.location.reload();

                console.log(todas2);
            });


    }

    /*function mostratela(num: number) {
        axios.get(`${BASE_URL},cotacaoitens/${ajuda}`).then(response =>{
            const data = response.data as CotacaoItem;
            localStorage.removeItem("produto");
            localStorage.setItem('produto', JSON.stringify(data));
            
            let bemvindo = JSON.parse(localStorage.getItem('user') || '{}');
            alert(`BEM VINDO ${bemvindo.nome}`);
            history.push("/home");
            window.location.reload();

        });
    }*/
let teste:number;
    const [todas, setTodasCotacao] = useState<Todas>(todascotacoes)
    let das;
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
        }
    });
    console.log("AA")
console.log(todas.cotacoes);
    return (
        <div className="table-responsive">
            <h3 className="text-center display-4">Selecione de qual cotacao deseja ver as respostas</h3>
            
            <table className="table table-striped table-md">
                <thead>
                    <tr>
                        <th className="text-center text-primary">Numero</th>
                        <th className="text-center text-primary">Autor</th>
                        <th className="text-center text-primary">Email</th>
                        <th className="text-center text-primary">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {todas.quantidade.map(x => (
                        <tr key={todas.cotacoes[x].id}>
                            <td className="text-center"><button type="submit" value={todas.cotacoes[x].id} onClick={onSubmit} className="btn btn-success btn-lg">Ver Pedido</button></td>
                            <td className="text-center">{todas.cotacoes[x].funcionario.nome}</td>
                            <td className="text-center">{todas.cotacoes[x].funcionario.email}</td>
                            <td className="text-center">{todas.cotacoes[x].data}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CotacoesEmAndamento;