import Footer from "components/Footer";
import LoginUser from "components/Login";
import NavBarLogin from "components/NavBar/indexlogin";

const Login = () => {
    return (
        <>
            <NavBarLogin/>
            <div >
               <LoginUser/>
            </div>
            <Footer />
        </>
    );
}

export default Login;