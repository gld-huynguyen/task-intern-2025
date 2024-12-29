import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_REACT_TODO_URL,
});

const privateHttp = axios.create({
    baseURL: import.meta.env.VITE_REACT_TODO_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export { http, privateHttp };
