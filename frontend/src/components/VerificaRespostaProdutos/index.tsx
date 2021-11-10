/* eslint-disable no-const-assign */
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
let userstorage = JSON.parse(localStorage.getItem('user') || '{}');

let fornecedorCotacaoComprastorage = JSON.parse(localStorage.getItem('fornecedorcotacaocompra2') || '{}');


const FornecedorVisualizaProdutos = () => {
    const [fornecedorCotacaoCompra] = useState<FornecedorCotacaoCompraSelect>(fornecedorCotacaoComprastorage)
    const [mostrar, setMostrar] = useState<Mostrar>({ produtospreco: [], produtosnome: [], produtosquantidade: [], quantia: [], produtosprecoitem: [], produtosdescricao: [] });
    const [user, setUser] = useState<Funcionario>(userstorage)
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
    let total: number = 0
    for (let index = 0; index < mostrar.quantia.length; index++) {
        total += mostrar.produtospreco[index]
    }
    const [cotacaocompra, setCotacao] = useState<CotacaoCompra>({ funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" } }, id: 0 });


function Aprova() {
    console.log(fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra)

    axios.post(`${BASE_URL}/cotacoes/finaliza`,fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra).then(response => {
        console.log(fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra)
        alert("COTACAO FINALIZADA")
    })
}

    if (user.tipo.tipo !== "Gerente") {

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
                    <div className="table-responsive my-2">
                        <table className="table table-striped table-light table-md table-hover align-middle caption-top">
                            <caption className="text-primary text-center">Detalhes da resposta</caption>
                            <thead>
                                <tr>
                                <th className="text-center align-middle">Produto</th>
                                <th className="text-center align-middle">Descrição</th>
                                <th className="text-center align-middle">Quantidade Pedida</th>
                                <th className="text-center align-middle">Preço por item</th>
                                <th className="text-center align-middle">Preço total</th>
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
                            <thead>
                                <tr>
                                    <th ></th>
                                    <th className="text-center align-middle">Valor Total:</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">{total}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                </div>
                <h3 className="text-center my-3">Somente o gerente poderá aprovar esta compra</h3>

            </>
        );
    }
    else {
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
                </div>

                <div className="table-responsive my-2">
                    <table className="table table-striped table-light table-md table-hover align-middle caption-top">
                        <caption className="text-primary text-center">Detalhes da resposta</caption>
                        <thead>
                            <tr>
                                <th className="text-center align-middle">Produto</th>
                                <th className="text-center align-middle">Descrição</th>
                                <th className="text-center align-middle">Quantidade Pedida</th>
                                <th className="text-center align-middle">Preço por item</th>
                                <th className="text-center align-middle">Preço total</th>
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
                        <thead>
                            <tr>
                                <th ></th>
                                <th className="text-center align-middle">Valor Total:</th>
                                <th></th>
                                <th></th>
                                <th className="text-center align-middle">{total}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="row py-1">
                    <div className="col text-center">
                        <button onClick={Aprova} type="submit" className=" btn btn-success btn-xx my-4">Efetuar Compra</button>
                    </div>
                    <div className="col text-center">
                        <button type="submit" className="btn btn-danger btn-xx my-4">Rejeitar Compra</button>
                    </div>
                </div>
            </>
        );
    }
}
export default FornecedorVisualizaProdutos;