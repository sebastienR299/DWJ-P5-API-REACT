// Demande à Node d'injecter la variable d'environnement concernant l'url de l'API depuis le fichier .env
export const API_URL = process.env.API_URL;

export const CUSTOMERS_API = API_URL + "customers";
export const INVOICES_API = API_URL + "invoices";
export const USERS_API = API_URL + "users";
export const LOGIN_API = API_URL + "login_check";