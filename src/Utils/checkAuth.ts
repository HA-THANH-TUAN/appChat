import Cookies from 'js-cookie';
export interface IcheckAuth {
    isLogin : boolean,
    user?: {
        name:string,
        id:string,
        email:string
    }

}
function checkAuth ():IcheckAuth{
    try {
        const refeshToken= Cookies.get("refresh_token")
        const dataUserLocalStorage = localStorage.getItem("user")
        if(refeshToken !==undefined && dataUserLocalStorage !==null){
            console.log("===> true")
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