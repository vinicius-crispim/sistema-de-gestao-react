import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';
import CadastroCidade from '../../components/CadastroCidade/index';

const CadastroCidadeTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
if (tipo.tipo !== "Gerente") {
    return (
        <>
            <NavBar />

            <div className="container">
                <CadastroCidade />
            </div>
            <Footer />
        </>
    );
}else{
    return (
        <>
            <NavBarGerente />

            <div className="container">
                <CadastroCidade />
            </div>
            <Footer />
        </>
    );
}
    
}

export default CadastroCidadeTela;