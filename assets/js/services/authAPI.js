import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

/**
 * Requête HTTP d'authentification et stockage du token dans le storage et sur Axios
 * @param credentials (objet avec nom d'utilisateur et mot de passe)
 */
function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data)
        .then(data => {
            // Stocke le Token dans le localStorage
            window.localStorage.setItem("authToken", data.token);
            // On préviens axios qu'on à un header par défaut sur nos futurs requêtes
            setAxiosToken(data.token);
        })
        .catch(error => false);
};

/**
 * Déconnexion (Suppression du token du localStorage et sur Axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Positionne le token jwt sur Axios
 * @param token (Token jwt)
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Vérification du token au démarrage de l'application
 */
function setup() {
    // Voir si le token existe
    const token = window.localStorage.getItem("authToken");
    // Si le token est encore valide
    if(token) {
        const jwtData = jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log("Connexion établie");
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas
 */
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if(token) {
        const jwtData = jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};