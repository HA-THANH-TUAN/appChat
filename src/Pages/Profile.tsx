import React, {useState,useEffect} from 'react'
import axiosClient from '../apis/axiosClient'
import AuthenApi, { IFormSignOut } from '../apis/authenApi'
import { getCookie } from '../Utils/setCookie'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const nav=useNavigate()
  const handleLogout=()=>{
    const fethApiLogout= async ()=>{
      const objectCookie = getCookie()
      console.log("objectCookie:::",objectCookie)
      if(objectCookie!==undefined){
        const data:IFormSignOut ={
          userId:objectCookie["userId" as keyof IFormSignOut],
          idToken:objectCookie["idToken" as keyof IFormSignOut]
        }
        const result=await AuthenApi.signOut(data)
        if(result.status===200){
          alert("OKE men")
          localStorage.removeItem("name")
          localStorage.removeItem("email")
          localStorage.removeItem("isLogin")
        }
        else{
          localStorage.removeItem("isLogin")
          alert("Loi nha")
        }
        nav("/")

      }
    }
    fethApiLogout()
  }
  const {userId:userIdParams}=useParams<string>()
  const [isOwn , setIsOwn]=useState<boolean>()

  const [dataProfile, setDataProfile]=useState()

  useEffect (() => {
    const userIdCookie=getCookie()?.userId
    let isOwn= userIdCookie !== undefined && userIdCookie !== undefined ? userIdCookie===userIdParams : false;
    setIsOwn(isOwn)
    
  }, [userIdParams])
  
  const handleFollow = ()=>{
    
  }
  const clickMessage = ()=>{
    
  }

  return (
    <div className='flex-1'>
      {
        isOwn !==undefined&&
        <>
          {
            isOwn===false ?
            <section>
              <button className='b'>ket ban</button>
              

            </section>:
            <section className='mx-auto  max-w-3xl '>
              <div>
                <div className='flex items-center'>
                  <figure className='w-24 h-24 mx-10'><span className='w-full h-full bg-red-500 rounded-[50%] inline-block'></span></figure>
                  <section className='flex-1'>
                    <ul className='flex items-center'>
                      <li className='mr-5 font-semibold'><p>Ha Thanh Tuan</p></li>
                      <li><button className='bg-blue-400 text-white px-4 py-1 rounded '
                        onClick={handleFollow}
                      >
                        Follow</button></li>
                        
                      <li className='mx-5'><button className='bg-blue-400 text-white px-4 py-1 rounded '
                        onClick={clickMessage}
                      >
                        Message</button></li>
                    </ul>
                    <ul className='flex items-center'>
                      <li className='mr-5'><span className='mr-2'>0</span><span>post</span></li>
                      <li className='mr-5'><span className='mr-2'>5</span><span>followers</span></li>
                      <li className='mr-5'><span className='mr-2'>7</span><span>following</span></li>
                    </ul>
                  </section>

                </div>
                <button onClick={handleLogout}>LogOut</button>

              </div>
              <div>

              </div>
            </section>
          }
        
        
        </>
      }


    </div>
  )
}

export default Profile