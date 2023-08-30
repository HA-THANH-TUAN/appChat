import Cookies from "js-cookie"
import AuthenApi, { IBodyRefreshToken } from "../apis/authenApi"

const handleRefreshToken = async ()=>{ 
    try {
        const refreshToken = Cookies.get("refresh_token")
        if(refreshToken !==undefined){
            const body:IBodyRefreshToken = {refreshToken}
            const dt= await AuthenApi.refreshToken(body)
            const metaData= dt.metadata
            if(metaData!==null){
                const {accessToken, refreshToken}=metaData.tokens
                console.log("setcookie after refresh token")
                Cookies.set("access_token", accessToken)
                Cookies.set("refresh_token", refreshToken)
                return true
            }
        }
        return false
    } catch (error) {
        console.log("error ::: handleRefreshToken")
        return false
    }
}

export default handleRefreshToken