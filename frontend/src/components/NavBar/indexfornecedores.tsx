/* eslint-disable jsx-a11y/anchor-is-valid */
import logoNAVBAR from 'assets/img/logoNAVBAR.png'
import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CotacaoItem } from 'types/cotacao';
import { Funcionario } from 'types/funcionario';
import { OrdemCompra } from 'types/ordemcompra';
import { BASE_URL } from 'utils/request';
import { NotaFiscal } from '../../types/notafiscal';
let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');
type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;

}
type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}
type TodasNotas = {
    notas: NotaFiscal[];
    quantidade: number[];
}
type Todas2 = {
    ordens: OrdemCompra[];
    quantidade: number[];
}
const NavBarFornecedor = () => {
    const history = useHistory();
    const [todasordens, setOrdens] = useState<Todas2>({ ordens: [], quantidade: [] })
    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })
    const [todasnotas, setTodasNotas] = useState<TodasNotas>({ notas: [], quantidade: [] })

    function sair() {
        localStorage.removeItem("fornecedor");
        localStorage.removeItem("user");

        history.push("/")
    }

    function onSubmit(event: any) {
        axios.get(`${BASE_URL}/cotacoes/autentica/${fornecedor.id}`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/verificarpedidos");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas);
            });
    }
    function onSubmit3(event: any) {
        axios.get(`${BASE_URL}/notaFiscais/notafiscalfornecedor/${fornecedor.id}`)
            .then(response => {

                const data = response.data as NotaFiscal[];

                todasnotas.notas = data;
                for (let index = 0; index < data.length; index++) {
                    todasnotas.quantidade.push(index);

                }
                localStorage.removeItem("notas");
                localStorage.setItem('notas', JSON.stringify(todasnotas));

                let bemvindo = JSON.parse(localStorage.getItem('notas') || '{}');
                console.log(bemvindo);
                history.push("/verificanotasfornecedor");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas);
            });
    }
    function onSubmit2(event: any) {
        axios.get(`${BASE_URL}/ordemcompras/autentica/${fornecedor.id}`)
            .then(response => {

                const data = response.data as OrdemCompra[];
                todasordens.ordens = data;
                for (let index = 0; index < data.length; index++) {
                    todasordens.quantidade.push(index);

                }
                localStorage.removeItem("ordens");
                localStorage.setItem('ordens', JSON.stringify(todasordens));

                let bemvindo = JSON.parse(localStorage.getItem('ordens') || '{}');
                console.log(bemvindo);
                history.push("/verificaordens");
                window.location.reload();

                console.log(todasordens);
            });
    }

    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/homefornecedor" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4"><img src={logoNAVBAR} alt="Facebuy" width="120" /></span>
                    </a>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/verificanotasfornecedor"onClick={onSubmit3}>Notas Fiscais</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/verificarpedidos"onClick={onSubmit}>Pedidos</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/verificaordens"onClick={onSubmit2}>Ordens de Compra</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/" onClick={sair}>Sair</Link>
                    </nav>
                </div>

            </header>
        </div>
    );
}

export default NavBarFornecedor;

