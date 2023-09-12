export interface IMetaDataTokens{
    accessToken: string,
    refreshToken:string
}
export interface IUserInfor {
  name:string, id:string, email:string
}


export interface IMetaDataSignIn{
  tokens:IMetaDataTokens,
  user:IUserInfor
}

export interface IMetaDataSignUp extends IMetaDataSignIn{}