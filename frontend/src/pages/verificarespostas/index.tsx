import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import VerificaRespostas from "components/VerificaRespostas";

const VerificaRespostasTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaRespostas />
            </div>
            <Footer />
        </>
    );
}

export default VerificaRespostasTela;