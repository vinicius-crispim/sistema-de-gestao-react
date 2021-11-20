import Footer from "components/Footer";
import NavBarFornecedor from '../../components/NavBar/indexfornecedores';
import VerificaNotaFiscalFornecedor from "components/VerificaNotaFiscalFornecedor";

const VerificaNotaFiscalFornecedorTela = () => {
    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaNotaFiscalFornecedor />
            </div>
            <Footer />
        </>
    );
}

export default VerificaNotaFiscalFornecedorTela;