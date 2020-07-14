import React, { useState, useContext } from 'react';
import authAPI from "../services/authAPI";
// reactstrap components
import {
    Button,
    Col, Form, FormGroup,
    Input,
    Row
} from "reactstrap";
import AuthContext from '../contexts/AuthContext';

const LoginPage = ({onLogin, history}) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;

        setCredentials({...credentials, [name]: value});
    };

    // Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(credentials);

        try {
            await authAPI.authenticate(credentials);
            console.log("Connexion OK");
            setError("");
            setIsAuthenticated(true);
            // Redirige l'utilisateur vers la page des customers après une connexion réussie
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ne possède cette adresse ou les informations ne correspondent pas !");
        }
    };

    return ( 
        <>
        <h1 className="text-center mb-4">Connexion à l'application</h1>

        <Form
        onSubmit={handleSubmit}
        >
            <Row>
                <Col md="6">
                    <FormGroup>
                        <Input
                        value={credentials.username}
                        onChange={handleChange}
                        id="emailConnexion"
                        placeholder="name@example.com"
                        type="email"
                        name="username"
                        bsSize="lg"
                        className={error ? "is-invalid" : null}
                        />
                        {error ? <p className="invalid-feedback">
                            {error}
                        </p>
                        : null}
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                        <Input
                        value={credentials.password}
                        onChange={handleChange}
                        id="passwordConnexion"
                        placeholder="Mot de passe"
                        type="password"
                        name="password"
                        bsSize="lg"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button
            color="primary"
            size="lg"
            >
            Connexion
            </Button>
        </Form>

        </>
     );
}
 
export default LoginPage;