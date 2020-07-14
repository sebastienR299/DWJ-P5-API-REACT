// Imports important
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import NavbarHome from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from "./contexts/AuthContext";
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/HomePage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import authAPI from "./services/authAPI";

// CSS personnalisé
import '../css/app.css';
import "../css/argon-design-system-react.css";
import "../vendor/font-awesome/css/font-awesome.min.css";
import "../vendor/nucleo/css/nucleo.css";


authAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    const NavBarWithRouter = withRouter(NavbarHome);

    return (

        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        <HashRouter>
            <NavBarWithRouter/>
            <main className="container pt-5">
                <Switch>
                    <Route 
                    path="/login"
                    component={LoginPage}
                    />
                    <PrivateRoute 
                    path="/invoices" 
                    component={InvoicesPage}
                    />
                    <PrivateRoute 
                    path="/customers"
                    component={CustomersPage}
                    />
                    <Route 
                    path="/" 
                    component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
        </AuthContext.Provider>                  
    )
    
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);
