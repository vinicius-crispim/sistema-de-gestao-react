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
    const [id,setID]= useState<0>();

    const [cotacoestodas, setCotacoesTodas] = useState<TodosItens>({ ids: [], descricao: [], quantidadepedida: [], nomepro: [] });
    let ajuda = 0;
    function onSubmit(event: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const { name, value }=event.target
        console.log({ name, value });
        setID(value);
        console.log(value);
        axios.get(`${BASE_URL}/cotacaoitens/${value}`).then(response =>{
            const data = response.data as CotacaoItem;
            localStorage.removeItem('respostafornecedor');
            localStorage.setItem('respostafornecedor', JSON.stringify(data));
            history.push("/resposta");
            window.location.reload();
            let itemcotacao = JSON.parse(localStorage.getItem('respostafornecedor') || '{}');
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
        axios.get(`${BASE_URL}/cotacaoitens`)
            .then(response => {

                const data = response.data as CotacaoItem[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.produto.nome);
                const minhasmarcas = data.map(x => x.produto.descrição);
                const minhasquant = data.map(x => x.quantidade);
                setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });
                console.log(data);
            });

        /*.then(response => {
            const data = response.data as CotacaoTeste[];
            console.log(data);
            setTodasCotacao({ cotacoes: data });
        });

        const ids = todas.cotacoes.map(x=>x.id);
        const nomes = todas.cotacoes.map(x=>x.item.map(y=>y.produto.nome));
        const quant = todas.cotacoes.map(x=>x.item.map(p=>p.quantidade));*/

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-md">
                <thead>
                    <tr>
                        <th className="text-center text-primary"></th>
                        <th className="text-center text-primary">Nome</th>
                        <th className="text-center text-primary">Descrição</th>
                        <th className="text-center text-primary">Quantidade Pedida </th>
                        <th className="text-center text-primary"></th>

                    </tr>
                </thead>
                <tbody>
                    {cotacoestodas.ids.map(x => (
                        <tr key={cotacoestodas.ids[x - 1]}>
                            <td className="text-center"><button type="submit" value={cotacoestodas.ids[x - 1]} onClick={onSubmit} className="btn btn-success btn-sm">Ver Pedido</button></td>
                            <td className="text-center">{cotacoestodas.nomepro[x - 1]}</td>
                            <td className="text-center">{cotacoestodas.descricao[x - 1]}</td>
                            <td className="text-center">{cotacoestodas.quantidadepedida[x - 1]}</td>
                            <td className="text-center">{ ajuda =cotacoestodas.ids[x - 1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerificaPedido;