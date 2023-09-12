import axios, {InternalAxiosRequestConfig, AxiosResponse, Axios} from "axios";
import Cookies from "js-cookie";
import handleLoginAgain from "../Utils/handleLoginAgain";
import { store } from "../app/store";
import {refreshApp} from "../features/refreshApp/refreshApp";
import handleRefreshToken from "../Utils/handleRefreshToken";
import { resetAuth } from "../features/auth/authSlice";

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
      console.log("dinh kem token")
      const access_token= Cookies.get("access_token")
      if(access_token!==undefined){
        config.headers['Authorization'] = `Bearer ${access_token}`;
      }

    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use( async(response:AxiosResponse) => {
    const dtResponse= response.data

    const isLoginAgain = dtResponse.message==="login again" && dtResponse.status===401
    let isExprire = dtResponse.message==="expired" && dtResponse.status===401
    // console.log("isLoginAgain:::",isLoginAgain)
    // console.log("isExprire:::",isExprire)

    // console.log("interception Response::", isExprire)

    if(isLoginAgain){
      store.dispatch(refreshApp())
      handleLoginAgain()
      // console.log("login lai")
    }
    if (isExprire){

      // console.log("het han ne")
      const resultHandleRefreshToken = await handleRefreshToken()
      if(resultHandleRefreshToken){
        // console.log("responseresponseresponse::",response)
        
       return await  axiosClient(response.config)
      }
      else{
        store.dispatch(refreshApp())
        store.dispatch(resetAuth())
        handleLoginAgain()
      }
    }
    


    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return dtResponse;

  }, function (error) {
    console.log("error in interception response", error)
    // if(error.message==="retry api"){
    //   console.log(">>>>> Goi lai sau kkhi refresh token")

    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  })

  export default axiosClient