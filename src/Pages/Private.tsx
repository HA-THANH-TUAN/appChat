import  React , {useEffect} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


import MainPrivate from '../Layouts/MainPrivate/MainPrivate';
import Cookies from 'js-cookie';




const Private : React.FC = () => {
  const isLogin = Boolean(Cookies.get("refresh_token"))
  console.log("+++++>>>>>",isLogin)
  const location = useLocation()
  useEffect(() => {    
  }, [location.pathname])

  return (
    
    <>
      {
        isLogin ?
        <MainPrivate><Outlet/></MainPrivate>
        : location.pathname === "/account/sign-up" ? <Navigate to={"/account/sign-up"}/> 
        : <Navigate to={"/account/sign-in"}/> 
      }
    </>
  )
}

export default Private