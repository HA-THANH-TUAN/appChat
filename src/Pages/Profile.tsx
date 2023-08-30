import React, {useState,useEffect, useId} from 'react'
import axiosClient from '../apis/axiosClient'
import AuthenApi, { IFormSignOut } from '../apis/authenApi'
import { getCookie } from '../Utils/setCookie'
import { useNavigate, useParams } from 'react-router-dom'
import UserApi from '../apis/userApi'
import { IUser } from '../models/Types/user.type'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'

const Profile = () => {
  const {userId}=useParams<string>()
  const [dataProfile, setDataProfile]=useState<IUser>()
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const [error, setError]=useState<boolean>(false)
 




  // useEffect(()=>{
  //   if(userId !==undefined){
  //     const fecthUserProfile = async()=>{
  //       try {
  //         setIsLoading(true)
  //         setError(false)
  //         const data = 
  //         const dtProfile= data.metadata
  //         if(dtProfile!==null){
  //           setDataProfile(dtProfile)
  //         }
          
  //       } catch (error) {
  //         setError(true)
          
  //       }finally{
  //       setIsLoading(false)
  //      }
  //     }
  //     fecthUserProfile()
  //   }
  //   console.log("userId===>:::", userId)
  // },[userId])

  const {data, status} = useQuery({
    queryKey:["profile",userId],
    queryFn:userId ? ()=>UserApi.getProfileUser(userId) : undefined,
    enabled : Boolean(useId)
  })
  
  





  const nav=useNavigate()

  const handleLogout=()=>{
    const fethApiLogout= async ()=>{
        const result=await AuthenApi.signOut()
        if(result.status===200){
          alert("OKE men")
          localStorage.removeItem("user")
          Cookies.remove("access_token")
          Cookies.remove("refresh_token")
          nav("/account/sign-in")
        }
        else{
          alert("Loi nha")
        }
    }
    fethApiLogout()
  }

  
  const handleFollow = ()=>{
    
  }
  const clickMessage = ()=>{
    
  }
  
  if(status==="loading"){
    return <div>---------------------Loading--------------------</div>
  }
  if(status==="error"){
    
    return <div>---------------------Error--------------------</div>
  }

  const checkIsOwn = ()=>{
   const dataUserLocalStorage= localStorage.getItem("user")
   if(dataUserLocalStorage !==null){
     const id= JSON.parse(dataUserLocalStorage).id
     return userId===id
   }
  return false
 } 

 const isOwn = checkIsOwn()
 console.log("isOwn:::",isOwn)

  return (
    <div className='flex-1'>
     
          {
            <section className='mx-auto  max-w-3xl '>
              <div>
                <div className='flex items-center'>
                  <figure className='w-24 h-24 mx-10'><span className='w-full h-full bg-red-500 rounded-[50%] inline-block'></span></figure>
                  <section className='flex-1'>
                    <ul className='flex items-center'>
                      <li className='mr-5 font-semibold text-xl'><p>{data?.metadata?.name}</p></li>
                      {
                        !isOwn &&  
                        <li>
                          <button className='bg-blue-400 text-white px-4 mx-2 py-1 rounded '
                            onClick={handleFollow}
                          > Follow</button>
                          <button className='bg-blue-400 text-white px-4 mx-2 py-1 rounded '
                            onClick={()=>{
                              nav(`/message/inbox/${useId}`)
                            }}
                          >Message</button>
                        </li>
                      }
                        
                      {/* <li className='mx-5'>
                      </li> */}
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
    </div>
  )
}

export default Profile