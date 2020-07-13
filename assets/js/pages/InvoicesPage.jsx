import moment from "moment";
import React, { useEffect, useState } from 'react';
import {
    FormGroup,
    Input
} from "reactstrap";
import Paginations from "../components/Paginations";
import invoicesAPI from "../services/invoicesAPI";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Permet la récupération des invoices
    const fetchInvoices = async () => {
        try {
            const data = await invoicesAPI.findAll();
            setInvoices(data)
        } catch(error) {
            console.log(error.response);
        }
    }

    // Au chargement du composant, on va chercher les invoices
    useEffect(() => {
        fetchInvoices();
    }, []);
 
    // Permet la suppression d'une invoice
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await invoicesAPI.delete(id);
        } catch(error) {
            setInvoices(originalInvoices);
            console.log(error.response)
        }
    }

    // Fonction pour le changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Fonction pour rechercher un customer
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }
    
    // Nombre d'items par page
    const itemsPerPage = 10;

    // Gestion de la recherche
    const filteredInvoices = invoices.filter(
        i => 
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().includes(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

    // Pagination des données
    const paginatedInvoices = Paginations.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    // Permet le changement de format Date, via la librairie Moment.js
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    return ( 
        <>
            <h1>Liste des factures</h1>

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

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Numéro</th>
                        <th className="text-center">Client</th>
                        <th className="text-center">Date d'envoi</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Montant</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedInvoices.map(invoice => 
                        <tr key={invoice.id}>
                            <td className="text-center">{invoice.chrono}</td>
                            <td className="text-center">{invoice.customer.firstName} {invoice.customer.lastName}</td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center"><span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span></td>
                            <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                            <td className="text-center">
                                <button className="btn btn-sm btn-primary">Editer</button>
                                <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(invoice.id)}
                                >Supprimer</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {filteredInvoices.length > itemsPerPage ?
            <Paginations 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            onPageChange={handlePageChange} 
            length={filteredInvoices.length} 
            />
            : null}
        </>
     );
}
 
export default InvoicesPage;