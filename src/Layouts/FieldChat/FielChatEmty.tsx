import React, {FC} from 'react'
import { BsMessenger, BsSearch } from 'react-icons/bs'
import { useOutletContext } from 'react-router-dom'
interface IFielChatEmty{

    handleSetIsPopUp:  React.Dispatch<React.SetStateAction<boolean>> 
}
const FielChatEmty:FC = () => {
  const {handleSetIsPopUp}= useOutletContext<IFielChatEmty>()
  
  return (
    <section className='flex-1 '>
        <div className='flex justify-center items-center flex-col h-full'>
            <h2 className='h-20 w-20 rounded-[50%] border-black border flex justify-center items-center text-4xl'><BsMessenger/></h2>
            <p className='text-black mt-3'>Hãy chọn một cuộc trò chuyện</p>
            <button className='px-3 bg-blue-600 py-2 flex text-white items-center justify-center rounded-md mt-5 hover:bg-blue-400'  onClick={()=>{handleSetIsPopUp(true)}} > <span className='mr-3'><BsSearch/></span>Tìm cuộc trò chuyện</button>
        </div>

        <ul></ul>
    </section>
  )
}

export default FielChatEmty

//