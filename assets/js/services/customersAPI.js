import axios from "axios";

// Fonction pour récupérer tout les customers
function findAll() {
    return axios
        .get("http://localhost:8000/api/customers")
        .then(response => response.data['hydra:member']);
}

// Fonction pour supprimer un customer
function deleteCustomer(id) {
    return axios
        .delete("http://localhost:8000/api/customers/" + id)
}

export default {
    findAll,
    delete: deleteCustomer
}