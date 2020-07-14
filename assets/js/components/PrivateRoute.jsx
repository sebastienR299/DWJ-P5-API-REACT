import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

// Création d'un composant PrivateRoute pour automatiser la gestion des routes protégés
const PrivateRoute = ({path, component}) => {

    const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? (
    <Route path={path} component={component} />
    ) : (
        <Redirect to="/login"/>
    );
};

export default PrivateRoute;