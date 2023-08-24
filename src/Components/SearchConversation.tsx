import React, {FC} from 'react'
import {GrClose} from "react-icons/gr"

interface ISearchConversation{

    handleSetIsPopUp:  React.Dispatch<React.SetStateAction<boolean>> 
}

const SearchConversation: FC<ISearchConversation>= ({handleSetIsPopUp})=> {
  return (
    <div className='fixed top-0 right-0 w-screen h-screen bg-[#00000084]'>
        <div className='w-screen h-screen relative flex justify-center items-center'>
            <div className='absolute top-0 right-0 left-0 bottom-0' onClick={()=>{handleSetIsPopUp(false)}}></div>
            <div className='max-w-[500px] mx-5 flex-1 min-h-fit bg-white relative rounded-md'>
                <section className='relative'>
                    <button className='w-8 h-8 text-xl hover:opacity-25 absolute top-0 right-0' onClick={()=>{handleSetIsPopUp(false)}}><GrClose/></button>
                    <h2 className=' px-3 my-3 text-center font-bold text-lg'>Tin nhắn</h2>
                    <p className=' px-3 border-t border-b flex items-center'><span className=' font-bold mr-3'>To: </span><input className='flex-1  focus:outline-none my-2 '/></p>
                    <ul className='h-[300px] overflow-y-auto'>
                        <li className='flex items-center my-3 py-[5px] px-3 cursor-pointer hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                        <li className='flex items-center my-3 py-[5px] px-3 hover:bg-zinc-200'>
                            <div className='w-12 h-12 bg-black rounded-[50%] mr-2'><span className='w-full h-full'></span></div>
                            <p className='flex flex-col'><span className='text-sm text-zinc-600 font-medium'>HA THANH TUAN</span><span className='text-sm text-zinc-500 font-medium'>Phen</span></p>
                        </li>
                    </ul>
                    <div className=' px-1 flex justify-center '><button className='my-3  flex-1 mx-5 text-white font-medium py-1 bg-blue-500 rounded '
                        onClick={(e)=>{console.log("button")}} 
                    >Chat</button></div>
                </section>
                
            </div>
        </div>

    </div>
  )
}

export default  SearchConversation