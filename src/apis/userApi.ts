import axios from "axios";
import { IResponeUser, IResponeUsers } from "../models/Types/responseType";
import axiosClient from "./axiosClient";

class UserApi {
    static getUsers(userId:string, page:number, limit:number){
        return axiosClient.get<undefined,IResponeUsers>(`/get-users?userId=${userId}&page=${page}&limit=${limit}`)
    }
    static getProfileUser(id:string){
        return axiosClient.get<undefined,IResponeUser>(`/get-profile/${id}`)
    }
}
export default UserApi