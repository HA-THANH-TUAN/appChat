import { IMetaDataSignIn } from "./auth.response"
import { IConversation } from "./chat.response.type"
import {IMetaDataUsers, IUser } from "./user.type"

export interface IDataResponse<Idata> {
  status:number,
  message:string,
  metadata:Idata|null
}

export interface IPagination {
  total: number,
  page:number,
  limit:number
}



export interface IResponseConversations extends IDataResponse<IConversation[]>{}

export interface IMetaDataRefreshToken extends Omit<IMetaDataSignIn, "user">{}

export interface IResponeUser extends IDataResponse<IUser>{}

export interface IResponeUsers extends IDataResponse<IMetaDataUsers>{}

export interface IResponeSignUp extends IDataResponse<IMetaDataSignIn>{}

export interface IResponeSignIn extends IDataResponse<IMetaDataSignIn>{}

export interface IReponseRefreshToken extends IDataResponse<IMetaDataRefreshToken>{}

export interface IResponeSignOut extends IDataResponse<null>{}
