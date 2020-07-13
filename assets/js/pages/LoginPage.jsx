import React, { useState } from 'react';
// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    Button,
    Row,
    Col
  } from "reactstrap";
import Axios from 'axios';

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(credentials);

        try {
            const token = await Axios
            .post("http://localhost:8000/api/login_check", credentials)
            .then(response => response.data.token)

            setError("");

            // Stocke le Token dans le localStorage
            window.localStorage.setItem("authToken", token);

            // On préviens axios qu'on à un header par défaut sur nos futurs requêtes
            Axios.defaults.headers["Authorization"] = "Bearer " + token;

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