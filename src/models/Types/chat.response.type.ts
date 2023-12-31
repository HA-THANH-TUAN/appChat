import { IUser } from "./user.type";

export interface IConversation {
    _id:string, 
    name:string | null,
    type:typeConversation,
    order:number,
    statusConversation:string,
    isDeleted:boolean,
    members:IMember[],
    createAt:string,
    updatedAt:string,
}

export interface IMember {
    _id:string, 
    user:Omit<IUser, "createdAt" | "updatedAt" >
    role:roleConversation,
}


export enum typeConversation {
    "personal"="personal",
    "group"="group",
}
export enum roleConversation {
    "member"="member",
    "leader"="leader",
}