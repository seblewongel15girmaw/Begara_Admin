import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Create an instance of Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://jeroccia.omishtujoy.com/api",
  timeout: 5000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // console.log("Request interceptor:", config);
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    const user = window.localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      config.headers["Authorization"] = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    // console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("Response interceptor:", response);

    return response;
  },
  (error: AxiosError) => {
    // Handle response errors
    const ExpectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;
    if (!ExpectedError) {
      console.log("Unexpected Error", error);
    }

    if (error.response && error.response.status === 401) {
      // Unauthorized error handling
      window.localStorage.removeItem("user"); // Delete user from localStorage
      // Redirect to login page, replace '/login' with your actual login page route
      window.location.replace("/login");
    }

    return Promise.reject(error); // pass control to catch
  }
);

export default axiosInstance;
