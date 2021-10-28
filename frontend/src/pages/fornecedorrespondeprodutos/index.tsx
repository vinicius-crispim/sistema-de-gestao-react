import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import NavBarFornecedor from 'components/NavBar/indexfornecedores';
import FornecedorRespondeProdutos from '../../components/FornecedorRepondeProduto/index';
const RespostaTelaProduto = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <FornecedorRespondeProdutos />
            </div>
            <Footer />
        </>
    );
}

export default RespostaTelaProduto;