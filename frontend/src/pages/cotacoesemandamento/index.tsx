import CotacoesEmAndamento from "components/CotacoesEmAndamento";
import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";


const CotacoesEmAndamentoTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <CotacoesEmAndamento />
            </div>
            <Footer />
        </>
    );
}

export default CotacoesEmAndamentoTela;