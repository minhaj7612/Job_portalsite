import axios from "axios";

const Api = axios.create(
    {
        baseURL:"http://localhost:9000/api/v6",
        withCredentials:true,
    }
)

export default Api;