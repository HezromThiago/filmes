import axios from 'axios';


const api = axios.create({ // Cria a URL Base de requisições a api de filmes

    // Base URL: https://sujeitoprogramador.com/r-api/?api=filmes/
    baseURL: "https://sujeitoprogramador.com" 

    // r-api/?api=filmes/ (Todos os Filmes)

    // r-api/?api=filmes/123 (FILME COM ID = 123)
});

export default api; // export a função do AXIOS que cria base url

