import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import customersAPI from "../services/customersAPI";
import { toast } from 'react-toastify';

const CustomerPage = ({match, history}) => {

    const {id = "new"} = match.params;

    // State concernant le customer
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    // State concernant les erreurs (en provenance de l'API)
    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    // State permettant de savoir si c'est une modification de customer
    const [editing, setEditing] = useState(false);

    // Récupération du customer en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {
            // Déstructuration via les données reçues de l'API
            const {firstName, lastName, email, company} = await customersAPI.find(id);
            // Injection dans le state customer
            setCustomer({firstName, lastName, email, company});
        } catch(error) {
            toast.error("Le client n'as pas pu être chargé");
            history.replace("/customers");
        }
    }

    // Chargement du customer si besoin au chargement du composant ou au changement de "id"
    useEffect(() => {
        if(id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id])

    // Gestion des inputs
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {

            setErrors({});
            if(editing) {
                await customersAPI.update(id, customer);
                toast.success("Le client à bien été modifié");
                history.replace("/customers");
            } else {
                await customersAPI.create(customer);
                toast.success("Le client à bien été enregistré");
                history.replace("/customers");
            }
            
        } catch({response}) {
            const {violations} = response.data
            if(violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire");
        }
    }

    return (
        
        <>

        {!editing && <h1>Créer un client</h1> || <h1>Modification du client</h1>}

        <Form onSubmit={handleSubmit}>
            <Field 
            name="lastName" 
            label="Nom" 
            placeholder="Nom du client"
            onChange={handleChange} 
            value={customer.lastName}
            error={errors.lastName} />
            <Field 
            name="firstName" 
            label="Prénom" 
            placeholder="Prénom du client"
            onChange={handleChange}  
            value={customer.firstName}
            error={errors.firstName} />
            <Field 
            name="email" 
            label="Email" 
            placeholder="Email du client" 
            type="email"
            onChange={handleChange}  
            value={customer.email}
            error={errors.email} />
            <Field 
            name="company" 
            label="Entreprise" 
            placeholder="Entreprise du client"
            onChange={handleChange} 
            value={customer.company}
            error={errors.company} />

            <FormGroup>
                <Button type="submit" className="btn btn-primary">Enregistrer</Button>
                <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
            </FormGroup>
        </Form>

        </>

    );
}
 
export default CustomerPage;