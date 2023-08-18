
import React from 'react'
import { CgClose } from 'react-icons/cg'
import {IoClose, IoCloseCircleSharp} from "react-icons/io5"
import {TfiClose} from "react-icons/tfi"

export default function Notification() {
    const [valueSearch, setValueSearch] =React.useState<string>("")
    const [inputElement, setInputElement] =React.useState<any>()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

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
    <div className='fixed left-16 top-0 h-screen w-[400px] bg-white border-r-2 border-zinc-300 '>
        <div className='py-3 px-6 h-16'>
            <div>
                <h2 className='text-2xl font-bold mx-2 mb-6 mt-3'>Notification</h2>
                <div className='flex relative pb-3'>
                    
                </div>
            </div>
        </div>
        <div className='flex flex-col overflow-y-auto h-[calc(100vh-64px)] '>
                <p className='px-4 py-5 font-medium flex justify-between'>
                   <span>This month</span>
                
                </p>
                <ul className=''>
                    {
                        [...Array(100)].map((v, i)=>(
                            <li key={i} className='px-4 py-2 my-1 hover:bg-zinc-100 hover:cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='flex flex-1 items-center' >
                                        <div className='w-12 h-12 bg-slate-600 rounded-[50%]'></div>
                                        <div className='ml-2'>
                                            <h2>Ha Thanh Tuan</h2>
                                        </div>
                                    </div>
                                    <div className='pl-3'>
                                        {
                                            i%2===1 ? <p className='w-10 h-10 bg-slate-600'></p>:
                                            <button className='w-20 h-8 text-white font-medium flex justify-center items-center bg-blue-400 pointer-events-none rounded-lg '>Follow</button>
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
        </div>
    </div>
  )
}
