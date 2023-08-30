import Cookies from "js-cookie"

const handleSetToken = (access:string, refresh:string)=>{
    Cookies.set("access_token",access, {
        
    })
    Cookies.set("refresh_token",refresh)


}

export default handleSetToken