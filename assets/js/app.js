// Imports important
import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter, Link } from "react-router-dom";
import NavbarHome from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from "./contexts/AuthContext";
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/HomePage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import authAPI from "./services/authAPI";
import CustomerPage from './pages/CustomerPage';
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, toast } from 'react-toastify';
import '../css/ReactToastify.css';
import { slide as Menu } from "react-burger-menu";
import Footer from "./components/Footer";

// CSS personnalisé
import '../css/app.css';
import "../css/argon-design-system-react.css";
import "../vendor/font-awesome/css/font-awesome.min.css";
import "../vendor/nucleo/css/nucleo.css";



authAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    // withRouter permet d'étendre les routes en dehors du switch
    const NavBarWithRouter = withRouter(NavbarHome);
    const MenuWithRouter = withRouter(Menu);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté 😁");
        // Redirige l'utilisateur vers la page de login une fois déconnecter
        history.push("/login");
    }

    return (

        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        <HashRouter>
            <MenuWithRouter width={280} right>
                <Link to="/customers"><i className="fa fa-address-book-o" aria-hidden="true"></i> Clients</Link>
                <Link to="/invoices"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Factures</Link>
                {!isAuthenticated &&
                <Fragment>
                <Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Connexion</Link>
                <Link to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i> Inscription</Link>
                </Fragment>
                ||
                <a onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Déconnexion</a>
                }
            </MenuWithRouter>
            <NavBarWithRouter />
            <main className="container-page container pt-5">
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <PrivateRoute path="/invoices/:id" component={InvoicePage}/>
                    <PrivateRoute path="/invoices" component={InvoicesPage}/>
                    <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                    <PrivateRoute path="/customers" component={CustomersPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
            <Footer/>
        </HashRouter>
        <ToastContainer
        position="bottom-right"
        />
        </AuthContext.Provider>                  
    )
    
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);
