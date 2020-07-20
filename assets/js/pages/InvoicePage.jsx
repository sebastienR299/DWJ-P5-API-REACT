import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Field from '../components/forms/Field';
import Select from "../components/forms/Select";
import { Link } from 'react-router-dom';
import customerAPI from "../services/customersAPI";
import invoicesAPI from "../services/invoicesAPI";
import { toast } from 'react-toastify';

const InvoicePage = ({history, match}) => {

    const {id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);

    // Récupération des clients
    const fetchCustomers = async () => {
        try {
            const data = await customerAPI.findAll();
            setCustomers(data);
            // Selectionne par défaut le premier customer dans la liste déroulante (Evite problème de validation)
            if(!invoice.customer) setInvoice({invoice, customer: data[0].id});
        } catch(error) {
            toast.error("Impossible de charger les clients");
            history.replace("/invoices");
        }
    }

    // Récupération d'une facture
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await invoicesAPI.find(id);
            setInvoice({amount, status, customer: customer.id});
        } catch (error) {
            toast.error("Impossible de charger la facture");
            history.replace("/invoices");
        }
    }

    // Récupère la liste des clients à chaque chargement du composant
    useEffect(() => {
        fetchCustomers();
    }, [])

    // Récupération de la bonne facture quand l'identifiant de l'Url change
    useEffect(() => {
        if(id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id])

    // Gestion des inputs
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if(editing) {
                const response = await invoicesAPI.update(id, invoice);
                toast.success("La facture à bien été modifiée");
                history.replace("/invoices");
            } else {
                const response = await invoicesAPI.create(invoice);
                toast.success("La facture à bien été enregistrée");
                history.replace("/invoices");
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
            toast.error("Désolé une erreur est survenue");
        }
    }

    return ( 

        <>

        {editing && <h1>Modification d'une facture</h1> || <h1>Création d'une facture</h1>}

        <Form onSubmit={handleSubmit}>
            <Field
            name="amount"
            type="number"
            placeholder="Montant de la facture"
            label="Montant"
            onChange={handleChange}
            value={invoice.amount}
            error={errors.amount} />

            <Select
            name="customer"
            label="client"
            value={invoice.customer}
            error={errors.customer}
            onChange={handleChange}
            >

            {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>
            ))}

            </Select>

            <Select
            name="status"
            label="Status"
            value={invoice.status}
            error={errors.status}
            onChange={handleChange}
            >

            <option value="SENT">Envoyée</option>
            <option value="PAID">Payée</option>
            <option value="CANCELLED">Annulée</option>

            </Select>

            <FormGroup>
                <Button type="submit" className="btn btn-primary">Enregistrer</Button>
                <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
            </FormGroup>

        </Form>

        </>

     );
}
 
export default InvoicePage;