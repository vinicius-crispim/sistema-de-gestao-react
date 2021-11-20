import Footer from "components/Footer";
import NavBar from "components/NavBar";
import GerirCotacoes from '../../components/GerirCotacoes/index';
import NavBarGerente from 'components/NavBar/indexgerente';

const GerirCotacoesTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
    if (tipo.tipo !== "Gerente") {
    return (
        
        <>
            <NavBar />

            <div className="container">
                <GerirCotacoes />
            </div>
            <Footer />
        </>
    );}else{
        return (
        
            <>
                <NavBarGerente />
    
                <div className="container">
                    <GerirCotacoes />
                </div>
                <Footer />
            </>)
    }
}

export default GerirCotacoesTela;