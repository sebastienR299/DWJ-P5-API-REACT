import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    FormGroup,
    Input
} from "reactstrap";
import Paginations from "../components/Paginations";
import CustomersAPI from "../services/customersAPI";
import { Link } from 'react-router-dom';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Permet la récupération des customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch(error) {
            console.log(error.response);
        }
    }

    // Au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Gestion de la suppression d'un customer
    const handleDelete = async (id) => {
        // Fait une copie du tableau des customers
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await CustomersAPI.delete(id)
        } catch(error) {
            setCustomers(originalCustomers);
            console.log(error.response);
        }
    };

    // Fonction pour le changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Fonction pour rechercher un customer
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // Nombre d'items par page
    const itemsPerPage = 10;

    // Filtrage des customers en fonction de la recherche
    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company ? c.company.toLowerCase().includes(search.toLowerCase()) : null)
    );

    // Pagination des données
    const paginatedCustomers = Paginations.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
    );

    return (

        <Fragment>

            <div className="mb-2 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary">Créer un client</Link>
            </div>
            

            <FormGroup>
                <Input
                type="text"
                placeholder="Rechercher"
                onChange={handleSearch}
                value={search}
                bsSize="lg"
                >
                </Input>
            </FormGroup>

            <div className="table-responsive-sm">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-primary">
                                {customer.invoices.length}
                            </span>
                        </td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td>
                        <Button 
                        onClick={() => handleDelete(customer.id)}
                        color={customer.invoices.length > 0 ? "secondary" : "danger"} 
                        className="rounded-pill"
                        disabled={customer.invoices.length > 0}
                        >Supprimer</Button>
                        </td>
                    </tr>)}
                    
                </tbody>
            </table>
            </div>
            {filteredCustomers.length > itemsPerPage ?
            <Paginations 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={filteredCustomers.length} 
            onPageChange={handlePageChange}
            />
            : null}

        </Fragment>

    );
}
 
export default CustomersPage;