import CotacaoFeita from "components/Cotacao";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';
let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');

const CadastroCotacao = () => {
    if (tipo.tipo !== "Gerente") {
        return (
            <>
                <NavBar />
                <div className="container">
                    <CotacaoFeita />
                </div>
                <Footer />
            </>
        );    
    }else{
        return (
            <>
                <NavBarGerente />
                <div className="container">
                    <CotacaoFeita />
                </div>
                <Footer />
            </>
        );    
    }
    
}

export default CadastroCotacao;