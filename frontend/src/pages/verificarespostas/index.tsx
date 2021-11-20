import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NavBarGerente from "components/NavBar/indexgerente";
import VerificaRespostas from "components/VerificaRespostas";

const VerificaRespostasTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
    if (tipo.tipo !== "Gerente") {
        return (
            <>
                <NavBar />

                <div className="container">
                    <VerificaRespostas />
                </div>
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <NavBarGerente />

                <div className="container">
                    <VerificaRespostas />
                </div>
                <Footer />
            </>
        );
    }
}

export default VerificaRespostasTela;