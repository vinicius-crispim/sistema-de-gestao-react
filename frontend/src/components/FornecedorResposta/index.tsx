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

type TodasRespostas = {
    respostastodas: Resposta[];
}

const FornecedorVisualizaProdutos = () => {

    const [todositens, setTodosItens] = useState<TodosItens>({ todos: [] });
    const [mostrar, setMostrar] = useState<Mostrar>({ produtosnome: [], produtosquantidade: [], quantia: [], produtosids: [] });

    const [fornecedorcotacaocompra, setFornecedorCotacaoCompra] = useState<FornecedorCotacaoCompra>({
        frete: 0, dataEntrega: "", precototal: 0, cotacaocompra: {
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
    const [cotacaocompraitem, setCotacaoCompraItem] = useState<CotacaoItem>({ id: 0, cotacaocompra: cotacao, produto: { categoria: { id: 0, nome: "" }, descri????o: "", estoque: 0, id: 0, nome: "", quantidademin: 0,status:"" }, quantidade: 0 })
    const history = useHistory();

    const [resposta, setResposta] = useState<Resposta>({ fornecedorCotacaocompra: { dataEntrega: "", cotacaocompra: cotacao, precototal: 0, frete: 0, fornecedor: fornecedorstorage, status: "Pendente", id: 0 }, fornecedor: fornecedorstorage, cotacaocompraitem: { quantidade: 0, cotacaocompra: cotacao, id: 0, produto: { status:"",categoria: { id: 0, nome: "" }, descri????o: "", estoque: 0, nome: "", quantidademin: 0, id: 0 } }, preco: 0, precoitem: 0 });
    const [todasrespostas, setTodasRespostas] = useState<TodasRespostas>({ respostastodas: [] })
    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        resposta.precoitem = value;
        console.log(resposta)

    }
    function onChangeFrete(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        fornecedorcotacaocompra.frete = value;
        console.log(resposta)

    }
    function onChangedias(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        let temp: String = `${value} dias ??teis`
        console.log({ name, value });
        fornecedorcotacaocompra.dataEntrega = temp;

    }
    let total: number
    let freteantigo: number
    function onSubmit(event: any) {
        event.preventDefault();
        const { name, value } = event.target
        let id = parseInt(value)
        axios.get(`${BASE_URL}/cotacaoitens/${id}`).then(response => {
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
                let id = data.length + 1;
                fornecedorcotacaocompra.id = id;
                console.log(id)
                resposta.fornecedorCotacaocompra = fornecedorcotacaocompra;
                console.log(resposta)
                fornecedorcotacaocompra.precototal += resposta.preco;
                /* axios.post(`${BASE_URL}/respostafornecedor`, resposta).then(response => {
                     alert("RESPOSTA ENVIADA");
                     total += resposta.precoitem
                     fornecedorcotacaocompra.precototal +=resposta.preco;
                     console.log("TESTE")
                     todasrespostas.respostastodas.push(resposta);
                 })*/
                console.log(resposta);
                todasrespostas.respostastodas.push(resposta)
                console.log(todasrespostas);

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
        fornecedorcotacaocompra.num_pedido = Math.random() * (9999 - 100) - 100
        axios.post(`${BASE_URL}/fornecedorcotacaocompras`, fornecedorcotacaocompra).then(response => {
            console.log("COTACAOCOMPRAFOR");
            console.log(fornecedorcotacaocompra);
            console.log(cotacaocompra);
            for (let index = 0; index < todasrespostas.respostastodas.length; index++) {
                todasrespostas.respostastodas[index].fornecedorCotacaocompra = fornecedorcotacaocompra
                axios.post(`${BASE_URL}/respostafornecedor`, todasrespostas.respostastodas[index]).then(response => {
                    console.log(todasrespostas.respostastodas[index]);
                });
                console.log(todasrespostas.respostastodas[index]);

            }
            history.push("/homefornecedor");
            alert("Resposta enviada com sucesso")
            window.location.reload();
        });


    }

    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
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
                        <input placeholder="Pre??o de uma unidade" className="form-control-sm my-2" type="number" step="0.01" id="precoitem" name="precoitem" onChange={onChange} />
                    </div>
                    <div className="col">
                        <button type="submit" value={mostrar.produtosids[x - 1]} onClick={onSubmit} className="btn text-dark text-black  btn-success btn my-2 mx-4"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>Adicionar</button>
                    </div>
                </li>
            ))}
            <li className="d-flex justify-content-between lh-xx list-group-item">
                <div className="col">
                    <h5>Valor total:</h5>
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
                <div className=" col">
                    <h5>R${fornecedorcotacaocompra.precototal + resposta.preco}</h5>
                </div>
            </li>
            <li className="d-flex justify-content-between lh-xx list-group-item">

                <div className="col my-4 mx-4">
                    <h5>Frete:</h5>
                    <input placeholder="Valor do frete" className="form-control-sm my-2" type="number" step="0.01" id="frete" name="frete" onChange={onChangeFrete} />
                </div>
                <div className="col mx-4">
                    <h5>Previs??o de quantos dias ??teis para entregar:</h5>
                    <input placeholder="Previs??o de dias pra entregar" className="form-control-sm my-2" type="number" id="dataentrega" name="dataentrega" onChange={onChangedias} />
                </div>
            </li>

            <form onSubmit={onSubmitFIM}>
                <div className="d-grid gap-3 col-2 mx-auto">
                    <button type="submit" className="btn btn-success btn-xx my-4 text-dark text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                        Enviar</button>
                </div>
            </form>
        </>
    );
}
export default FornecedorVisualizaProdutos;