import CotacaoFeita from "components/Cotacao";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

const CadastroCotacao = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <CotacaoFeita />
            </div>
            <Footer />
        </>
    );
}

export default CadastroCotacao;