import axios from 'axios';

const api = 

    axios.create({
        baseURL: "https://localhost:444/" + "api/",
    });


export default api;