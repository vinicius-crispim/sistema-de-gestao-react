import Footer from "components/Footer";
import VerificaOrdem from '../../components/VerificaOrdem/index';
import NavBarFornecedor from 'components/NavBar/indexfornecedores';

const VerificaOrdemTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaOrdem />
            </div>
            <Footer />
        </>
    );
}

export default VerificaOrdemTela;