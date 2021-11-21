import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem, FornecedorCotacaoCompra, FornecedorCotacaoCompraSelect } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";
import { NotaFiscal } from "types/notafiscal";

type Todas = {
    fornecedorCotacaoCompra: FornecedorCotacaoCompraSelect[];
    quantidade: number[];
}

let user = JSON.parse(localStorage.getItem('user') || '{}');
let todasfornecedorcotacaocompra = JSON.parse(localStorage.getItem('fornecedorcotacaocompra') || '{}');

type Mostra = {
    idCotacao: number;
    nomes: string[][];
}

const VerificaRespostas = () => {
    const [todas, setTodasCotacao] = useState<Todas>(todasfornecedorcotacaocompra)
    let total: any = []
    let aux: number
    for (let index = 0; index < todas.fornecedorCotacaoCompra.length; index++) {
        aux = 0
        for (let index2 = 0; index2 < todas.fornecedorCotacaoCompra[index].fornecedorcotacaocompraitem.length; index2++) {
            aux += todas.fornecedorCotacaoCompra[index].fornecedorcotacaocompraitem[index2].preco
        }
        aux += todas.fornecedorCotacaoCompra[index].frete
        total.push(aux)
        console.log(total);
    }

    const [fornecedorcotacaocompra, setFornecedorCotacaoCompra] = useState<FornecedorCotacaoCompraSelect>({
        id: 0,
        data: "",
        fornecedor: { cidade: { id: 0, nome: "" }, cnpj: "", email: "", login: "", nome: "", senha: "" },
        fornecedorcotacaocompraitem: [], dataentrega: "", frete: 0
    })
    const history = useHistory();
    let idnota = 0;
    let temnota = 0;
    function onSubmit(event: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const { name, value } = event.target
        console.log({ name, value });
        console.log(value);
        axios.get(`${BASE_URL}/fornecedorcotacaocompras/${value}`).then(response => {
            const data1 = response.data as FornecedorCotacaoCompraSelect;
            localStorage.removeItem('fornecedorcotacaocompra2');
            localStorage.setItem('fornecedorcotacaocompra2', JSON.stringify(data1));
            console.log("AAAA")
            console.log(JSON.parse(localStorage.getItem('fornecedorcotacaocompra2') || '{}'));
            axios.get(`${BASE_URL}/notaFiscais/notafiscalpedido/${data1.num_pedido}`)
                .then(response => {

                    const data = response.data as NotaFiscal[];
                    console.log("NOTAA")
                    console.log(data1.num_pedido)
                    console.log(data)

                    for (let index = 0; index < data.length; index++) {
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        idnota = data[index].id;
                    }
                    if (data.length !== 0) {
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        temnota = 1;
                        console.log(`TemNOTA ${temnota}`)
                    } else {
                        temnota = 12
                    }
                    localStorage.removeItem('temnota');
                    localStorage.setItem('temnota', JSON.stringify(temnota));
                    console.log("AAAA")
                    console.log(JSON.parse(localStorage.getItem('temnota') || '{}'));
                    localStorage.removeItem('idnota');
                    localStorage.setItem('idnota', JSON.stringify(idnota));
                    console.log("AAAA")
                    console.log(JSON.parse(localStorage.getItem('idnota') || '{}'));
                });
            history.push("/verificarrespostaprodutos")
            window.location.reload();
        });
        console.log("AA")
        console.log(todas);
    }


    return (
        <div className="table-responsive">
            <h3 className="text-center display-4">Verifique as respostas dos fornecedores</h3>
            <h5 className="text-center text-secondary">Selecione a resposta que deseja visualizar</h5>
            <table className="table table table-light table-md table-hover align-middle caption-top">
                <caption className="">Lista de respostas</caption>
                <thead>
                    <tr>
                        <th className="text-center text-primary">Numero</th>
                        <th className="text-center text-primary">Status</th>
                        <th className="text-center text-primary">Fornecedor</th>
                        <th className="text-center text-primary">Email</th>
                        <th className="text-center text-primary">Data</th>
                        <th className="text-center text-primary">Valor Total</th>
                        <th className="text-center text-primary"></th>

                    </tr>
                </thead>
                <tbody>
                    {todas.quantidade.map(x => (
                        <tr key={todas.fornecedorCotacaoCompra[x].id}>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].id}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].status}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].fornecedor.nome}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].fornecedor.email}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].data}</td>
                            <td className="text-center">{total[x]}</td>
                            <td className=""><button type="submit" value={todas.fornecedorCotacaoCompra[x].id} onClick={onSubmit} className="text-dark text-black btn btn-success btn-lg"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                        <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>Ver detalhes</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerificaRespostas;