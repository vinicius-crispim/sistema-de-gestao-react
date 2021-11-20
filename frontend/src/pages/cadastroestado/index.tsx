import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';
import CadastroEstado from '../../components/CadastroEstado/index';

const CadastroEstadoTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
if (tipo.tipo !== "Gerente") {
    return (
        <>
            <NavBar />

            <div className="container">
                <CadastroEstado />
            </div>
            <Footer />
        </>
    );
}else{
    return (
        <>
            <NavBarGerente />

            <div className="container">
                <CadastroEstado />
            </div>
            <Footer />
        </>
    );
}
    
}

export default CadastroEstadoTela;