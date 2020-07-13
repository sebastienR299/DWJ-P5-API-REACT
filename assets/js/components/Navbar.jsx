import React, { useState } from 'react';
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
  UncontrolledCollapse
} from "reactstrap";

const NavbarHome = (props) => {

    return ( 

        <Navbar
          className="navbar-horizontal navbar-dark bg-primary"
          expand="lg"
          id="navbar-main"
        >
            <Container>
                <NavbarBrand md="10">
                    <h4 className="text-white my-auto"><strong>Gestionnaires de factures</strong></h4>
                </NavbarBrand>
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
                            <DropdownItem href="#" onClick={e => e.preventDefault()}>
                                <span className="text-warning align-middle"><i className="ni ni-circle-08 mr-3 ni-2x"></i></span>
                                <span className="font-weight-bold">Inscription</span>
                            </DropdownItem>
                            <DropdownItem href="#" onClick={e => e.preventDefault()}>
                                <span className="text-success align-middle"><i className="ni ni-lock-circle-open ni-2x mr-3"></i></span>
                                <span className="font-weight-bold">Connexion</span>
                            </DropdownItem>
                            <DropdownItem href="#" onClick={e => e.preventDefault()}>
                                <span className="text-danger align-middle"><i className="ni ni-button-power ni-2x mr-3"></i></span>
                                <span className="font-weight-bold">Déconnexion</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Col>
            </Container>
        </Navbar>

     );
}
 
export default NavbarHome;