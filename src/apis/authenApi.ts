import { IMetaDataTokens } from "../models/Types/auth.response"
import { IReponseRefreshToken, IResponeSignIn, IResponeSignOut, IResponeSignUp } from "../models/Types/responseType"
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

export interface IFormSignOut {
    idToken:string,
    userId: string,
}

export interface IBodyRefreshToken extends Omit<IMetaDataTokens, "accessToken">{}

class AuthenApi {
    static signIn=(bodyData:IFomSignIn)=>{
        return axiosClient.post<undefined,IResponeSignIn>("/authentication/sign-in",bodyData)
    }
    static signUp=(bodyData:IFomSignUp)=>{
        return axiosClient.post<undefined,IResponeSignUp>("/authentication/sign-up",bodyData)
    }
    static signOut=()=>{
        return axiosClient.post<undefined,IResponeSignOut>(`/authentication/sign-out/`)
    }
    static refreshToken=(bodyData:IBodyRefreshToken)=>{
        return axiosClient.post<undefined, IReponseRefreshToken>(`/authentication/refresh-token/`, bodyData)
    }
}

export default AuthenApi
