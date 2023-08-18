
export interface IDataResponse<Idata> {
  status:number,
  message:string,
  metadata?:Idata
}


export interface ITokens{
  accessToken: string,
  refreshToken:string,
  idToken:string

}

export interface IDataMetaSignIn{
  name:string,
  email:string,
  tokens:ITokens
}
export interface IDataMetaSignUp extends IDataMetaSignIn{}



export interface IResponeSignUp extends IDataResponse<IDataMetaSignIn>{}
export interface IResponeSignIn extends IDataResponse<IDataMetaSignIn>{}

