import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const getHeaders = (token?: string) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export default async function dataFetch(
  endpoint: string,
  method: string,
  data?: object,
  token?: string
) {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      data,
      headers: getHeaders(token),
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
