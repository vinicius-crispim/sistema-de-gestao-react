import Footer from "components/Footer";
import VerificaOrdem from '../../components/VerificaOrdem/index';
import NavBarFornecedor from 'components/NavBar/indexfornecedores';
import VerificaNotaFiscal from '../../components/VerificaNotaFiscal/index';

const VerificaNotaFiscalTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaNotaFiscal />
            </div>
            <Footer />
        </>
    );
}

export default VerificaNotaFiscalTela;