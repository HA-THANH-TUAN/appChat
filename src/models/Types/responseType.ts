import { IUser } from "./user.type"

export interface IDataResponse<Idata> {
  status:number,
  message:string,
  metadata:Idata|null
}


export interface IMetaDataTokens{
  accessToken: string,
  refreshToken:string
}

export interface IMetaDataSignInUser{
  name:string,
  email:string,
  userId:string
}

export interface IMetaDataSignIn{
  tokens:IMetaDataTokens,
  user:IMetaDataSignInUser
}


export interface IPagination {
  total: number,
  page:number,
  limit:number

}

export interface IMetaDataUser {
  pagination:IPagination,
  users:IUser[]
}


export interface IMetaDataSignUp extends IMetaDataSignIn{}



export interface IResponeUser extends IDataResponse<IMetaDataUser>{}

export interface IResponeSignUp extends IDataResponse<IMetaDataSignIn>{}

export interface IResponeSignIn extends IDataResponse<IMetaDataSignIn>{}

export interface IResponeSignOut extends IDataResponse<null>{}

