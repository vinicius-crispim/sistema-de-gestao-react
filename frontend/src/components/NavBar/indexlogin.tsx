/* eslint-disable jsx-a11y/anchor-is-valid */
import logoNAVBAR from 'assets/img/logoNAVBAR.png'
import { Link } from 'react-router-dom';

const NavBarLogin = () => {
    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4"><img src={logoNAVBAR} alt="Facebuy" width="120" /></span>
                    </a>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/cadastrofornecedor">Cadastrar Fornecedor</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="#">Ajuda</Link>

                    </nav>
                </div>

            </header>
        </div>
    );
}
export default NavBarLogin