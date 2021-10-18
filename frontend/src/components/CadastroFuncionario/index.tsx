import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Funcionario, TipoFuncionario } from "types/funcionario";
import { BASE_URL } from "utils/request";


type Todostipos = {
    ids: number[];
    tiposnomes: string[],
}

const CadastrarFuncionario = () => {


    const [values, setValues] = useState<Funcionario>({
        id:0,
        nome: "",
        login: "",
        senha: "",
        email: "",
        telefone: "",
        tipo: {
            id: 0,
            tipo: "",
        },
    });
    const [tipo, setTipo] = useState<TipoFuncionario>({
        id: 0,
        tipo:"",
    });

    /*let [todasCidades, setTodasCidades] = useState<TodasCidades>({  meusids: [], meusnomes:[]  });*/

    console.log(values);
    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setValues({ ...values, [name]: value });
    }

    const [todosTipos, setTodostipos] = useState<Todostipos>({ ids: [], tiposnomes: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/tipofuncionario`)
            .then(response => {

                const data = response.data as TipoFuncionario[];
                const meustipos = data.map(x => x.tipo);
                const meusids = data.map(x => x.id);
                setTodostipos({ ids: meusids, tiposnomes: meustipos });

                console.log(response.data);
                console.log(todosTipos);
                console.log("rodouu");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function acha(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log({ name, value });
        console.log("adsasdsds");
        setTipo({ ...tipo, [name]: value });
        axios.get(`${BASE_URL}/tipofuncionario/${value}`)
            .then((response) => {
                const data = response.data as TipoFuncionario;
                console.log({ data });
                setValues({ ...values, [name]: data });
            });
    }
    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/funcionarios`, values)
            .then((response) => {
                history.push('/');
            });
    }

    return (
        <>
            <div className="container" >
                <div className="jumbotron d-grid col-9 mx-auto px-2">
                    <h1 className="display-4">Cadastre um Funcionario</h1><br />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="row py-2">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="nome">Nome:</label>
                                <input className="form-control" type="text" id="nome" name="nome" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="login">Login:</label>
                                <input className="form-control" type="text" id="login" name="login" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label className="text-size-lg" htmlFor="senha">Senha:</label>
                                <input className="form-control" type="text" id="senha" name="senha" onChange={onChange} required />
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
                                <label htmlFor="telefone">Telefone:</label>
                                <input className="form-control" type="text" id="telefone" name="telefone" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="tipo">Tipo de Funcionario:</label>
                                <select name="tipo" className="form-select" aria-label="Default select example" onChange={acha}>
                                    <option>Selecione</option>
                                    {todosTipos.ids.map(x => (
                                        <option key={"categoria" + x} value={x}>{todosTipos.tiposnomes[x - 1]}</option>
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
        </>
    );
}

export default CadastrarFuncionario;

