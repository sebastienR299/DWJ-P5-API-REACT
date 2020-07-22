import React, { useState } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import userAPI from "../services/userAPI";
import { toast } from 'react-toastify';

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    // Gestion des inputs
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe";
            setErrors(apiErrors);
            toast.error("La confirmation de mot de passe n'est pas bonne");
            return;
        }

        try {
            const response = await userAPI.register(user);
            // TODO : Flash notification success
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !");
            setErrors({});
            history.replace("/login");
        } catch ({response}) {
            const {violations} = response.data;

            if(violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire !");
        }
    }

    return ( 
        <>

        <h1 className="title-page text-center mb-4">Inscription</h1>

        <Form onSubmit={handleSubmit}>
            <Field 
            name="firstName" 
            label="Prénom" 
            placeholder="Votre prénom" 
            error={errors.firstName} 
            value={user.firstName} 
            onChange={handleChange}
            />
            <Field 
            name="lastName" 
            label="Nom de famille" 
            placeholder="Votre nom de famille" 
            error={errors.lastName} 
            value={user.lastName} 
            onChange={handleChange}
            />
            <Field 
            name="email" 
            label="Votre Email" 
            placeholder="Votre email" 
            type="email"
            error={errors.email} 
            value={user.email} 
            onChange={handleChange}
            />
            <Field 
            name="password" 
            label="Mot de passe" 
            placeholder="Votre mot de passe"
            type="password"
            error={errors.password} 
            value={user.password} 
            onChange={handleChange}
            />
            <Field 
            name="passwordConfirm" 
            label="Confirmation du mot de passe" 
            placeholder="Confirmation du mot de passe"
            type="password"
            error={errors.passwordConfirm} 
            value={user.passwordConfirm} 
            onChange={handleChange}
            />

            <FormGroup className="group-buttons">
                <Button type="submit" size="lg" color="primary" className="button-register">S'inscrire</Button>
                <Link to="/" className="btn btn-link p-0 ml-5">Retour au menu principale</Link>
            </FormGroup>

        </Form>

        </>
     );
}
 
export default RegisterPage;