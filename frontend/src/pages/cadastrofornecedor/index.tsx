import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Cidade } from "types/cidade";
import { BASE_URL } from "utils/request";
/*
type Cidade = {
    id: number;
}*/

type Fornecedor = {
    nome: string,
    cnpj: string,
    email: string,
    login: string,
    senha: string,
    cidade: Cidade,
}

type TodasCidades = {
    ids : number[];
    nomes : string[],
}

const CadastroFornecedor = () => {


    const [values, setValues] = useState<Fornecedor>({
        nome: "",
        cnpj: "",
        login: "",
        senha: "",
        email: "",
        cidade: {
            id: 0,
            nome:"",

        }
    });
    const [cidade, setCidade] = useState<Cidade>({
        id: 0,
        nome:"",
    });

    /*let [todasCidades, setTodasCidades] = useState<TodasCidades>({  meusids: [], meusnomes:[]  });*/

    console.log(values);
    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setValues({ ...values, [name]: value });
    }

    const [todasCidades, setTodasCidades] = useState<TodasCidades>({  ids:[], nomes:[] });

    useEffect(() => {
        axios.get(`${BASE_URL}/cidades`)
        .then(response => {

            const data = response.data as Cidade[];
            const meusnomes = data.map(x => x.nome);
            const meusids = data.map(x => x.id);
            setTodasCidades({ids:meusids, nomes:meusnomes});

            console.log(response.data);
            console.log(todasCidades);
            console.log("rodouu");
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function acha(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log({ name, value });
        console.log("adsasdsds");
        setCidade({ ...cidade, [name]: value });
        axios.get(`${BASE_URL}/cidades/${value}`)
            .then((response) => {
                const data = response.data as Cidade;
                console.log({ data });
                setValues({ ...values, [name]: data });
            });
    }
    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/fornecedores`, values)
            .then((response) => {
                history.push('/');
            });
    }

    return (
        <>
            <NavBar />

            <div className="container" >
                <div className="jumbotron d-grid col-6 mx-auto">
                    <h1 className="display-4">Cadastre sua empresa</h1><br />
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
                                <label htmlFor="cnpj">CNPJ:</label>
                                <input className="form-control" type="text" id="cnpj" name="cnpj" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="login">Login:</label>
                                <input className="form-control" type="text" id="login" name="login" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="email">Email:</label>
                                <input className="form-control" type="text" id="email" name="email" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="senha">Senha:</label>
                                <input className="form-control" type="text" id="senha" name="senha" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="cidade">Cidade:</label>
                                <select name="cidade" className="form-select" aria-label="Default select example" onChange={acha}>
                                    <option>Selecione</option>
                                    {todasCidades.ids.map(x => (
                                        <option key={"categoria"+x} value={x}>{todasCidades.nomes[x-1]}</option>
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

export default CadastroFornecedor;

