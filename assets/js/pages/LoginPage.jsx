import React, { useContext, useState } from 'react';
// reactstrap components
import {
    Button,
    Col, Form,
    Row
} from "reactstrap";
import Field from "../components/forms/Field";
import AuthContext from '../contexts/AuthContext';
import authAPI from "../services/authAPI";
import { toast } from 'react-toastify';

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

        try {
            await authAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes à présent connecté 😺");
            // Redirige l'utilisateur vers la page des customers après une connexion réussie
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ne possède cette adresse ou les informations ne correspondent pas !");
            toast.error("Une erreur est survenue");
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
                    <Field
                    label="Adresse Email"
                    value={credentials.username}
                    onChange={handleChange}
                    id="emailConnexion"
                    placeholder="name@example.com"
                    type="email"
                    name="username"
                    error={error}
                    />
                </Col>
                <Col md="6">
                    <Field
                    label="Mot de passe"
                    value={credentials.password}
                    onChange={handleChange}
                    id="passwordConnexion"
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    error={error}
                    />
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