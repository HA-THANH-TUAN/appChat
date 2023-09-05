import { IPagination } from "./responseType";

export interface IUser {
    _id: string,
    name: string,
    email: string,
    status: userStatus,
    createdAt: string,
    updatedAt: string,
}

export interface IMetaDataUsers {
    pagination:IPagination,
    users:IUser[]
  }

enum userStatus {
    "active"="active",
    "inactive"="inactive",
}

