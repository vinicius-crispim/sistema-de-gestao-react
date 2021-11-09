/* eslint-disable react/style-prop-object */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CotacaoItem } from 'types/cotacao';
import { Fornecedor } from 'types/fornecedor';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';
import { FornecedorCotacaoCompra, CotacaoCompra } from '../../types/cotacao';

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    list: CotacaoItem[];
    data?: Date;
}

type TodosItens = {
    todos: CotacaoItem[];
}

type TodasRespostas = {
    todasrespostas: Resposta[];
}


type Mostrar = {
    quantia: number[];
    produtosnome: string[];
    produtosquantidade: number[];
    produtosids: number[];
}

let fornecedorstorage = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let cotacao = JSON.parse(localStorage.getItem('respostafornecedor') || '{}');

type Resposta = {
    preco: number;
    fornecedor: Fornecedor;
    cotacaocompraitem: CotacaoItem;
    precoitem: number;
    fornecedorCotacaocompra: FornecedorCotacaoCompra;
}

const FornecedorVisualizaProdutos = () => {

    const [todositens, setTodosItens] = useState<TodosItens>({ todos: [] });
    const [mostrar, setMostrar] = useState<Mostrar>({ produtosnome: [], produtosquantidade: [], quantia: [], produtosids: [] });

    const [fornecedorcotacaocompra, setFornecedorCotacaoCompra] = useState<FornecedorCotacaoCompra>({
        cotacaocompra: {
            funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" } }
            , id: 0
        }, fornecedor: { cidade: { id: 0, nome: "" }, cnpj: "", email: "", login: "", nome: "", senha: "" }, status: "Pendente", id: 0
    })

    let aux: any = [];
    let p = 0;
    useEffect(() => {
        axios.get(`${BASE_URL}/cotacoes/${cotacao.id}`)
            .then(response => {

                const data = response.data as CotacaoTeste;
                setTodosItens({ ...todositens, todos: data.list });
                console.log("COTACAO:");
                console.log(data);
                const ids = data.list.map(x => x.id);
                const a = data.list.map(x => x.produto.nome);
                const b = data.list.map(x => x.quantidade);
                const idcotaitem = data.id
                console.log(a);
                console.log(b);
                console.log(ids);
                for (let index = 1; index <= data.list.length; index++) {
                    p += 1;
                    console.log(p);
                    aux.push(p);
                }
                setMostrar({ produtosids: ids, quantia: aux, produtosnome: a, produtosquantidade: b })
                console.log("MOSTRA");
                console.log(mostrar);

            });


    }, []);
    const [cotacaocompraitem, setCotacaoCompraItem] = useState<CotacaoItem>({ id: 0, cotacaocompra: cotacao, produto: { categoria: { id: 0, nome: "" }, descrição: "", estoque: 0, id: 0, nome: "", quantidademin: 0 }, quantidade: 0 })
    const history = useHistory();

    const [resposta, setResposta] = useState<Resposta>({ fornecedorCotacaocompra: { cotacaocompra: cotacao, fornecedor: fornecedorstorage, status: "Pendente", id: 0 }, fornecedor: fornecedorstorage, cotacaocompraitem: { quantidade: 0, cotacaocompra: cotacao, id: 0, produto: { categoria: { id: 0, nome: "" }, descrição: "", estoque: 0, nome: "", quantidademin: 0, id: 0 } }, preco: 0, precoitem: 0 });
    const [todasrespostas, setTodasRespostas] = useState<TodasRespostas>({ todasrespostas: [] })
    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        resposta.precoitem = value;
        console.log(resposta)

    }
    let ids: number
    function onSubmit(event: any) {
        event.preventDefault();
        const { name, value } = event.target
        axios.get(`${BASE_URL}/cotacaoitens/${value}`).then(response => {
            const data = response.data as CotacaoItem;
            console.log("FOI");
            console.log(data);
            const idcotaitem = data.id;
            const a = data.cotacaocompra;
            const b = data.produto;
            const c = data.quantidade;
            setCotacaoCompraItem({ id: idcotaitem, cotacaocompra: a, produto: b, quantidade: c })
            cotacaocompraitem.id = idcotaitem;
            cotacaocompraitem.produto = b;
            cotacaocompraitem.quantidade = c;
            cotacaocompraitem.cotacaocompra = a;
            resposta.cotacaocompraitem = cotacaocompraitem;
            console.log(idcotaitem)
            console.log(cotacaocompraitem);
            resposta.preco = resposta.cotacaocompraitem.quantidade * resposta.precoitem;
            setResposta({ ...resposta, fornecedor: fornecedorstorage })
            console.log(resposta);
            axios.get(`${BASE_URL}/fornecedorcotacaocompras`).then(response => {
                const data = response.data as FornecedorCotacaoCompra[];
                let id = data.length;
                fornecedorcotacaocompra.id = id;
                console.log(id)
                resposta.fornecedorCotacaocompra = fornecedorcotacaocompra;
                console.log(resposta)
                axios.post(`${BASE_URL}/respostafornecedor`, resposta).then(response => {
                    alert("RESPOSTA ENVIADA");
                    console.log("TESTE")
                    console.log(resposta);
                    todasrespostas.todasrespostas.push(resposta);
                })
            })

        })
    }

    const [cotacaocompra, setCotacao] = useState<CotacaoCompra>({ funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" } }, id: 0 });

    function onSubmitFIM(event: { preventDefault: () => void; }) {
        event.preventDefault();
        let cotacaotemp: CotacaoTeste;
        cotacaotemp = cotacao;
        fornecedorcotacaocompra.cotacaocompra.data = cotacaotemp.data;
        fornecedorcotacaocompra.cotacaocompra.funcionario = cotacaotemp.funcionario;
        fornecedorcotacaocompra.cotacaocompra.id = cotacaotemp.id;
        fornecedorcotacaocompra.fornecedor = fornecedorstorage;
        axios.post(`${BASE_URL}/fornecedorcotacaocompras`, fornecedorcotacaocompra).then(response => {
            console.log("COTACAOCOMPRAFOR");
            console.log(fornecedorcotacaocompra);
            console.log(cotacaocompra);
            resposta.fornecedorCotacaocompra = fornecedorcotacaocompra;
        });


    }

    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
            <div className="card">
                <li className="d-flex justify-content-between lh-sm list-group-item">
                    <div className="col">
                        <h5>Autor: {cotacao.funcionario.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Email: {cotacao.funcionario.email}</h5>
                    </div>
                </li>
                {mostrar.quantia.map(x => (
                    <li className="d-flex justify-content-between lh-xx list-group-item" key={x}>
                        <div className="col">
                            <h5 className="my-2">Produto: {mostrar.produtosnome[x - 1]}</h5>
                        </div>
                        <div className="col">
                            <h5 className="my-2">Quantidade: {mostrar.produtosquantidade[x - 1]}</h5>
                        </div>
                        <div className="col">
                            <input placeholder="Preço de uma unidade" className="form-control-sm my-2" type="number" step="0.01" id="precoitem" name="precoitem" onChange={onChange} />
                        </div>
                        <div className="col">
                            <button type="submit" value={mostrar.produtosids[x - 1]} onClick={onSubmit} className="btn btn-success btn my-2 mx-5">Responder</button>
                        </div>
                    </li>
                ))}
                <form onSubmit={onSubmitFIM}>
                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="btn btn-success btn-xx my-4">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default FornecedorVisualizaProdutos;