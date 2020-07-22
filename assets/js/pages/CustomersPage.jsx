import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    FormGroup,
    Input
} from "reactstrap";
import Paginations from "../components/Paginations";
import CustomersAPI from "../services/customersAPI";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from "../components/Loaders/TableLoader";

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Permet la récupération des customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
            setLoading(false);
        } catch(error) {
            toast.error("Impossible de charger les clients");
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
            await CustomersAPI.delete(id);
            toast.success("Le client à bien été supprimé");
        } catch(error) {
            setCustomers(originalCustomers);
            toast.error("La suppression du client n'a pas fonctionner");
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

            <div className="bloc-title d-flex justify-content-between align-items-center">
                <h1 className="title-page text-center mb-4">Clients</h1>
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

            <div className="table-responsive-lg">
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

                {!loading && (
                <tbody>
                    {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td><Link to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link></td>
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
                )}

            </table>

            {loading && <TableLoader />}

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