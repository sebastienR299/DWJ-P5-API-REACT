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
} from "reactstrap";

const NavbarHome = ({history}) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        // Redirige l'utilisateur vers la page de login une fois déconnecter
        history.push("/login");
    }

    return ( 

        <Navbar
          className="navbar-horizontal navbar-dark bg-primary"
          expand="lg"
          id="navbar-main"
        >
            <Container>
                <NavbarBrand md="8">
                        <h4 className="text-white my-auto"><strong>Gestionnaires de factures</strong></h4>
                </NavbarBrand>
                <Col md="2">
                    <NavLink to="/invoices" className="text-white">Factures</NavLink>
                    <NavLink to="/customers" className="text-white ml-4">Clients</NavLink>
                </Col>
                <Col md="2">
                    <UncontrolledDropdown>
                        <DropdownToggle 
                        caret 
                        color="white" 
                        className="text-primary"
                        >
                            <i className="ni ni-single-02 mr-1"></i>
                            Utilisateurs
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