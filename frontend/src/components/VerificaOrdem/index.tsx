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
                            <td className="text-center"><button type="submit" value={todas.ordens[x].id} onClick={onSubmit} className="text-dark text-black btn btn-success btn-lg"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                        <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>Ver Ordem</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerificaOrdem;