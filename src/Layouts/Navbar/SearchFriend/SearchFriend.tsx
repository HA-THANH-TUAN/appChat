import React,{useEffect, useState} from 'react'
import {IoClose, IoCloseCircleSharp} from "react-icons/io5"
import { IUser } from '../../../models/Types/user.type'
import { useNavigate } from 'react-router-dom'
import AreaResultSearch from './AreaResultSearch'




export default function SearchFriend() {
    const [valueSearch, setValueSearch] =React.useState<string>("")
    const [inputElement, setInputElement] =React.useState<any>()

    const [dataUser, setDataUser] = React.useState<IUser[]>([])
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isFail, setIsFail] =React.useState<boolean>(false)
    const nav =useNavigate()


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
          <AreaResultSearch/>      

        </div>
    </div>
  )
}
