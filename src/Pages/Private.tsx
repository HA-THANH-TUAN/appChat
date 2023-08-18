import  React , {useEffect} from 'react'
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom'
import Navbar from '../Layouts/Navbar/Navbar'

const Private : React.FC = () => {
  const isLogin = localStorage.getItem("isLogin")
  const location = useLocation()
  useEffect(() => {    
  }, [location.pathname])
  
  // localStorage.setItem()

  return (
    
    <>
      {
        isLogin ==="true" ?
        <div className='flex'>
          <Navbar></Navbar>
          <Outlet></Outlet> 
        </div>
        : location.pathname === "/account/sign-up" ?  <Navigate to={"/account/sign-up"}/> 
        : <Navigate to={"/account/sign-in"}/> 
      }
    </>
  )
}

export default Private