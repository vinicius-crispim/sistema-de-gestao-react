import CotacoesFinalizadas from "components/CotacoesFinalizadas";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NotaFiscalFornecedor from "components/NotaFiscalFornecedor";
import NavBarFornecedor from '../../components/NavBar/indexfornecedores';


const VerificaNotaFornecedor = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <NotaFiscalFornecedor />
            </div>
            <Footer />
        </>
    );
}

export default VerificaNotaFornecedor;