import Footer from "components/Footer";
import Navbar from "components/NavBar/index";
import VerificaRespostaProdutos from "components/VerificaRespostaProdutos";
import NavBarGerente from 'components/NavBar/indexgerente';

const VerificaRespostaProdutosTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
    if (tipo.tipo !== "Gerente") {
        return (
            <>
                <Navbar />

                <div className="container">
                    <VerificaRespostaProdutos />
                </div>
                <Footer />
            </>
        );
    }
    else {
        return (
            <>
                <NavBarGerente />

                <div className="container">
                    <VerificaRespostaProdutos />
                </div>
                <Footer />
            </>
        );
    }
}

export default VerificaRespostaProdutosTela;