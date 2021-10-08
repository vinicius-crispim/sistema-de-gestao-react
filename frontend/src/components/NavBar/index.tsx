/* eslint-disable jsx-a11y/anchor-is-valid */
import logoNAVBAR from 'assets/img/logoNAVBAR.png'

const NavBar = () => {
    return (
        /*<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
            <div className="container">
                <nav className="my-2 my-md-0 mr-md-3">
                    <img src={logoNAVBAR} alt="Facebuy" width="120" />
                </nav>
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Features</a>
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Enterprise</a>
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Support</a>
                    <a className="py-2 text-dark text-decoration-none" href="#">Pricing</a>
                </nav>
            </div>
        </div>*/
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4"><img src={logoNAVBAR} alt="Facebuy" width="120" /></span>
                    </a>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">Features</a>
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">Enterprise</a>
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">Support</a>
                        <a className="py-2 text-dark text-decoration-none" href="#">Pricing</a>
                    </nav>
                </div>

            </header>
        </div>
    );
}

export default NavBar;
