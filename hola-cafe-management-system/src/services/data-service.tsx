import axios from "axios"

const headers = {
    "Content-Type": "application/json",
}

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
})

export default async function dataFetch(endpoint: string, method: string = "GET", data: object | null = null, config: object = {}) {

    try {
        const response = await api.request({
            url: endpoint,
            method,
            data,
            headers: headers,
            ...config,
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
