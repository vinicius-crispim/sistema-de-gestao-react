/* eslint-disable react/style-prop-object */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CotacaoItem } from 'types/cotacao';
import { Fornecedor } from 'types/fornecedor';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';
import { FornecedorCotacaoCompra, CotacaoCompra } from '../../types/cotacao';
import VerificaOrdem from '../VerificaOrdem/index';
import { OrdemCompra, OrdemCompraItem } from 'types/ordemcompra';
import { NotaFiscal, NotaFiscalItem } from 'types/notafiscal';

type Mostrar = {
    quantia: number[];
    produtosnome: string[];
    produtosquantidade: number[];
    produtosprecoitem: number[];
    produtospreco: number[]
}

let fornecedorstorage = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let ordemcomprastorage = JSON.parse(localStorage.getItem('ordemcompra') || '{}');


const VerificaOrdemCompra = () => {
    const [ordemcompra, setOrdemCompra] = useState<OrdemCompra>(ordemcomprastorage);
    const [mostrar, setMostrar] = useState<Mostrar>({ produtospreco: [], produtosprecoitem: [], produtosnome: [], produtosquantidade: [], quantia: [] })
    let p = 0;
    let aux: any = []
    useEffect(() => {
        axios.get(`${BASE_URL}/ordemcompras/${ordemcompra.id}`)
            .then(response => {

                const data = response.data as OrdemCompra;
                const nomes = data.ordemcompraitem.map(x => x.produto.nome)
                const precos = data.ordemcompraitem.map(x => x.preco);
                const produtosprecoitem2 = data.ordemcompraitem.map(x => x.precoitem);
                const produtosquantidade2 = data.ordemcompraitem.map(x => x.quantidade);
                for (let index = 0; index < data.ordemcompraitem.length; index++) {
                    p += 1
                    aux.push(p);
                }
                setMostrar({ produtosnome: nomes, produtospreco: precos, produtosprecoitem: produtosprecoitem2, produtosquantidade: produtosquantidade2, quantia: aux })

                console.log("A")
                console.log(mostrar);
            });


    }, []);
    const history = useHistory()
    const [notafiscal, setNotaFiscal] = useState<NotaFiscal>({ notaFiscalItem: [], num_pedido: 0, data: "", fornecedor: fornecedorstorage, funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" }, id: 0 }, id: 0, num_nota: 0, precoTotal: 0 })
    const [notafiscalitem, setNotaFiscalItem] = useState<NotaFiscalItem>({ id: 0, notaFiscal: notafiscal, preco: 0, precoitem: 0, produto: { categoria: { id: 0, nome: "" }, descrição: "", estoque: 0, id: 0, nome: "", quantidademin: 0 }, quantidade: 0 })
    function Conclui() {
        axios.post(`${BASE_URL}/ordemcompras/finaliza`, ordemcompra).then(response => {
            notafiscal.fornecedor = ordemcompra.fornecedor;
            notafiscal.funcionario = ordemcompra.funcionario;
            notafiscal.num_nota = Math.random() * (999999 - 100) - 100;
            notafiscal.num_pedido = ordemcompra.num_pedido;
            notafiscal.precoTotal = ordemcompra.preco;
            axios.post(`${BASE_URL}/notaFiscais`, notafiscal).then(response => {
                axios.get(`${BASE_URL}/notaFiscais`).then(response => {
                    const data = response.data as NotaFiscal[];
                    notafiscal.id = data.length;
                    console.log(notafiscal.id)
                    console.log("NOTA FISCAL CRIADA")
                    for (let index = 0; index < ordemcompra.ordemcompraitem.length; index++) {
                        notafiscalitem.notaFiscal = notafiscal;
                        notafiscalitem.preco = ordemcompra.ordemcompraitem[index].preco;
                        notafiscalitem.precoitem = ordemcompra.ordemcompraitem[index].precoitem;
                        notafiscalitem.produto = ordemcompra.ordemcompraitem[index].produto;
                        notafiscalitem.quantidade = ordemcompra.ordemcompraitem[index].quantidade;
                        axios.post(`${BASE_URL}/notaFiscalItems`, notafiscalitem).then(response => {
                            console.log(notafiscalitem);
                        })
                    }
                })
                console.log(notafiscal);
            })
        }
        )
        //history.push("/homefornecedor");
        //alert("Nota Fiscal gerada")
        //window.location.reload();
    }
    console.log(ordemcompra)
    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
            <li className="d-flex justify-content-between lh-sm list-group-item">
                <div className="col">
                    <h5>Aprovador: {ordemcompra.funcionario.nome}</h5>
                </div>
                <div className="mx-2 col text-center">
                    <h5>Email: {ordemcompra.funcionario.email}</h5>
                </div>
                <div className="col text-center">
                    <h5>Data: {ordemcompra.data}</h5>

                </div>
            </li>
            <li className="d-flex justify-content-between lh-sm list-group-item">
                <div className="col">
                    <h5>Fornecedor: {ordemcompra.fornecedor.nome}</h5>
                </div>
                <div className="col">
                    <h5>Cidade: {ordemcompra.fornecedor.cidade.nome}</h5>
                </div>
                <div className="col">
                    <h5>CNPJ: {ordemcompra.fornecedor.cnpj}</h5>
                </div>
                <div className="col">
                    <h5>Número da Ordem de Compra: {ordemcompra.id}</h5>

                </div>
            </li>
            <div className="table-responsive my-2">
                <table className="table table-striped table-light table-md table-hover align-middle caption-top">
                    <caption className="text-primary text-center">Detalhes da Ordem de Compra</caption>
                    <thead>
                        <tr>
                            <th className="text-center align-middle">Produto</th>
                            <th className="text-center align-middle">Quantidade Pedida</th>
                            <th className="text-center align-middle">Preço por item (R$)</th>
                            <th className="text-center align-middle">Preço (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostrar.quantia.map(x => (
                            <tr key={mostrar.quantia[x]}>
                                <th className="text-center ">{mostrar.produtosnome[x - 1]}</th>
                                <th className="text-center">{mostrar.produtosquantidade[x - 1]}</th>
                                <th className="text-center">{mostrar.produtosprecoitem[x - 1]}</th>
                                <th className="text-center">{mostrar.produtospreco[x - 1]}</th>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center align-middle">Valor Total:</th>
                            <th ></th>
                            <th></th>
                            <th className="text-center align-middle"> R${ordemcompra.preco}</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="row py-1">
                <div className="col text-center">
                    <button onClick={Conclui} type="submit" className=" btn btn-success btn-xx my-4">Concluir Compra</button>
                </div>
                <div className="col text-center">
                    <button type="submit" className="btn btn-danger btn-xx my-4">Rejeitar Compra</button>
                </div>
            </div>
        </>
    );
}
export default VerificaOrdemCompra;