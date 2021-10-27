import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import FornecedorRespondeProdutos from '../../components/FornecedorRepondeProduto/index';
const RespostaTelaProduto = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <FornecedorRespondeProdutos />
            </div>
            <Footer />
        </>
    );
}

export default RespostaTelaProduto;