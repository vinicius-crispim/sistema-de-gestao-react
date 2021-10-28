import axios from "axios";
import AlteraProduto from "components/AlteraProduto";
import CadastroProduto from "components/CadastroProduto";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Categoria, ProdutoPage } from "types/produto";
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
        }
    });

    useEffect(() => {
        setProduto(prod);
        console.log(produto);
        console.log(prod);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, setState] = useState({
        divcontainer: false,
    })

    var botaomuda = () => {
        setState({ divcontainer: !state.divcontainer })
    }

    const x = state.divcontainer;

    function onSubmit(event: any) {
        event.preventDefault();
        const { name, value } = event.target
    }
    type TodasCategoria = {
        ids: number[],
        nomes: string[],
    }
    
        const [categoria, setCategoria] = useState<Categoria>({
            id: 0,
            nome: "",
        });
    
        const history = useHistory();
    
        function onChange(event: { target: { name: any; value: any; }; }) {
            const { name, value } = event.target;
    
            console.log({ name, value });
            setProduto({ ...produto, [name]: value });
        }
        function deletar (event: any) {
            axios.delete(`${BASE_URL}/produtos/${produto.id}`).then((response) =>{
                history.push("/estoque");
                alert("PRODUTO DELETADO COM SUCESSO");
            } )
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
                        <h5>Nome: {produto.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Categoria: {produto.categoria.nome}</h5>
                    </div>
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                <div className="col">
                        <h5>Quantidade Minima: {produto.quantidademin}</h5>
                    </div>
                    <div className="col">
                        <h5>Quantidade em Estoque: {produto.estoque}</h5>
                    </div>
                    
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                    <div className="col">
                        <h5>Descrição: {produto.descrição}</h5>
                    </div>
                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3 text-center">
                    <div className="col">
                        <h5><button type="submit" value={2} onClick={onSubmit} className="btn btn-success btn-lg">Ver estoque</button></h5>
                    </div>
                    <div className="col">
                        <h5><button type="submit" value={3} onClick={deletar} className="btn btn-danger btn-lg">Excluir</button></h5>
                    </div>
                    <div className="col">
                        <h5><button type="submit" value={4} onClick={onSubmit} className="btn btn-secondary btn-lg">Proximo</button></h5>
                    </div>

                </li>
                <li className="d-flex justify-content-between lh-sm list-group-item py-3 text-center">
                    <div className="col">
                        <button className="btn btn-warning btn-lg" type="submit" value={1} onClick={botaomuda}>{x ? 'Fechar' : 'Alterar'} </button>{
                            x && (<div >
               
                            <form onSubmit={onSubmitAltera} >
                                <div className="row py-1">
                                    <div className="col">
                                        <div className="promotion-form__group">
                                            <label htmlFor="nome" className="my-1" >Nome:</label>
                                            <input className="form-control" type="text" id="nome" name="nome" onChange={onChange} required />
                                        </div>
                                    </div>
            
                                    <div className="col">
                                        <div className="promotion-form__group">
                                            <label htmlFor="categoria" className="my-1">Categoria:</label>
                                            <select name="categoria" className="form-select" aria-label="Default select example" onChange={acha}>
                                                <option>Selecione</option>
                                                {todasCategorias.ids.map(x => (
                                                    <option key={"categoria" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <div className="col">
                                        <div className="promotion-form__group ">
                                            <label htmlFor="quantidademin" className="my-1">Quantidade Minima:</label>
                                            <input className="form-control" type="number" id="quantidademin" name="quantidademin" onChange={onChange} required />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="promotion-form__group">
                                            <label htmlFor="estoque" className="my-1">Estoque:</label>
                                            <input className="form-control" type="number" id="estoque" name="estoque" onChange={onChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-2">
                                    <div className="col">
                                        <div className="promotion-form__group">
                                            <label htmlFor="descrição" className="my-1">Descrição:</label>
                                            <input className="form-control" type="text" id="descrição" name="descrição" onChange={onChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-3 col-2 mx-auto">
                                    <button type="submit" className="btn btn-success btn-lg my-4">Alterar</button>
                                </div>
                            </form>
                        </div>)
                        }                    </div>
                </li>

            </div>
        </>
    );
}

export default VisualizarProduto;