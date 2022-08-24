import axios from "axios";


export const admin = axios.create({
  // baseURL:  `http://localhost:8000`,
  baseURL:  `https://managmentsys-murad.herokuapp.com/api`,
  headers: { "Content-Type": "application/json" },
});

admin.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null;
    config.headers["accept-language"] = localStorage.getItem("locale")
      ? localStorage.getItem("locale")
      : "en";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

admin.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("access_token");
                window.location.reload();
            } else {
                console.log('problem!')
            }
            return Promise.reject(error);
        }
    }
);
export default admin;

