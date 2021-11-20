import axios from "axios";
import AlteraProduto from "components/AlteraProduto";
import CadastroProduto from "components/CadastroProduto";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Categoria, ProdutoPage } from "types/produto";
import { parseJsonText } from "typescript";
import { BASE_URL } from "utils/request";
import { Produto } from '../../types/produto';

let prod = JSON.parse(localStorage.getItem('produtotemp') || '{}');

type TodasCategoria = {
    ids: number[],
    nomes: string[],
}


const VisualizarProduto = () => {
    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: "",
        descrição: "",
        quantidademin: 0,
        estoque: 0,
        categoria: {
            id: 0,
            nome: "",
        },status:""
    });

    useEffect(() => {
        setProduto(prod);
        console.log(produto);
        console.log(prod);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const history = useHistory();


    function onSubmit(event: any) {
        history.push("/estoque")
    }
    type TodasCategoria = {
        ids: number[],
        nomes: string[],
    }

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: "",
    });


    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setProduto({ ...produto, [name]: value });
    }
    function deletar(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(produto)
        axios.post(`${BASE_URL}/produtos/invalida`, produto)
            .then((response) => {
                alert("PRODUTO INVALIDADO COM SUCESSO");
                history.push("/estoque");
                window.location.reload();
                console.log(produto)
            });
    }


    function onSubmitAltera(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/produtos`, produto)
            .then((response) => {
                alert("PRODUTO ALTERADO COM SUCESSO");
                history.push("/estoque");
                window.location.reload();
            });


    }

    const [todasCategorias, setTodasCategorias] = useState<TodasCategoria>({ ids: [], nomes: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/categorias`)
            .then(response => {

                const data = response.data as Categoria[];
                const meusnomes = data.map(x => x.nome);
                const meusids = data.map(x => x.id);
                setTodasCategorias({ ids: meusids, nomes: meusnomes });

                console.log(response.data);
                console.log(todasCategorias);
                console.log("rodouu");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function acha(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log({ name, value });
        console.log("adsasdsds");
        setCategoria({ ...categoria, [name]: value });
        axios.get(`${BASE_URL}/categorias/${value}`)
            .then((response) => {
                const data = response.data as Categoria;
                console.log({ data });
                setProduto({ ...produto, [name]: data });
            });
    }

    

    return (
        <>

            <h3 className="text-center">Veja os detalhes do produto</h3>
            <div className="card">
                <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                    <div className="col text-center ">
                        <h5>ID: {prod.id}</h5>
                    </div>
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                    <div className="col">
                        <h5>Nome:</h5>
                        <input placeholder={prod.nome} className="form-control" type="text" id="nome" name="nome" onChange={onChange}></input>
                    </div>
                    <div className="col">
                        <h5>Categoria:</h5>
                        <select name="categoria" className="form-select mx-2" aria-label="Default select example" onChange={acha}>
                            <option >Selecione</option>
                            {todasCategorias.ids.map(x => (
                                <option key={"categoria" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                            ))}
                        </select>
                    </div>
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                    <div className="col">
                        <h5>Quantidade Minima: </h5>
                        <input placeholder={produto.quantidademin.toString()} className="form-control" type="number" id="quantidademin" name="quantidademin" onChange={onChange} />
                    </div>
                    <div className="col">
                        <h5>Quantidade em Estoque:</h5>
                        <input placeholder={produto.estoque.toString()} className="form-control mx-2" type="number" id="estoque" name="estoque" onChange={onChange} />
                    </div>

                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                    <div className="col">
                        <h5>Descrição: </h5>
                        <input placeholder={produto.descrição} className="form-control" type="text" id="descrição" name="descrição" onChange={onChange} />
                    </div>
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3 text-center">
                        <div className="col">
                            <button type="button" className="btn btn-warning" onClick={onSubmitAltera}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>
                                Alterar
                            </button>
                        </div>
                        <div className="col">
                            <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg">Voltar</button>

                        </div>
                        <div className="col">
                            <button type="submit" onClick={deletar} className="btn btn-danger btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                                Excluir
                            </button>
                        </div>
                    </li>

            </div>
        </>
    );
}

export default VisualizarProduto;