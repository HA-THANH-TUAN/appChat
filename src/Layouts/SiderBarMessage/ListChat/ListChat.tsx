import React, { useEffect } from 'react'
import {FiEdit} from "react-icons/fi"
import { useNavigate, useParams } from 'react-router-dom'
import { ItemChatSkeleton } from '../../Skeleton/ItemChatSkeleton'
import ItemChat from '../../../Components/ItemChat'
import classNames from 'classnames'
import { IConversation } from '../../../models/Types/chat.response.type'
import { useAppDispatch } from '../../../app/hooks/useCustomReduxTookit'
import { setIsRouteMessage, setNotifyNumberMessage } from '../../../features/notify/notifySlice'

interface IMessage{
    handleSetIsPopUp:  React.Dispatch<React.SetStateAction<boolean>> 
    handleSetTypeState:  React.Dispatch<React.SetStateAction<string>>
    data:IConversation[] | []
    status:"idle" | "error" | "success" | "loading"
}

interface IDataLocal {
    name:string,
    email:string, 
    id:string
}


const ListChat:React.FC<IMessage> = ({handleSetIsPopUp,handleSetTypeState, status,data}) => {
    const nav=useNavigate()
    const {conversationId} = useParams<string>()
    const handleItemChatClick = ( conversationId?:string)=>{
        nav(`/message/inbox/${conversationId}`)
    }
    const dispatch= useAppDispatch()
    
    useEffect(()=>{
        dispatch(setIsRouteMessage(true))
        dispatch(setNotifyNumberMessage(0))
        return ()=>{
            dispatch(setIsRouteMessage(false))

        }
    },[])



    let inforUser:IDataLocal | null = null
    const dataLocalUser = localStorage.getItem("user")
    if(dataLocalUser !==null){
        inforUser = JSON.parse(dataLocalUser)
    }
    if(inforUser==null){
        nav("/account/sign-in")
    }

  return (
    <div>
        <div className='h-screen w-[400px] bg-white border-r-2 border-zinc-300 '>
            <div className='py-3 px-6 h-32'>
                <div className='text-2xl flex justify-between items-center font-bold mt-6'>
                    <h2 className=''>{inforUser?.name}</h2>
                    <div className='flex items-center'>
                        <button className='hover:opacity-60 cursor-pointer text-black' onClick={()=>{handleSetIsPopUp(true)}}><FiEdit/></button>
                    </div>
                </div>
                <div>
                    <p className=' py-5 font-bold flex justify-between'>
                       <span className=''>Messages</span>
                       <span className='mr-5 text-zinc-600 hover:cursor-pointer'
                            onClick={()=>{
                                nav("/message/requests")
                                handleSetTypeState("requests")
                            }}
                       >Requests (<span>3</span>)</span>
                    </p>
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
                        [...Array(10)].map((_, i)=>(
                            <ItemChatSkeleton key={i}/>
                        )):
                        
                        data.map((conversation, i)=>{
                            if(conversation.type==="personal"){
                                if(inforUser?.id !==null){
                                    const user = conversation.members.find((member)=>member.user._id !==inforUser?.id)?.user
                                    if(user !==undefined){
                                        return <ItemChat key={conversation._id} isSelected={conversation._id===conversationId} name={user.name} onClick={()=>{handleItemChatClick( conversation._id)}} isOffline={user.status==="inactive"} />
                                    }
                                }
                            }else if(conversation.type === "group"){
                                if(inforUser?.id !==null){
                                    const listUser = conversation.members.map((member)=>{
                                        const name = member.user.name; 
                                        const indexStartLastName = name.lastIndexOf(" ")
                                        return name.slice(indexStartLastName)
                                    })
                                        const name = conversation.name ??= listUser.join()
                                        return <ItemChat key={conversation._id} name={name}  isSelected={conversation._id===conversationId} onClick={()=>{handleItemChatClick( conversation._id)}} isOffline={true}/>
                                }
                            }
                            return undefined
                        })
                    }
                </section>
            </div>
        </div>
    </div>
  )
}

export default ListChat