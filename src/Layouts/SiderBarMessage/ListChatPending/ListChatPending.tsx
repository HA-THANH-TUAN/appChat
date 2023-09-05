import React from 'react'
import { BsBellSlash } from 'react-icons/bs'
import { HiArrowLeft } from 'react-icons/hi'
import ItemChat from '../../../Components/ItemChat'
import { useNavigate } from 'react-router-dom'
import { ItemChatSkeleton } from '../../Skeleton/ItemChatSkeleton'
import classNames from "classnames"

interface IListChatPending{
    handleReturnListChat:React.Dispatch<React.SetStateAction<boolean>> 
    handleSetTypeState:React.Dispatch<React.SetStateAction<string>> 
    status:"idle" | "error" | "success" | "loading"
    data:any[]
  }

const ListChatPending: React.FC<IListChatPending> = ({handleReturnListChat ,handleSetTypeState, status}) => {
    const nav= useNavigate()

    const handleOnClick= ()=>{

    }
  return (
<div>
        <div className='h-screen w-[400px] bg-white border-r-2 border-zinc-300 '>
            <div className='py-3 px-6 h-20'>
                <div className='text-2xl flex items-center font-medium mt-3'>
                    <button className='hover:opacity-50'
                        onClick={()=>{
                            nav("/message/inbox/") ;handleSetTypeState("inbox")
                        }}
                    ><HiArrowLeft/></button> 
                    <p className='ml-4'>Message Request</p>
            
                </div>
            </div>
            <div className={classNames("flex flex-col h-[calc(100vh-128px)]",
                {
                    "overflow-y-hidden":status === "loading",
                    "overflow-y-auto": status !== "loading",
                }
            )}>
                   
                    <section className=''>
                        {
                            status ==="loading" ? 
                            [...Array(8)].map((_, i)=>(
                                <ItemChatSkeleton key={i}/>
                            )):

                            [...Array(4)].map((v, i)=>(
                                <ItemChat onClick={handleOnClick} key={i}/>
                            ))
                        }
                    </section>
            </div>
        </div>
    </div>
  )
}

export default ListChatPending