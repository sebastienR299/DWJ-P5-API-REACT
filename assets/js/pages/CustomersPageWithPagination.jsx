import React, { Fragment, useEffect, useState } from 'react';
import { Button } from "reactstrap";
import Paginations from "../components/Paginations";
import axios from "axios";

const CustomersPageWithPagination = (props) => {

    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(response => {
            setCustomers(response.data['hydra:member']);
            setTotalItems(response.data["hydra:totalItems"]);
            setLoading(false);
        })

    }, [currentPage]);

    const handleDelete = (id) => {
        // Fait une copie du tableau des customers
        const originalCustomers = [...customers];

        // 1. Approche optimiste : Supprime l'utilisateur de l'affichage avant même qu'il soit supprimer de l'API
        setCustomers(customers.filter(customer => customer.id !== id));

        // 2. Requête de suppression
        // Si OK : console.log("OK")
        // Si NON OK : on remet le tableau des customers qui a été sauvegarder juste avant et on indique l'erreur.
        axios.delete("http://localhost:8000/api/customers/" + id)
        .then(response => console.log("OK"))
        .catch(error => {
            setCustomers(originalCustomers);
            console.log(error.response);
        });
    };

    const handlePageChange = (page) => {
        setLoading(true);
        setCurrentPage(page);
    };

    const paginatedCustomers = Paginations.getData(customers, currentPage, itemsPerPage);

    return (

        <Fragment>

            <h1>Liste des clients (Pagination)</h1>

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
                    {loading ? <tr><td>Chargement...</td></tr> : null}
                    {!loading && customers.map(customer => <tr key={customer.id}>
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
                        color="danger" 
                        className="rounded-pill"
                        disabled={customer.invoices.length > 0}
                        >Supprimer</Button>
                        </td>
                    </tr>)}
                    
                </tbody>
            </table>
            </div>
            <Paginations 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={totalItems} 
            onPageChange={handlePageChange}
            />

        </Fragment>

    );
}
 
export default CustomersPageWithPagination;