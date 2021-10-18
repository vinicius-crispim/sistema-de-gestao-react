import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Funcionario } from "types/funcionario";
import { BASE_URL } from "utils/request";
import logoNAVBAR from 'assets/img/logoNAVBAR.png'
import { Link } from "react-router-dom";

type LoginType = {
    loginteste: string,
    senhateste: string,
}

type Validador = {
    meuslogins: string[],
    minhassenhas: string[],
}


const LoginUser = () => {

    const [logintype, setLoginType] = useState<LoginType>({
        loginteste: "",
        senhateste: "",
    })

    const [validador, setValidador] = useState<Validador>({
        meuslogins: [],
        minhassenhas: [],
    })

    const [values, setValues] = useState<Funcionario>({
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
    });

    /*let [todasCidades, setTodasCidades] = useState<TodasCidades>({  meusids: [], meusnomes:[]  });*/

    console.log(values);
    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ logintype });
        setLoginType({ ...logintype, [name]: value });
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/funcionarios`)
            .then(response => {

                const data = response.data as Funcionario[];
                const myl = data.map(x => x.login);
                const mys = data.map(x => x.senha);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                setValidador({ meuslogins: myl, minhassenhas: mys });

                console.log(response.data);
                console.log(validador);
                console.log("rodouu");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    let valida = 0;
    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        console.log(validador.meuslogins.length);
        console.log(logintype);
        for (let index = 0; index < validador.meuslogins.length; index++) {
            console.log(validador);
            if (logintype.loginteste === validador.meuslogins[index] && logintype.senhateste === validador.minhassenhas[index]) {
                console.log("DEUUU")
                console.log(validador.meuslogins[index])
                console.log(validador.minhassenhas[index])
                console.log(logintype);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                valida = index + 1;
            }
            else {
                console.log(validador.meuslogins[index])
                console.log(validador.minhassenhas[index])
                console.log(logintype);
            }

        }
        autentica(valida);
    }


    function autentica(num: number) {
        axios.get(`${BASE_URL}/funcionarios/${valida}`).then(response => {

            const temp = response.data as Funcionario;
            console.log(temp);
            setValues(temp)
            console.log(values)
            history.push("/home", values);
            console.log("aaaaaaaa");
            console.log(temp);
            localStorage.setItem("user", JSON.stringify(temp));

        });
    }


    return (
        <>
            <div className="container text-center" >
                <img className="mb-4" src={logoNAVBAR} alt="" width="220" />
                <div className="jumbotron d-grid col-8 mx-auto">
                    <h1 className=" display-5">Seja Bem-Vindo</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="jumbotron d-grid col-8 mx-auto">
                        <h3 className=" mb-1 mt-2">Insira as informações</h3>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label className="px-1" htmlFor="loginteste">Login:</label>
                                <input placeholder="Login do usuário" className="form-control-lg" type="text" id="loginteste" name="loginteste" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label className="px-1 " htmlFor="senhateste">Senha: </label>
                                <input placeholder="Senha" className="form-control-lg" type="password" id="senhateste" name="senhateste" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-secondary">Caso não tenha conta </h6>
                        <Link className="my-2 text-decoration-none" to="/cadastrofuncionario">Clique aqui para cadastrar-se como funcionario</Link> <br />
                        <Link className="my-2 text-decoration-none" to="/cadastrofornecedor"> Clique aqui para cadastrar-se como fornecedor</Link>
                    </div>
                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="px-9 btn btn-success btn-lg my-4">Entrar</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default LoginUser;

