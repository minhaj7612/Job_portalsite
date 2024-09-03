import axios from "axios";

const Api = axios.create(
    {
        baseURL:"https://job-portalsite.onrender.com//api/v6",
        withCredentials:true,
    }
)

export default Api;