import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Cidade } from "types/cidade";
import { Categoria, Produto } from "types/produto";
import { BASE_URL } from "utils/request";


type TodosEstados = {
    ids: number[],
    nomes: string[],
}


const CadastroCidade = () => {
    const [todosEstados, setTodosEstados] = useState<TodosEstados>({ ids: [], nomes: [] });

    const [cidade, setCidade] = useState<Cidade>({
        id: 0,
        nome: "",
    });

    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setCidade({ ...cidade, [name]: value });
    }


    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/cidades`, cidade)
            .then((response) => {
                alert("Cidade cadastrada com sucesso")
                history.push('/home');
                window.location.reload();
            });
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/estados`)
            .then(response => {

                const data = response.data as Categoria[];
                const meusnomes = data.map(x => x.nome);
                const meusids = data.map(x => x.id);
                setTodosEstados({ ids: meusids, nomes: meusnomes });

                console.log(response.data);
                console.log(todosEstados);
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
        axios.get(`${BASE_URL}/estados/${value}`)
            .then((response) => {
                const data = response.data as Categoria;
                console.log({ data });
                setCidade({ ...cidade, [name]: data });
            });
    }
    return (
        <>
            <div className="container" >

                <form onSubmit={onSubmit} >
                    <div className="row py-1">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="nome">Nome:</label>
                                <input className="form-control" type="text" id="nome" name="nome" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="estado" >Estado:</label>
                                <select name="estado" className="form-select" aria-label="Default select example" onChange={acha}>
                                    <option>Selecione</option>
                                    {todosEstados.ids.map(x => (
                                        <option key={"estado" + x} value={x}>{todosEstados.nomes[x - 1]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="btn btn-success btn-lg my-4">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroCidade;