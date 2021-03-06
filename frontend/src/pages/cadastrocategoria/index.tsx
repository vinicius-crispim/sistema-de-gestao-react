import Footer from "components/Footer";

import CadastroCategoria from "components/CadastroCategoria";
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';

const CadastroCategoriaTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
if (tipo.tipo !== "Gerente") {
    return (
        <>
            <NavBar />

            <div className="container">
                <CadastroCategoria />
            </div>
            <Footer />
        </>
    );
}else{
    return (
        <>
            <NavBarGerente />

            <div className="container">
                <CadastroCategoria />
            </div>
            <Footer />
        </>
    );
}
    
}

export default CadastroCategoriaTela;