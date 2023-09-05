import { IResponseConversations } from "../models/Types/responseType";
import axiosClient from "./axiosClient";

class ChatApi {
    static async getConversation(){
        return axiosClient.get<undefined, IResponseConversations>("/chat/get-conversations")
    }
    static async getConversationMessage(userId:string){
        return axiosClient.get<undefined, any>(`/chat/get-conversations-message/${userId}`)
    }
}

export default ChatApi