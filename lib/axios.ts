import ax from 'axios'
export const API_BASE_URL =
    "https://snapstore-5510e-default-rtdb.firebaseio.com/";

const axios = ax.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
});
export default axios;
