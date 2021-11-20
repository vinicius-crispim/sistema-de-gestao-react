
import logoNAVBAR from 'assets/img/logoNAVBAR.png'
import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CotacaoItem } from 'types/cotacao';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';
type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}


type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;

}
const NavBarGerente = () => {
    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })

    function troca() {
        axios.get(`${BASE_URL}/cotacoes`)
        .then(response => {
            const data = response.data as CotacaoTeste[];
            const meusids = data.map(x => x.id);
            const meusnomes = data.map(x => x.funcionario.nome);
            const minhasmarcas = data.map(x => x.item);
            todas.cotacoes = data;
            for (let index = 0; index < data.length; index++) {
                todas.quantidade.push(index);

            }
            localStorage.removeItem("cotacoesfiltradas");
            localStorage.setItem('cotacoesfiltradas', JSON.stringify(todas));

            let bemvindo = JSON.parse(localStorage.getItem('cotacoesfiltradas') || '{}');
            console.log(bemvindo);
            window.location.reload();
            console.log("TODAS");
            console.log(todas);
        });
        
    }
    const history = useHistory();
    function Sair() {
        localStorage.removeItem("fornecedor");
        localStorage.removeItem("user");

        history.push("/")
    }
    <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css' />
    return (

        <div className="container py-2">

            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/home" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4"><img src={logoNAVBAR} alt="Facebuy" width="120" /></span>
                    </a>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/cadastrofuncionario">Cadastrar Funcionário</Link>
                        <Link onClick={troca} className="me-3 py-2 text-dark text-decoration-none" to="/gerircotacoes">Gerir Cotacoes</Link>
                        <Link  className="me-3 py-2 text-dark text-decoration-none" to="/estoque">Estoque</Link>
                        <Link onClick={Sair} className="me-3 py-2 text-dark text-decoration-none" to="/">Sair</Link>
                    </nav>

                </div>


            </header>
        </div >
    );
}

export default NavBarGerente;

