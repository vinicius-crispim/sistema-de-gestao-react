import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

type Produto = {
    nome: string,
    descricao: string,
    quantidademin: number,
    estoque: number,
    marca: string,
    categoria: Categoria,

}

type Categoria = {
    id: number,
    nome: string,
}

type TodasCategoria = {
    ids: number[],
    nomes: string[],
}


const CadastroProduto = () => {

    const [values, setValues] = useState<Produto>({
        nome: "",
        descricao: "",
        quantidademin: 0,
        estoque: 0,
        marca: "",
        categoria: {
            id: 0,
            nome: "",
        }
    });

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: "",
    });

    console.log(values);
    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setValues({ ...values, [name]: value });
    }


    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post("http://localhost:8080/produtos", values)
            .then((response) => {
                history.push('/');
            });
    }

    const [todasCategorias, setTodasCategorias] = useState<TodasCategoria>({  ids:[], nomes:[] });

    useEffect(() => {
        axios.get(`http://localhost:8080/categorias`)
        .then(response => {

            const data = response.data as Categoria[];
            const meusnomes = data.map(x => x.nome);
            const meusids = data.map(x => x.id);
            setTodasCategorias({ids:meusids, nomes:meusnomes});

            console.log(response.data);
            console.log(todasCategorias);
            console.log("rodouu");
        });
    }, );

    function acha(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log({ name, value });
        console.log("adsasdsds");
        setCategoria({ ...categoria, [name]: value });
        axios.get(`http://localhost:8080/categorias/${value}`)
            .then((response) => {
                const data = response.data as Categoria;
                console.log({ data });
                setValues({ ...values, [name]: data });
            });
    }

    return (
        <>
            <NavBar />
            <div className="container" >
                <div className="jumbotron d-grid col-6 mx-auto">
                    <h1 className="display-4">Cadastre um Produto</h1><br />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="nome">Nome:</label>
                                <input className="form-control" type="text" id="nome" name="nome" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="descricao">Descrição:</label>
                                <input className="form-control" type="text" id="descricao" name="descricao" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="quantidademin">Quantidade Minima::</label>
                                <input className="form-control" type="number" id="quantidademin" name="quantidademin" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="estoque">Estoque::</label>
                                <input className="form-control" type="number" id="estoque" name="estoque" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="marca">Marca:</label>
                                <input className="form-control" type="text" id="marca" name="marca" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="categoria">Categoria:</label>
                                <select name="categoria" className="form-select" aria-label="Default select example" onChange={acha}>
                                    <option>Selecione</option>
                                    {todasCategorias.ids.map(x => (
                                        <option key={"categoria" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="btn btn-success btn-lg my-4">Cadastrar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CadastroProduto;