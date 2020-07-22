import React from 'react';
import {Jumbotron, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return ( 

        <>

        <div>
            <Jumbotron>
                <h1 className="display-3 color-secondary">Commençons &nbsp;&nbsp;<i className="ni ni-spaceship"></i></h1>
                <p className="lead">Un gestionnaire de facture simple et intuitif, prenant en charge vos clients, leurs factures et toute une panoplie d'autres fonctionnalitées.</p>
                <hr className="my-2" />
                <p>Une fois l'inscription terminée, vous serez en mesure en gérer vos clients, leurs factures envoyées, payées, et annulées.</p>
                <p className="lead">
                <Link to="/register" className="btn btn-primary text-center">Let's go !</Link>
                </p>
            </Jumbotron>
        </div>

        </>

    );
}
 
export default HomePage;