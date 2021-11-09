import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem, FornecedorCotacaoCompra, FornecedorCotacaoCompraSelect } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";

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

    const [fornecedorcotacaocompra, setFornecedorCotacaoCompra] = useState<FornecedorCotacaoCompraSelect>({
        id: 0,
        data: "",
        fornecedor: { cidade: { id: 0, nome: "" }, cnpj: "", email: "", login: "", nome: "", senha: "" },
        fornecedorcotacaocompraitem: []
    })
    const history = useHistory();

    function onSubmit(event: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const { name, value } = event.target
        console.log({ name, value });
        console.log(value);
        axios.get(`${BASE_URL}/fornecedorcotacaocompras/${value}`).then(response => {
            const data = response.data as FornecedorCotacaoCompraSelect;
            localStorage.removeItem('fornecedorcotacaocompra2');
            localStorage.setItem('fornecedorcotacaocompra2', JSON.stringify(data));
            console.log("AAAA")
            console.log(JSON.parse(localStorage.getItem('fornecedorcotacaocompra2') || '{}'));
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
                        <th className="text-center text-primary">Fornecedor</th>
                        <th className="text-center text-primary">Email</th>
                        <th className="text-center text-primary">Data</th>
                        <th className="text-center text-primary"></th>

                    </tr>
                </thead>
                <tbody>
                    {todas.quantidade.map(x => (
                        <tr key={todas.fornecedorCotacaoCompra[x].id}>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].id}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].fornecedor.nome}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].fornecedor.email}</td>
                            <td className="text-center">{todas.fornecedorCotacaoCompra[x].data}</td>
                            <td className="text-center"><button type="submit" value={todas.fornecedorCotacaoCompra[x].id} onClick={onSubmit} className="btn btn-success btn-lg">Ver detalhes</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerificaRespostas;