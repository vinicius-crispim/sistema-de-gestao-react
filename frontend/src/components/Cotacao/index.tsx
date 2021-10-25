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
    /*
    
        const [values, setValues] = useState<CotacaoCompra>({
            id: 0,
            funcionario: {
                id: 0,
                nome: "",
                login: "",
                senha: "",
                email: "",
                telefone: "",
                tipo: {
                    id: 0,
                    tipo: "",
                },
            }
        });
    
        const [itensTodos, setItensTodos] = useState<TodosItens>({ itenstodos: [] })
    
        const [itens, setItens] = useState<CotacaoItem>({
            quantidade: 0,
            produto: {
                id: 0,
                descrição: "",
                estoque: 0,
                marca: "",
                nome: "",
                quantidademin: 0,
                categoria: {
                    id: 0,
                    nome: "",
                },
            },
            cotacao: {
                id: 0,
                funcionario: {
                    id: 0,
                    nome: "",
                    login: "",
                    senha: "",
                    email: "",
                    telefone: "",
                    tipo: {
                        id: 0,
                        tipo: "",
                    },
                }
            }
        })
    
        console.log(values);
        const history = useHistory();
    
        const [todosProdutos, setTodosProdutos] = useState<TodosProdutos>({ ids: [], nomes: [] });
    
        useEffect(() => {
            axios.get(`${BASE_URL}/produtos/noPage`)
                .then(response => {
    
                    const data = response.data as Produto[];
                    const meusids = data.map(x => x.id);
                    const meusnomes = data.map(x => x.nome);
                    setTodosProdutos({ ids: meusids, nomes: meusnomes });
                    console.log(data);
                    console.log(todosProdutos);
                    console.log("rodouu");
                });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    
        function onChange(event: { target: { name: any; value: any; }; }) {
            const { name, value } = event.target;
    
            console.log({ name, value });
            setItens({ ...itens, [name]: value });
        }
    
        const [produtovar, setProduto] = useState<Produto>({
            id: 0,
            descrição: "",
            estoque: 0,
            marca: "",
            nome: "",
            quantidademin: 0,
            categoria: {
                id: 0,
                nome: "",
            },
        })
    
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
                    setItens({ ...itens, produto: data });
                    console.log(itens)
                });
            setValues({ ...values, funcionario: user });
        }
    
        const [cotaconta, setConta] = useState(1);
        const [aux, setAux] = useState(1);
    
        function onSubmit(event: { preventDefault: () => void; }) {
            event.preventDefault();
            setConta(cotaconta + 1);
    
    
            console.log("AAAAAAAa");
            console.log(values);
            console.log(cotaconta);
            let ids
            if (cotaconta === 1) {
                axios.post(`${BASE_URL}/cotacoes`, values)
                    .then((response) => {
                        console.log("COTACAO CRIADA");
                        console.log(values);
                    });
                axios.get(`${BASE_URL}/cotacoes`)
                    .then((response) => {
                        const data = response.data as CotacaoCompra[];
                        ids = data.length + 1;
                        console.log(`ID:${ids}`);
                        setValues({ ...values, id: ids });
    
                    });
            }
            setItens({ ...itens, cotacao: values });
    
            itensTodos.itenstodos.push(itens);
            setAux(aux + 1);
            console.log("COTACAO");
            console.log(values);
            console.log("item");
            console.log(itens);
            console.log(itensTodos);
    
    
        }
    
        function onSubmitfinal(event: { preventDefault: () => void; }) {
            event.preventDefault();
            console.log(itens);
    
            for (let index = 3; index < itensTodos.itenstodos.length; index++) {
                    axios.post(`${BASE_URL}/cotacaoitens`, itensTodos.itenstodos[index])
                        .then((response) => {
                            console.log("COTACAO ITEM CRIADA");
                        });
                        console.log(itensTodos.itenstodos[index]);
            }
    
        } */
    /*const [values, setValues] = useState<CotacaoCompra>({
        id: 0,
        funcionario: {
            id: 0,
            nome: "",
            login: "",
            senha: "",
            email: "",
            telefone: "",
            tipo: {
                id: 0,
                tipo: "",
            },
        }
    });

    const [todosProdutos, setTodosProdutos] = useState<TodosProdutos>({ ids: [], nomes: [] });

    const [itens, setItens] = useState<teste>({
        id: 0,
        quantidade: 0,
        produto: {
            id: 0,
            descrição: "",
            estoque: 0,
            marca: "",
            nome: "",
            quantidademin: 0,
            categoria: {
                id: 0,
                nome: "",
            },
        },
        cotacaocompra: {
            id: 0,
            funcionario: {
                id: 0,
                nome: "",
                login: "",
                senha: "",
                email: "",
                telefone: "",
                tipo: {
                    id: 0,
                    tipo: "",
                },
            }
        }
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/produtos/noPage`)
            .then(response => {

                const data = response.data as Produto[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.nome);
                setTodosProdutos({ ids: meusids, nomes: meusnomes });
                console.log(data);
                console.log(todosProdutos);
                console.log("rodouu");
            });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setItens({ ...itens, [name]: value });
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
                setItens({ ...itens, produto: data });
                console.log(itens)
            });
        <label htmlFor="produto">Produto:</label>
                            <select name="produto" className="form-select" aria-label="Default select example" onChange={acha}>
                              //  <option>Selecione</option>
                                //{todosProdutos.ids.map(x => (
                                    <option key={"produto" + x} value={x}>{todosProdutos.nomes[x - 1]}</option>
                                ))}
                            </select>

    }

    const [cotaconta, setConta] = useState(1);
    const [aux, setAux] = useState(1);*/
    let ids: number;
    const [cotacaocompra, setCotacao] = useState<CotacaoCompra>({ funcionario: user, id: 0 });
    const [cotacaocompraitem, setCotacaoCompraItem] = useState<CotacaoItem>({
        id: 0,
        cotacaocompra: cotacaocompra,
        produto: {
            id: 0,
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
    let aux = 0;

    useEffect(() => {
        axios.get(`${BASE_URL}/produtos/noPage`)
            .then(response => {

                const data = response.data as Produto[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.nome);
                setTodosProdutos({ ids: meusids, nomes: meusnomes });
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

    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(cotacaocompra);
        console.log(cotacaocompraitem);
        aux = aux + 1;


        if (aux === 1) {
            axios.get(`${BASE_URL}/cotacoes`).then((response) => {
                const data = response.data as CotacaoCompra[];
                ids = data.length+1;
                console.log(`ID:${ids}`);
                cotacaocompra.id = ids;
            })
        }
        setCotacaoCompraItem({...cotacaocompraitem,})
        itensTodos.itenstodos.push(cotacaocompraitem)
        console.log(itensTodos.itenstodos);

    }
    function onSubmitFIM(event: { preventDefault: () => void; }) {
        event.preventDefault();
        axios.post(`${BASE_URL}/cotacoes`, cotacaocompra)
                .then((response) => {
                    console.log("COTACAO ITEM CRIADA");
                    console.log(cotacaocompra);
                });
        for (let index = 0; index < itensTodos.itenstodos.length; index++) {
            axios.post(`${BASE_URL}/cotacaoitens`, itensTodos.itenstodos[index])
                .then((response) => {
                    console.log("COTACAO ITEM CRIADA");
                    console.log(cotacaocompraitem);
                });
        }
    }

    return (
        <>

            <div className="jumbotron d-grid col-11 mx-auto">
                <h1 className="display-4">Insira as informações do pedido</h1><br />
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
                                <option key={"produto" + x} value={x}>{todosProdutos.nomes[x - 1]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="d-grid gap-3 col-2 mx-auto">
                    <button type="submit" className="btn btn-success btn-lg my-4" >Adicionar</button>
                </div>
            </form>
            <hr />
            <div className="table-responsive">
                <table className="table table-striped table-md">
                    <thead>
                        <tr>
                            <th className="text-center text-primary">Nome</th>
                            <th className="text-center text-primary">Categoria</th>
                            <th className="text-center text-primary">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensTodos.itenstodos.map(x => (
                            <tr key={x.produto.id}>
                                <td className="text-center">{x.produto.nome}</td>
                                <td className="text-center">{x.produto.categoria.nome}</td>
                                <td className="text-center">{x.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={onSubmitFIM}>
                <div className="d-grid gap-3 col-2 mx-auto">
                    <button type="submit" className="btn btn-success btn-xx my-4">Enviar cotação</button>
                </div>
            </form>
        </>
    );
}

export default CotacaoFeita;

