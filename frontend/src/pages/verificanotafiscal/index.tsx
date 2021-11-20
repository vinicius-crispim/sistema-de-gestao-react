import Footer from "components/Footer";
import VerificaNotaFiscal from '../../components/VerificaNotaFiscal/index';
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';

const VerificaNotaFiscalTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
    if (tipo.tipo !== "Gerente") {
    return (
        <>
            <NavBar />

            <div className="container">
                <VerificaNotaFiscal />
            </div>
            <Footer />
        </>
    );}else{return (
        <>
            <NavBarGerente />

            <div className="container">
                <VerificaNotaFiscal />
            </div>
            <Footer />
        </>
    );}
}

export default VerificaNotaFiscalTela;