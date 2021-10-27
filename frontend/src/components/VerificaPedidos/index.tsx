import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
}

type Todas = {
    cotacoes: CotacaoTeste[]
}

let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');

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

const VerificaPedido = () => {
    const [cotacoes, setCotacoes] = useState<CotacaoItem>({
        id: 0,
        cotacaocompra: { funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" } }, id: 0 },
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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const { name, value } = event.target
        console.log({ name, value });
        setID(value);
        console.log(value);
        axios.get(`${BASE_URL}/cotacoes/${value}`).then(response => {
            const data = response.data as CotacaoTeste;
            localStorage.removeItem('respostafornecedor');
            localStorage.setItem('respostafornecedor', JSON.stringify(data));
            history.push("/resposta");
            window.location.reload();
            console.log(JSON.parse(localStorage.getItem('respostafornecedor') || '{}'));
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

    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [] })
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

    useEffect(() => {
        axios.get(`${BASE_URL}/cotacoes`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                setTodasCotacao({ cotacoes: data })
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });
                console.log(data);
            });

    }, []);

    return (
        <div className="table-responsive">
            <h3 className="text-center display-4">Pedidos Pendentes</h3>

            <table className="table table-striped table-md">
                <thead>
                    <tr>
                        <th className="text-center text-primary"></th>
                        <th className="text-center text-primary">Autor</th>
                        <th className="text-center text-primary">Email</th>
                        <th className="text-center text-primary">Número do Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {todas.cotacoes.map(x =>(
                        <tr key={x.id}>
                            <td className="text-center"><button type="submit" value={todas.cotacoes[x.id - 1].id} onClick={onSubmit} className="btn btn-success btn-lg">Ver Pedido</button></td>
                            <td className="text-center">{todas.cotacoes[x.id - 1].funcionario.nome}</td>
                            <td className="text-center">{todas.cotacoes[x.id - 1].funcionario.email}</td>
                            <td className="text-center">{todas.cotacoes[x.id - 1].id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerificaPedido;