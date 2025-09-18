import axios from "axios";
const instance = axios.create({
  baseURL: "http://10.64.12.16:3001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default instance;

export const apiclient = {
  get: (url: string) => instance.get(url),
  post: (data: object, url: string) => instance.post(url, data),
  put: (data: object, url: string) => instance.put(url, data),
  delete: (url: string) => instance.delete(url),
};