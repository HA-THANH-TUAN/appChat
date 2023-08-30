import { IResponseConversations } from "../models/Types/responseType";
import axiosClient from "./axiosClient";

class ChatApi {
    static async getConversation(){
        return axiosClient.get<undefined, IResponseConversations>("/chat/get-conversations")
    }
}

export default ChatApi