import { IResponeUser } from "../models/Types/responseType";
import axiosClient from "./axiosClient";

class UserApi {
    static getUser(userId:string, page:number, limit:number){
        return axiosClient.get<undefined,IResponeUser>(`/get-user?userId=${userId}&page=${page}&limit=${limit}`)
    }
}
export default UserApi