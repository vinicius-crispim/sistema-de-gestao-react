/* eslint-disable no-const-assign */
/* eslint-disable react/style-prop-object */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FornecedorCotacaoCompraSelect } from 'types/cotacao';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';
import { OrdemCompra, OrdemCompraItem } from '../../types/ordemcompra';

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
    const [user] = useState<Funcionario>(userstorage)
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
                    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const [ordemcompra] = useState<OrdemCompra>({
        fornecedor: { cidade: { id: 0, nome: "" }, cnpj: "", email: "", login: "", nome: "", senha: "" }, funcionario: userstorage, preco: 0,
        ordemcompraitem: []
    });

    const [ordemcompraitem] = useState<OrdemCompraItem>({ preco: 0, precoitem: 0, produto: { categoria: { id: 0, nome: "" }, descrição: "", estoque: 0, id: 0, nome: "", quantidademin: 0 }, quantidade: 0 })
    function Aprova() {
        console.log(fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra)

        axios.post(`${BASE_URL}/cotacoes/finaliza`, fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra).then(response => {
            console.log(fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra)
            alert("COTACAO FINALIZADA")
            console.log(fornecedorCotacaoCompra)
            ordemcompra.preco = total
            ordemcompra.fornecedor = fornecedorCotacaoCompra.fornecedor;
            ordemcompra.funcionario = userstorage;
            axios.post(`${BASE_URL}/ordemcompras`, ordemcompra).then(response => {
                axios.get(`${BASE_URL}/ordemcompras`).then(response => {
                    const data = response.data as OrdemCompra[];
                    ordemcompra.id = data.length;
                    console.log(ordemcompra.id)
                    console.log("ORDEM CRIADA")
                    for (let index = 0; index < fornecedorCotacaoCompra.fornecedorcotacaocompraitem.length; index++) {
                        ordemcompraitem.precoitem = fornecedorCotacaoCompra.fornecedorcotacaocompraitem[index].precoitem;
                        ordemcompraitem.produto = fornecedorCotacaoCompra.fornecedorcotacaocompraitem[index].cotacaocompraitem.produto;
                        ordemcompraitem.quantidade = fornecedorCotacaoCompra.fornecedorcotacaocompraitem[index].cotacaocompraitem.quantidade;
                        ordemcompraitem.preco = fornecedorCotacaoCompra.fornecedorcotacaocompraitem[index].preco;
                        ordemcompraitem.ordemcompra = ordemcompra;
                        console.log(ordemcompraitem);
                        axios.post(`${BASE_URL}/ordemcompraitems`, ordemcompraitem).then(response => {
                            console.log("FOI");
                        })
                    }
                })

            })
        })
        alert("Ordem de Compra enviada com sucesso!")
        

    }

    if (user.tipo.tipo !== "Gerente") {

        return (
            <>
                <h3 className="text-center">Veja os detalhes do pedido:</h3>
                <li className="d-flex justify-content-between lh-sm list-group-item">
                    <div className="col">
                        <h5>Fornecedor: {fornecedorCotacaoCompra.fornecedor.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Email: {fornecedorCotacaoCompra.fornecedor.email}</h5>
                    </div>
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item">
                    <div className="col">
                        <h5>CNPJ: {fornecedorCotacaoCompra.fornecedor.cnpj}</h5>
                    </div>
                    <div className="col">
                        <h5>Cidade: {fornecedorCotacaoCompra.fornecedor.cidade.nome}</h5>
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
                <h3 className="text-center my-3">Somente o gerente poderá aprovar esta compra</h3>

            </>
        );
    }
    else {
        return (
            <>
                <h3 className="text-center">Veja os detalhes do pedido:</h3>
                    <li className="d-flex justify-content-between lh-sm list-group-item">
                        <div className="col">
                            <h5>Autor: {fornecedorCotacaoCompra.fornecedor.nome}</h5>
                        </div>
                        <div className="col">
                            <h5>Email: {fornecedorCotacaoCompra.fornecedor.email}</h5>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between lh-sm list-group-item">
                        <div className="col">
                            <h5>CNPJ: {fornecedorCotacaoCompra.fornecedor.cnpj}</h5>
                        </div>
                        <div className="col">
                            <h5>cidade: {fornecedorCotacaoCompra.fornecedor.cidade.nome}</h5>
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