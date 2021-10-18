import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";


const NotaFiscalteste = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <main >
                    <div className=" text-center">
                        <h2>Nota Fiscal</h2>
                        <p className="lead">Veja abaixo a nota fiscal da compra</p>
                    </div>
                    <div className="card">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary mx-auto">Compra feita</span>
                        </h4>
                        <li className="d-flex justify-content-between lh-sm list-group-item">
                            <div className="col">
                                <h5>Número da Nota: 000459/1</h5>
                            </div>
                            <div className="col">
                                <h5>Fornecedor: Americanas</h5>
                            </div>
                        </li>
                        <li className="d-flex justify-content-between lh-sm list-group-item">
                            <div className="col">
                                <h5>CNPJ:111.111.222.-21</h5>
                            </div>
                            <div className="col ">
                                <h5>Cidade: Curitiba</h5>
                            </div>
                        </li>
                        <div className="col-md-5 col-lg-12 order-md-last">

                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">Canetas</h6>
                                        <small>Preço por produto: R$3,00</small>
                                    </div>

                                    <h6>Quantidade Comprada:14</h6>
                                    <h6>Total: R$42,00</h6>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">Borracha</h6>
                                        <small>Preço por produto: R$2,50</small>
                                    </div>
                                    <h6>Quantidade Comprada:6</h6>
                                    <h6>Total: R$15,00</h6>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">Agenda</h6>
                                        <small>Preço por produto: R$8,00</small>
                                    </div>
                                    <h6>Quantidade Comprada:12</h6>
                                    <h6 >Total: R$96,00</h6>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total</span>
                                    <strong>R$153,00</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
                <div className="jumbotron my-4">
                    <h4 className="text-center">Para voltar para a pagina inicial, clique no botão abaixo</h4>
                    <div className="jumbotron d-grid col-3 mx-auto my-2">
                        <Link className="btn btn-success btn-lg my-3" to="/home">Voltar</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NotaFiscalteste;