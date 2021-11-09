/* eslint-disable react/style-prop-object */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CotacaoItem, FornecedorCotacaoCompraSelect } from 'types/cotacao';
import { Fornecedor } from 'types/fornecedor';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';
import { FornecedorCotacaoCompra, CotacaoCompra, FornecedorCotacaoCompraItem } from '../../types/cotacao';

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    list: CotacaoItem[];
    data?: Date;
}

type TodosItens = {
    todos: FornecedorCotacaoCompraItem[];
}

type Mostrar = {
    quantia: number[];
    produtosnome: string[];
    produtosdescricao: string[];
    produtosquantidade: number[];
    produtosprecoitem: number[];
    produtospreco: number[]
}

let fornecedorstorage = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let fornecedorCotacaoComprastorage = JSON.parse(localStorage.getItem('fornecedorcotacaocompra2') || '{}');


const FornecedorVisualizaProdutos = () => {
    const [fornecedorCotacaoCompra] = useState<FornecedorCotacaoCompraSelect>(fornecedorCotacaoComprastorage)
    const [mostrar, setMostrar] = useState<Mostrar>({ produtospreco: [], produtosnome: [], produtosquantidade: [], quantia: [], produtosprecoitem: [], produtosdescricao: [] });

    console.log(fornecedorCotacaoComprastorage)
    let aux: any = [];
    let p = 0;
    useEffect(() => {
        axios.get(`${BASE_URL}/fornecedorcotacaocompras/${fornecedorCotacaoComprastorage.id}`)
            .then(response => {

                const data = response.data as FornecedorCotacaoCompraSelect;
                console.log("COTACAO:");
                console.log(data);
                const descs = data.fornecedorcotacaocompraitem.map(x => x.cotacaocompraitem.produto.descrição);
                const nomes = data.fornecedorcotacaocompraitem.map(x => x.cotacaocompraitem.produto.nome);
                const quant = data.fornecedorcotacaocompraitem.map(x => x.cotacaocompraitem.quantidade);
                const precositem = data.fornecedorcotacaocompraitem.map(x => x.precoitem);
                const precos = data.fornecedorcotacaocompraitem.map(x => x.preco);
                console.log(nomes);
                console.log(quant);
                console.log(precositem);
                console.log(precos);
                console.log(descs);
                for (let index = 1; index <= data.fornecedorcotacaocompraitem.length; index++) {
                    p += 1;
                    console.log(p);
                    aux.push(p);
                }
                setMostrar({ produtosdescricao: descs, produtosnome: nomes, produtospreco: precos, produtosprecoitem: precositem, produtosquantidade: quant, quantia: aux })
                console.log("MOSTRA");
                console.log(mostrar);

            });


    }, []);
    const history = useHistory();

    const [cotacaocompra, setCotacao] = useState<CotacaoCompra>({ funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" } }, id: 0 });


    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
            <div className="card">
                <li className="d-flex justify-content-between lh-sm list-group-item">
                    <div className="col">
                        <h5>Autor: {fornecedorCotacaoCompra.fornecedor.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Email: {fornecedorCotacaoCompra.fornecedor.email}</h5>
                    </div>
                </li>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-light table-md table-hover align-middle caption-top">
                        <caption className="text-primary text-center">Detalhes da resposta</caption>
                        <thead>
                            <tr>
                                <th className="text-center">Produto</th>
                                <th className="text-center">Descrição</th>
                                <th className="text-center">Quantidade Pedida</th>
                                <th className="text-center">Preço por item</th>
                                <th className="text-center ">Preço total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostrar.quantia.map(x => (
                                <tr key={mostrar.quantia[x]}>
                                    <th className="text-center ">{mostrar.produtosnome[x - 1]}</th>
                                    <th className="text-center">{mostrar.produtosdescricao[x - 1]}</th>
                                    <th className="text-center">{mostrar.produtosquantidade[x - 1]}</th>
                                    <th className="text-center">{mostrar.produtosprecoitem[x - 1]}</th>
                                    <th className="text-center">{mostrar.produtospreco[x - 1]}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
export default FornecedorVisualizaProdutos;