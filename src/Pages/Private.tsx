import  React , {useEffect} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


import MainPrivate from '../Layouts/MainPrivate/MainPrivate';
import Cookies from 'js-cookie';
import { useAppSelector } from '../app/hooks';




const Private : React.FC = () => {
  useAppSelector((state)=>state.refreshApp.stateRefresh)
  
  const isLogin = Boolean(Cookies.get("refresh_token"))
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