import React from 'react'
import {FiEdit} from "react-icons/fi"
import {BsBellSlash} from "react-icons/bs"

const ListChat = () => {
  return (
    <div>
        <div className='h-screen w-[400px] bg-white border-r-2 border-zinc-300 '>
            <div className='py-3 px-6 h-32'>
                <div className='text-2xl flex justify-between items-center font-bold mt-6'>
                    <h2 className=''>Ha Thanh Tuan</h2>
                    <div className='flex items-center'>
                        <span className='hover:opacity-60 cursor-pointer text-black'><FiEdit/></span>
                    </div>
                </div>
                <div>
                    <p className=' py-5 font-bold flex justify-between'>
                       <span className=''>Messages</span>
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
                                            <div className='w-14 h-14 bg-slate-600 rounded-[50%]'></div>
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