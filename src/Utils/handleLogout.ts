import Cookies from "js-cookie"

export const handleLogout = ()=>{
    localStorage.removeItem("user")
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
}