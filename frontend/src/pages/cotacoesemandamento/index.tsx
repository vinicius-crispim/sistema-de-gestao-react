import CotacoesEmAndamento from "components/CotacoesEmAndamento";
import Footer from "components/Footer";
import NavBar from "components/NavBar";


const CotacoesEmAndamentoTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <CotacoesEmAndamento />
            </div>
            <Footer />
        </>
    );
}

export default CotacoesEmAndamentoTela;