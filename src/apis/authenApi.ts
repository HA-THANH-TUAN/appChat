import { IResponeSignIn, IResponeSignUp } from "../models/Types/responseType"
import axiosClient from "./axiosClient"
// http://localhost:3003/authentication/sign-up

export interface IFomSignIn {
    email: string,
    password: string
}
export interface IFomSignUp {
    name:string,
    email: string,
    password: string
}

class AuthenApi {
    static signIn=(data:IFomSignIn)=>{
        return axiosClient.post<undefined,IResponeSignIn>("authentication/sign-in",data)
    }
    static signUp=(data:IFomSignUp)=>{
        return axiosClient.post<undefined,IResponeSignUp>("authentication/sign-up",data)
    }
}

export default AuthenApi
