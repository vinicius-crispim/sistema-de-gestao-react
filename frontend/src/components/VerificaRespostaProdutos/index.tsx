/* eslint-disable no-const-assign */
/* eslint-disable react/style-prop-object */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FornecedorCotacaoCompraSelect } from 'types/cotacao';
import { Funcionario } from 'types/funcionario';
import { NotaFiscal } from 'types/notafiscal';
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
let temnotastorage = JSON.parse(localStorage.getItem('temnota') || '{}');
let idnotastorage = JSON.parse(localStorage.getItem('idnota') || '{}');


const FornecedorVisualizaProdutos = () => {
    const [fornecedorCotacaoCompra] = useState<FornecedorCotacaoCompraSelect>(fornecedorCotacaoComprastorage)
    const [mostrar, setMostrar] = useState<Mostrar>({ produtospreco: [], produtosnome: [], produtosquantidade: [], quantia: [], produtosprecoitem: [], produtosdescricao: [] });
    const [user] = useState<Funcionario>(userstorage)
    console.log(fornecedorCotacaoComprastorage)
    let aux: any = [];
    let p = 0;
    let idnota = idnotastorage;
    let temnota = temnotastorage;
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
                console.log(fornecedorCotacaoCompra);

            });


    }, []);
    const history = useHistory();
    let total: number = 0
    for (let index = 0; index < mostrar.quantia.length; index++) {
        total += mostrar.produtospreco[index]
    }

    const [ordemcompra] = useState<OrdemCompra>({
        num_pedido: 0,
        fornecedor: { cidade: { id: 0, nome: "" }, cnpj: "", email: "", login: "", nome: "", senha: "" }, funcionario: userstorage, preco: 0,
        ordemcompraitem: []
    });

    const [ordemcompraitem] = useState<OrdemCompraItem>({ preco: 0, precoitem: 0, produto: { status:"",categoria: { id: 0, nome: "" }, descrição: "", estoque: 0, id: 0, nome: "", quantidademin: 0 }, quantidade: 0 })
    function Aprova() {
        console.log(fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra)

        axios.post(`${BASE_URL}/cotacoes/finaliza`, fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra).then(response => {
            console.log(fornecedorCotacaoCompra.fornecedorcotacaocompraitem[0].cotacaocompraitem.cotacaocompra)
            console.log(fornecedorCotacaoCompra)
            ordemcompra.preco = total + fornecedorCotacaoCompra.frete;
            ordemcompra.fornecedor = fornecedorCotacaoCompra.fornecedor;
            ordemcompra.funcionario = userstorage;
            ordemcompra.num_pedido = fornecedorCotacaoCompra.num_pedido;
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
                    alert("Ordem de Compra enviada com sucesso!")
                    history.push("/home");
                    window.location.reload();
                })

            })
        })

    }
    function Abrenota() {
        axios.get(`${BASE_URL}/notaFiscais/${idnota}`)
            .then(response => {

                const data = response.data as NotaFiscal;
                localStorage.removeItem("notafiscal");
                localStorage.setItem('notafiscal', JSON.stringify(data));

                let bemvindo = JSON.parse(localStorage.getItem('notafiscal') || '{}');
                console.log(bemvindo);
                history.push("/notafiscal");
                window.location.reload();

            });
    }
    console.log(`TemNOTA fora ${temnota}`)
    console.log(`ID fora ${idnota}`)
    if (temnota === 12) {
        console.log("122")
        if (user.tipo.tipo !== "Gerente") {

            return (
                <>
                    <h3 className="text-center">Veja os detalhes da resposta:</h3>
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
                                    <th className="text-center align-middle">Preço por item (R$)</th>
                                    <th className="text-center align-middle">Preço total (R$)</th>
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
                                    <th></th>
                                    <th>Frete: R${fornecedorCotacaoCompra.frete}</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th ></th>
                                    <th className="text-center align-middle">Valor Total:</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">R${total + fornecedorCotacaoCompra.frete}</th>
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
                                    <th className="text-center align-middle">Frete:</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">{fornecedorCotacaoCompra.frete}</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Total:</th>
                                    <th ></th>

                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">{total+fornecedorCotacaoCompra.frete}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="row py-1">
                        <div className="col text-center">
                            <button onClick={Aprova} type="submit" className=" btn text-dark text-black btn-success btn-xx my-4"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>Efetuar Compra</button>
                        </div>
                        <div className="col text-center">
                            <button type="submit" className="btn text-dark text-black btn-danger btn-xx my-4"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>Rejeitar Compra</button>
                        </div>
                    </div>
                </>
            );
        }
    }
    else {
        if (user.tipo.tipo !== "Gerente") {

            return (
                <>
                    <h3 className="text-center">Veja os detalhes da resposta:</h3>
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
                                    <th></th>
                                    <th>Frete:{fornecedorCotacaoCompra.frete}</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th ></th>
                                    <th className="text-center align-middle">Valor Total:</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">{total+fornecedorCotacaoCompra.frete}</th>
                                </tr>
                            </thead>
                           
                        </table>

                    </div>
                    <div className="row ">
                        <div className="col text-center">
                            <button onClick={Abrenota} type="submit" className=" btn btn-primary btn-xx">Visualizar Nota Fiscal</button>
                        </div>
                    </div>
                    <div className="my-5"></div>
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
                                    <th className="text-center align-middle">Frete:</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">{fornecedorCotacaoCompra.frete}</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Total:</th>
                                    <th ></th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center align-middle">{total+fornecedorCotacaoCompra.frete}</th>
                                </tr>
                            </thead>
                           
                        </table>
                    </div>
                    <div className="row ">
                        <div className="col text-center">
                            <button onClick={Abrenota} type="submit" className=" btn btn-primary btn-xx">Visualizar Nota Fiscal</button>
                        </div>
                    </div>
                    <div className="my-5"></div>
                </>
            );
        }
    }
}
export default FornecedorVisualizaProdutos;