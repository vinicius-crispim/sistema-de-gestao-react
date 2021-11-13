import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";
import { OrdemCompra } from "types/ordemcompra";

type Todas = {
    ordens: OrdemCompra[];
    quantidade:number[];
}

let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let todascotacoes = JSON.parse(localStorage.getItem('ordens') || '{}');

const VerificaOrdem = () => {
    const history = useHistory();
    const [id, setID] = useState<0>();

    function onSubmit(event: any) {
        const { name, value } = event.target
        console.log({ name, value });
        setID(value);
        console.log(value);
        axios.get(`${BASE_URL}/ordemcompras/${value}`).then(response => {
            const data = response.data as OrdemCompra;
            localStorage.removeItem('ordemcompra');
            localStorage.setItem('ordemcompra', JSON.stringify(data));
            console.log(JSON.parse(localStorage.getItem('ordemcompra') || '{}'));
            history.push("/verificaordemprodutos");
            window.location.reload();
        });


    }
    const [todas, setTodasCotacao] = useState<Todas>(todascotacoes)
    console.log("AA")
console.log(todas);
    return (
        <div className="table-responsive">
            <h3 className="text-center display-4">Pedidos Pendentes</h3>
            
            <table className="table table-striped table-md">
                <thead>
                    <tr>
                        <th className="text-center text-primary">Numero</th>
                        <th className="text-center text-primary">Autor</th>
                        <th className="text-center text-primary">Email</th>
                        <th className="text-center text-primary">Valor</th>
                        <th className="text-center text-primary">Data</th>
                        <th className="text-center text-primary"></th>
                    </tr>
                </thead>
                <tbody>
                    {todas.quantidade.map(x => (
                        <tr key={todas.ordens[x].id}>
                            <td className="text-center">{todas.ordens[x].id}</td>
                            <td className="text-center">{todas.ordens[x].funcionario.nome}</td>
                            <td className="text-center">{todas.ordens[x].funcionario.email}</td>
                            <td className="text-center">{todas.ordens[x].preco}</td>
                            <td className="text-center">{todas.ordens[x].data}</td>
                            <td className="text-center"><button type="submit" value={todas.ordens[x].id} onClick={onSubmit} className="btn btn-success btn-lg">Ver Ordem</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerificaOrdem;