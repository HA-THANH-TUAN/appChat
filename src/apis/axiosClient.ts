import axios, {InternalAxiosRequestConfig, AxiosResponse} from "axios";
import { getCookie } from "../Utils/setCookie";

const axiosClient=axios.create({
    baseURL:process.env.REACT_APP_URL_DOMAIN,
    headers:{
        "Content-Type":"application/json"
    }
    ,validateStatus: function (status) {
      return status >= 200 // default
    },
})

// Add a request interceptor
axiosClient.interceptors.request.use(function (config:InternalAxiosRequestConfig) {
    // Do something before request is sent
    const requestNotToken = [
      {
        method: "post",
        url:"authentication/sign-in"
      }
      ,
      {
        method: "post",
        url:"authentication/sign-up"
      }
    ]
    const isAttachToken = requestNotToken.some((({method,url})=>config.url?.includes(url)&&config.method?.toLowerCase()===method.toLowerCase() ))
    console.log("goi req")
    if(isAttachToken===false){
      const objectCookie=getCookie()
      if(objectCookie!==undefined && Object.keys(objectCookie).length>0 ){
        config.headers['Authorization'] = `Bearer ${objectCookie.accessToken}`;
      }

    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response:AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  })

  export default axiosClient