import axios from 'axios';

const api = 

    axios.create({
        baseURL: "https://financaspro.cloud/" + "api/",
        withCredentials: true
    });


export default api;
