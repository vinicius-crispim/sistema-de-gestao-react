import axios from "axios";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Categoria, Produto } from "types/produto";
import { BASE_URL } from "utils/request";



const CadastroCategoria = () => {

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: "",
    });

    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setCategoria({ ...categoria, [name]: value });
    }


    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/categorias`, categoria)
            .then((response) => {
                history.push('/home');
                window.location.reload();
            });
    }

    return (
        <>
            <div className="container" >

                <form onSubmit={onSubmit} >
                    <div className="row py-1">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="nome">Nome da Categoria:</label>
                                <input className="form-control" type="text" id="nome" name="nome" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="btn btn-success btn-lg my-4 text-dark text-black ">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroCategoria;