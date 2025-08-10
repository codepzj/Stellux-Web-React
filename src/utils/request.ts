import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
  async (response) => {
    if (response.data.code !== 0) {
      const errMessage = response.data.msg || "操作失败";
      return Promise.reject(new Error(errMessage));
    }

    return response.data;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error("网络错误，请稍后重试"));
    } else {
      return Promise.reject(new Error(error.response.data.msg || "操作失败"));
    }
  },
);

export default request;
