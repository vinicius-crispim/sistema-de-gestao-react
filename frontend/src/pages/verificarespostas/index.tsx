import Footer from "components/Footer";
import NavBar from "components/NavBar";
import VerificaRespostas from "components/VerificaRespostas";

const VerificaRespostasTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <VerificaRespostas />
            </div>
            <Footer />
        </>
    );
}

export default VerificaRespostasTela;