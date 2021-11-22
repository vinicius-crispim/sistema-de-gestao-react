import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { type } from "os";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Cidade } from "types/cidade";
import { CotacaoCompra, CotacaoItem } from "types/cotacao";
import { Funcionario } from "types/funcionario";
import { Produto, ProdutoPage } from "types/produto";
import { BASE_URL } from "utils/request";

type TodosProdutos = {
    ids: number[];
    nomes: string[];
}

type TodosItens = {
    itenstodos: CotacaoItem[];
}

type teste = {
    id: number,
    quantidade: number,
    produto: Produto,
    cotacaocompra: CotacaoCompra;
}

let user = JSON.parse(localStorage.getItem('user') || '{}');
const CotacaoFeita = () => {
    let ids: number;
    const [cotacaocompra, setCotacao] = useState<CotacaoCompra>({ funcionario: user, id: 0 });
    const [cotacaocompraitem, setCotacaoCompraItem] = useState<CotacaoItem>({
        id: 0,
        cotacaocompra: cotacaocompra,
        produto: {
            id: 0,status:"",
            descrição: "",
            estoque: 0,
            nome: "",
            quantidademin: 0,
            categoria: {
                id: 0,
                nome: "",
            },
        },
        quantidade: 200
    });
    const [itensTodos, setItensTodos] = useState<TodosItens>({ itenstodos: [] })
    const [todosProdutos, setTodosProdutos] = useState<TodosProdutos>({ ids: [], nomes: [] });

let numeros : number[] = []
    useEffect(() => {
        axios.get(`${BASE_URL}/produtos/noPage`)
            .then(response => {

                const data = response.data as Produto[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.nome);
                setTodosProdutos({ ids: meusids, nomes: meusnomes });
                for (let index = 0; index < todosProdutos.ids.length; index++) {
                    numeros.push(index);
                    
                }
                console.log(data);
                console.log(todosProdutos);
                console.log("rodouu");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setCotacaoCompraItem({ ...cotacaocompraitem, [name]: value });
    }

    function acha(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log({ name, value });
        console.log("adsasdsds");
        axios.get(`${BASE_URL}/produtos/${value}`)
            .then((response) => {
                const data = response.data as Produto;
                console.log("PRODUTO")
                console.log({ data });
                setCotacaoCompraItem({ ...cotacaocompraitem, produto: data });
                console.log(cotacaocompraitem)
            });


    }
    let temporaria = 0;
    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(cotacaocompra.id);
        console.log(cotacaocompraitem);
        console.log(temporaria);

        axios.get(`${BASE_URL}/cotacoes`)
            .then((response) => {

                const data = response.data as CotacaoCompra[];
                ids = data.length + 1;
                console.log(`ID:${ids}`);
                console.log(data)
                cotacaocompra.id = ids;
        });

        setCotacaoCompraItem({ ...cotacaocompraitem, cotacaocompra: cotacaocompra })
        cotacaocompraitem.cotacaocompra = cotacaocompra;
        console.log(itensTodos.itenstodos);
        let aux1 = 0;
        let aux2 = 0;
        for (let index = 0; index < itensTodos.itenstodos.length; index++) {
            if (cotacaocompraitem.produto.id === itensTodos.itenstodos[index].produto.id) {
                aux1 += 1;
                aux2 = index
            }
        }
        if (aux1 === 1) {
            itensTodos.itenstodos[aux2].quantidade = cotacaocompraitem.quantidade;
        } else {
            itensTodos.itenstodos.push(cotacaocompraitem);
        }
        console.log(itensTodos)
    }
    function onSubmitFIM(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/cotacoes`, cotacaocompra)
            .then((response) => {
                console.log("COTACAO CRIADA");
                console.log(cotacaocompra);
                for (let index = 0; index < itensTodos.itenstodos.length; index++) {
                    axios.post(`${BASE_URL}/cotacaoitens`, itensTodos.itenstodos[index])
                        .then((response) => {
                            console.log("COTACAO ITEM CRIADA");
                            console.log(cotacaocompraitem);
                        });
                }
            });
        alert("Cotação enviada com sucesso");
        window.location.reload();
    }
    

    return (
        <>

            <div className="jumbotron d-grid col-7 mx-auto">
                <h1 className="display-4">Faça uma Cotação</h1><br />
            </div>
            <form onSubmit={onSubmit}>
                <div className="row py-2">
                    <div className="col">
                        <div className="promotion-form__group">
                            <label htmlFor="quantidade">Quantidade:</label>
                            <input className="form-control" type="number" id="quantidade" name="quantidade" onChange={onChange} />
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="produto">Produto:</label>
                        <select name="produto" className="form-select" aria-label="Default select example" onChange={acha}>
                            <option>Selecione</option>
                            {todosProdutos.ids.map(x => (
                                <option key={"produto" + x} value={x}>{todosProdutos.nomes[x-1]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="d-grid gap-3 col-2 mx-auto">
                    <button type="submit" className="btn btn-success btn-lg my-3 px-2  text-dark text-black " ><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>Adicionar</button>
                </div>
            </form>
            <hr />
            <div className="table-responsive">
                <table className="table table-striped table-md">
                    <thead>
                        <tr>
                            <th className="text-center text-primary">Nome</th>
                            <th className="text-center text-primary">Categoria</th>
                            <th className="text-center text-primary">Descrição</th>
                            <th className="text-center text-primary">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensTodos.itenstodos.map(x => (
                            <tr key={x.produto.id}>
                                <td className="text-center">{x.produto.nome}</td>
                                <td className="text-center">{x.produto.categoria.nome}</td>
                                <td className="text-center">{x.produto.descrição}</td>
                                <td className="text-center">{x.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={onSubmitFIM}>
                <div className="d-grid gap-3 col-3 mx-auto">
                    <button type="submit" className="btn btn-success btn-xx my-4 text-dark text-black "><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>Enviar cotação</button>
                </div>
            </form>
        </>
    );
}

export default CotacaoFeita;

