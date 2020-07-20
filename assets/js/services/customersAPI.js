import axios from "axios";
import { CUSTOMERS_API } from "../config";

// Fonction pour récupérer tout les customers
function findAll() {
    return axios
        .get(CUSTOMERS_API)
        .then(response => response.data['hydra:member']);
}

// Fonction pour supprimer un customer
function deleteCustomer(id) {
    return axios
        .delete(CUSTOMERS_API + "/" + id)
}

function find(id) {
    return axios
        .get(CUSTOMERS_API + "/" + id)
        .then(response => response.data);
}

function update(id, customer) {
    return axios
        .put(CUSTOMERS_API + "/" + id, customer);
}

function create(customer) {
    return axios
        .post(CUSTOMERS_API, customer);
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    update,
    create
}