import Footer from "components/Footer";
import VerificaNotaFiscal from '../../components/VerificaNotaFiscal/index';
import NavBar from "components/NavBar";

const VerificaNotaFiscalTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <VerificaNotaFiscal />
            </div>
            <Footer />
        </>
    );
}

export default VerificaNotaFiscalTela;