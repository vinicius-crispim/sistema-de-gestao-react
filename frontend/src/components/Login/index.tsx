import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Funcionario } from "types/funcionario";
import { BASE_URL } from "utils/request";
import logoNAVBAR from 'assets/img/logoNAVBAR.png'

type LoginType = {
    loginteste: string,
    senhateste: string,
}

type Validador = {
    meuslogins:string[],
    minhassenhas:string[],
}

const LoginUser = () => {

    const [logintype, setLoginType] = useState<LoginType>({
        loginteste: "",
        senhateste: "",
    })

    const [validador, setValidador] = useState<Validador>({
        meuslogins: [],
        minhassenhas:[],
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
                const myl= data.map(x => x.login);
                const mys= data.map(x => x.senha);

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                setValidador({ meuslogins: myl, minhassenhas: mys });

                console.log(response.data);
                console.log(validador);
                console.log("rodouu");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [quantia, setQuantia] = useState(0);

    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(validador.meuslogins.length);
        console.log(logintype);
        for (let index = 0; index < validador.meuslogins.length; index++) {
            console.log(validador);
            if (logintype.loginteste === validador.meuslogins[index] && logintype.senhateste === validador.minhassenhas[index]) {
                console.log("DEUUU")
                console.log( validador.meuslogins[index])
                console.log( validador.minhassenhas[index])
                console.log(logintype);
                history.push("/");
            } else {
                console.log("NAOOO DEUUU")
                console.log( validador.meuslogins[index])
                console.log( validador.minhassenhas[index])
                console.log(logintype);
            }

        }
        console.log(quantia);
    }

    return (
        <>
            <div className="container text-center" >
                <div className="jumbotron d-grid col-6 mx-auto">
                    <h1 className="display-4">Entre no sistema</h1><br />
                </div>
                <form onSubmit={onSubmit}>
                    <img className="mb-4" src={logoNAVBAR} alt="" width="220" />
                    <h1 className="h3 mb-3 fw-normal">Insira as informações</h1>
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
                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="px-9 btn btn-success btn-lg my-4">Entrar</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default LoginUser;

