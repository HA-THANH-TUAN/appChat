import Cookies from 'js-cookie';
import { IUserInfor } from '../models/Types/auth.response';



export interface IcheckAuth {
    isLogin : boolean,
    user?: IUserInfor

}
function checkAuth ():IcheckAuth{
    try {
        const refeshToken= Cookies.get("refresh_token")
        const dataUserLocalStorage = localStorage.getItem("user")
        if(refeshToken !==undefined && dataUserLocalStorage !==null){
            const userInfor= JSON.parse(dataUserLocalStorage)
            return {
                isLogin:true,
                user:userInfor
            }
        }
        return {
            isLogin:false,
        }
    } catch (error) {
        return {
            isLogin:false,
        }
    }
}

export default checkAuth