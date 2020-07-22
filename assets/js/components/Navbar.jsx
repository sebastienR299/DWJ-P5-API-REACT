import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  Container,
  Col,
  DropdownToggle,
  Row,
  Button,
  NavbarBrand,
  UncontrolledCollapse,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { toast } from 'react-toastify';

const NavbarHome = ({history}) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté 😁");
        // Redirige l'utilisateur vers la page de login une fois déconnecter
        history.push("/login");
    }


    return ( 

        <Navbar
          className="navbar-horizontal navbar-dark bg-primary"
          expand="lg"
          id="navbar-main"
        >
            <Container className="flex-nowrap">
                <NavbarBrand className="bloc-navbar-title col-sm-6">
                        <h4 className="text-white my-auto text-left"><strong>ReactInvoices</strong></h4>
                </NavbarBrand>
                <Col className="text-white col-sm-6 d-block d-lg-none text-right align-items-center">

                </Col>
                <Col className="col-md-2 d-none d-lg-block">
                    <NavLink to="/invoices" className="text-white">Factures</NavLink>
                    <NavLink to="/customers" className="text-white ml-4">Clients</NavLink>
                </Col>
                <Col className="col-md-2 d-none d-lg-block">
                    <UncontrolledDropdown className="col-md-2 d-none d-lg-block">
                        <DropdownToggle 
                        caret
                        color="white" 
                        className="text-primary"
                        >
                            <i className="ni ni-single-02 mr-1"></i>
                        </DropdownToggle>
                        <DropdownMenu className="animate">
                            {!isAuthenticated ?
                            <>
                                <DropdownItem onClick={e => e.preventDefault()}>
                                <Link to="/register">
                                    <span className="text-warning align-middle"><i className="ni ni-circle-08 mr-3 ni-2x"></i></span>
                                    <span className="font-weight-bold">Inscription</span>
                                </Link>
                                </DropdownItem>
                                <DropdownItem onClick={e => e.preventDefault()}>
                                <Link to="/login">
                                    <span className="text-success align-middle"><i className="ni ni-lock-circle-open ni-2x mr-3"></i></span>
                                    <span className="font-weight-bold">Connexion</span>
                                </Link>
                                </DropdownItem>
                            </>
                            :
                            <>
                            <DropdownItem 
                            onClick={handleLogout}>
                                <span className="text-danger align-middle"><i className="ni ni-button-power ni-2x mr-3"></i></span>
                                <span className="font-weight-bold">Déconnexion</span>
                            </DropdownItem>
                            </>
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Col>
            </Container>
        </Navbar>

     );
}
 
export default NavbarHome;