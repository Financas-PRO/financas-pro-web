import axios from 'axios';

const api = 

    axios.create({
        baseURL: "https://financas-pro-api.test/" + "api/",
        withCredentials: true
        
    });


export default api;