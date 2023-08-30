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

export interface IMetaDataSignUp extends IMetaDataSignIn{}