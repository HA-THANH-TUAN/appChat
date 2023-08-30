import React from 'react'
import {FiEdit} from "react-icons/fi"
import {BsBellSlash} from "react-icons/bs"
import { useQuery } from 'react-query'
import ChatApi from '../../apis/chatApi'
interface IMessage{

    handleSetIsPopUp:  React.Dispatch<React.SetStateAction<boolean>> 
}


const ListChat:React.FC<IMessage> = ({handleSetIsPopUp}) => {


    const query = useQuery({
        queryKey:["conversations"],
        queryFn: ChatApi.getConversation
    })

    console.log("query:::",query)


  return (
    <div>
        <div className='h-screen w-[400px] bg-white border-r-2 border-zinc-300 '>
            <div className='py-3 px-6 h-32'>
                <div className='text-2xl flex justify-between items-center font-bold mt-6'>
                    <h2 className=''>Ha Thanh Tuan</h2>
                    <div className='flex items-center'>
                        <button className='hover:opacity-60 cursor-pointer text-black' onClick={()=>{handleSetIsPopUp(true)}}><FiEdit/></button>
                    </div>
                </div>
                <div>
                    <p className=' py-5 font-bold flex justify-between'>
                       <span className=''>Messages</span>
                       <span className='mr-5 text-zinc-600 hover:cursor-pointer'>Requests (<span>3</span>)</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-col overflow-y-auto h-[calc(100vh-128px)] '>
                   
                    <ul className=''>
                        {
                            [...Array(100)].map((v, i)=>(
                                <li key={i} className='px-4 py-2 my-1 hover:bg-zinc-100 hover:cursor-pointer'>
                                    <div className='flex items-center'>
                                        <div className='flex flex-1 items-center' >
                                            <div className='w-14 h-14 bg-slate-600 rounded-[50%] relative'>
                                                    <span className=' absolute bottom-[2px] right-0 min-w-[16px] h-[16px] rounded-tr-[8px] rounded-tl-[8px] px-[2px] rounded-br-[8px] rounded-bl-[8px] border-[3px] 
                                                        leading-[0] border-white bg-[#e7fc85] bg-clip-padding text-[9px]  font-bold flex justify-center items-center'
                                                    >18h</span>
                                                    {/* <span className='inline-block absolute bottom-[2px] right-0 w-[14px] h-[14px] rounded-[50%] border-2 border-white bg-green-600 bg-clip-padding'></span> */}
                                            </div>
                                            <div className='ml-2'>
                                                <h2>Ha Thanh Tuan</h2>
                                                <p>Hoạt động 2 giờ trước </p>
                                            </div>
                                        </div>
                                        <div className='pl-3'>
                                            {
                                                i%2===1 &&<p className='w-6 h-6 flex justify-center items-center text-xl'><BsBellSlash/></p>
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    </div>
  )
}

export default ListChat