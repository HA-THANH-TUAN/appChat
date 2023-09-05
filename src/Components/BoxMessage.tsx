import React from 'react'
import classNames from "classnames"
import { BsCheckCircleFill } from 'react-icons/bs'

interface IBoxMessage {
    isMyMessage ?:boolean,
    content:string
}
const BoxMessage :React.FC<IBoxMessage> = ({isMyMessage=false , content}) => {
  return (
    <div className={classNames(['w-full flex items-center',{
         "justify-end pr-4":isMyMessage,
         "justify-start pl-4":!isMyMessage
    }])} >
        { !isMyMessage && <span className='bg-[#E4E6EB] inline-block w-6 h-6 rounded-[50%] border-rose-400 border mr-2'></span>}
        <span className={classNames("inline-block rounded-2xl px-3 py-[6px] max-w-[60%] relative my-3",{
            "bg-blue-500 text-white ": isMyMessage,
            // "bg-[#314882] text-black": !isMyMessage
            "bg-[#E4E6EB] text-black": !isMyMessage
        })}

        >{content}
        {isMyMessage && <span className=' absolute w-5 h-5 flex justify-center items-center text-[13px] -right-3 -bottom-3 text-blue-600'><BsCheckCircleFill/></span>}
        </span>
    </div>
  )
}

export default BoxMessage

