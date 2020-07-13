// Imports important
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import NavbarHome from './components/Navbar';
import HomePage from './pages/HomePage';
import {HashRouter, Switch, Route} from "react-router-dom";
import CustomersPage from './pages/CustomersPage';
import "../vendor/nucleo/css/nucleo.css";
import "../vendor/font-awesome/css/font-awesome.min.css";
import "../css/argon-design-system-react.css";

// CSS personnalisé
import '../css/app.css';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
import LoginPage from './pages/LoginPage';
import InvoicesPage from './pages/InvoicesPage';

// Javascript
console.log('Hello Webpack Encore!!');

const App = () => {
    return (

        <HashRouter>
            <NavbarHome/>
            <main className="container pt-5">
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/invoices" component={InvoicesPage}/>
                    <Route path="/customers" component={CustomersPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>

    )
    
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);
