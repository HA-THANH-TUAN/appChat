import React,{useEffect, useState} from 'react'
import { CgClose } from 'react-icons/cg'
import {IoClose, IoCloseCircleSharp} from "react-icons/io5"
import {TfiClose} from "react-icons/tfi"
import axiosClient from '../../../apis/axiosClient'
import AuthenApi from '../../../apis/authenApi'
import { getCookie } from '../../../Utils/setCookie'
import UserApi from '../../../apis/userApi'
import { IPagination } from '../../../models/Types/responseType'
import { IUser } from '../../../models/Types/user.type'
import { useNavigate } from 'react-router-dom'



// interface IPagination{
//     page:number,
//     limit:number
// }

export default function SearchFriend() {
    const [valueSearch, setValueSearch] =React.useState<string>("")
    const [inputElement, setInputElement] =React.useState<any>()
    const [pagination, setPagination]= React.useState<IPagination>({page:1, limit:20 , total:1})
    const [dataUser, setDataUser] = React.useState<IUser[]>([])
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isFail, setIsFail] =React.useState<boolean>(false)
    const nav =useNavigate()

    useEffect(() => {
      const handleGetUser =async ()=>{
        const userIdCookie =getCookie()?.userId 
        if(userIdCookie){
            const userId= userIdCookie
            const result = await UserApi.getUser(userId , pagination.page , pagination.limit)
            console.log("result:::",result)

            setPagination((stP)=>{
                const pagi = result.metadata?.pagination
                return pagi===undefined ? stP : pagi
            })
            
            setDataUser((stU)=>{
                const dt= result.metadata?.users
                return dt ===undefined ? stU : dt
            })
        }
      }
      handleGetUser()
    
     
    }, [pagination.limit])
    

    const handleSetTime= ()=>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },200)
    }
  const handleOnchangeInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const valueInput=e.target.value
    if(!inputElement){setInputElement(e.target)};
    if(valueInput!==""){
        handleSetTime()
    }
    setValueSearch(valueInput);
  }


  return (
    <div className='fixed left-16 top-0 h-screen w-[400px] bg-white border-r-2 border-zinc-300 rounded-tr-2xl rounded-br-2xl '>
        <div className='py-3 px-6 border-b border-zinc-300 h-36'>
            <div>
                <h2 className='text-2xl font-semibold mx-2 mb-6'>Search</h2>
                <div className='flex relative pb-3'>
                    <input type="text" value={valueSearch} placeholder='Search...' className='w-full h-10 px-3 rounded-md focus:outline-none bg-zinc-100'
                        onChange={handleOnchangeInput}
                    />
                    {/*  */}
                    {isLoading ? <img className='absolute hover:text-neutral-900 cursor-pointer text-slate-600 w-[18px] h-[18px] top-[11px] right-3' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'/>:
                        valueSearch!=="" ? <span onClick={()=>{setValueSearch(""); inputElement.focus()}} className='absolute hover:text-neutral-900 cursor-pointer text-slate-600 text-lg top-[11px] right-3 '><IoCloseCircleSharp/></span>:undefined
                    }
                </div>
            </div>
        </div>
        <div className='flex flex-col overflow-y-auto h-[calc(100vh-144px)] '>
            {
                // !valueSearch ? 

                // <>
                // <p className='px-4 py-5 font-medium flex justify-between'>
                //    <span>Recent</span>
                //    <span className='text-blue-600 '>Clear all</span>
                // </p>
                // <ul className=''>
                //     {
                //         dataUser.map((user, i)=>(
                //             <li key={i} className='px-4 py-2 my-1 hover:bg-zinc-100 hover:cursor-pointer'>
                //                 <div className='flex items-center'>
                //                     <div className='flex flex-1 items-center' >
                //                         <div className='w-12 h-12 bg-slate-600 rounded-[50%]'></div>
                //                         <div className='ml-2'>
                //                             <h2>{user.name}</h2>
                //                         </div>
                //                     </div>
                //                     <span className='w-8 h-8 text-2xl flex justify-center items-center text-zinc-500 pointer-events-none rounded-lg '><CgClose/></span>
                //                 </div>
                //             </li>
                //         ))
                //     }
                // </ul>
                // </>: 
                <ul className=''>
                    {
                        !isFail ?
                            isLoading ? "loading" :
                            dataUser.length>0 ? 
                                dataUser.map((v, i)=>(
                                    <li key={i} className={`px-4 py-2 my-1 hover:bg-zinc-100 cursor-pointer`}>
                                        <div className='flex items-center'>
                                            <div className='flex flex-1 items-center' >
                                                <section className='flex flex-1 items-center'>
                                                <div className='w-12 h-12 bg-slate-600 rounded-[50%] flex justify-center items-center text-white text-xl font-semibold'>{v.name.slice(0,1)}</div>
                                                <div className='ml-2'>
                                                    <h2>{v.name}</h2>
                                                </div>
                                                </section>
                                                <>{console.log(v)}</>
                                                <button onClick={()=>{nav("/")}}  className='text-white text-sm px-[10px] font-medium py-2 rounded-md hover:bg-blue-400 bg-blue-500'>Message</button>
                                            </div>
                                            {/* <span className='w-8 h-8 text-2xl flex justify-center items-center text-zinc-500 pointer-events-none rounded-lg '><CgClose/></span> */}
                                        </div>
                                    </li>
                                ))
                            :"Not Data User App"
                        
                        : "Error"
                    }
                
                </ul>
                
            }
            

        </div>
    </div>
  )
}
