import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";
import { NotaFiscal } from '../../types/notafiscal';

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;
}

type Todas = {
    notas: NotaFiscal[];
    quantidade:number[];
}

let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let todasnotas = JSON.parse(localStorage.getItem('notas') || '{}');


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

const NotaFiscalFornecedor = () => {
const history = useHistory();
    const [cotacoestodas, setCotacoesTodas] = useState<TodosItens>({ ids: [], descricao: [], quantidadepedida: [], nomepro: [] });
    const [mostranomes, setMostraNomes] = useState<Mostra>({ nomes: [], idCotacao: 0 });
    function onSubmit(event: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const { name, value } = event.target
        console.log({ name, value });
        console.log(value);
        axios.get(`${BASE_URL}/notaFiscais/${value}`).then(response => {
            const data = response.data as NotaFiscal;
            localStorage.removeItem('notafiscal');
            localStorage.setItem('notafiscal', JSON.stringify(data));
            history.push("/notafiscalfornecedor");
            window.location.reload();
            console.log(JSON.parse(localStorage.getItem('notafiscal') || '{}'));
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
    const [todas, setTodasCotacao] = useState<Todas>(todasnotas)
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
console.log(todas);
    return (
        <div className="table-responsive">
            <h3 className="text-center display-4">Notas Fiscais</h3>
            
            <table className="table table-striped table-md align-middle">
                <thead>
                    <tr>
                        <th className="text-center text-primary"></th>
                        <th className="text-center text-primary">Número</th>
                        <th className="text-center text-primary">Autor</th>
                        <th className="text-center text-primary">Email</th>
                        <th className="text-center text-primary">Data</th>
                        <th className="text-center text-primary">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {todas.quantidade.map(x => (
                        <tr key={todas.notas[x].id}>
                            <td className="text-center"><button type="submit" value={todas.notas[x].id} onClick={onSubmit} className="btn btn-success btn-lg">Ver Nota</button></td>
                            <td className="text-center">{todas.notas[x].num_nota}</td>
                            <td className="text-center">{todas.notas[x].funcionario.nome}</td>
                            <td className="text-center">{todas.notas[x].funcionario.email}</td>
                            <td className="text-center">{todas.notas[x].data}</td>
                            <td className="text-center">{todas.notas[x].precoTotal}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NotaFiscalFornecedor;