import React from 'react'
import { BsBellSlash } from 'react-icons/bs'
import classNames from 'classnames'

interface IItemChat{
    name?:string,
    isTurnOnNotify?:boolean,
    isOffline?:boolean,
    timeOffline?: string,
    onClick?: ()=>void ,
    isSelected ?: boolean,
}
const ItemChat:React.FC<IItemChat> = ({name="HA THANH TUAN", isSelected=false,isOffline=true, isTurnOnNotify=false, timeOffline="2d", onClick}) => {

  return (
    <div className={classNames('px-4 py-2',{
        "bg-zinc-300 pointer-events-none": isSelected,
        "hover:bg-zinc-100 cursor-pointer": !isSelected,
    })}
        onClick={onClick}
    >
        <div className='flex items-center'>
            <div className='flex flex-1 items-center' >
                <div className='w-14 h-14 bg-slate-600 rounded-[50%] relative'>
                    {
                        isOffline ?
                        <span className=' absolute bottom-[2px] right-0 min-w-[16px] h-[16px] rounded-tr-[8px] rounded-tl-[8px] px-[2px] rounded-br-[8px] rounded-bl-[8px] border-[3px] 
                            leading-[0] border-white bg-[#e7fc85] bg-clip-padding text-[9px]  font-bold flex justify-center items-center'
                        >{timeOffline}</span> :
                        <span className='inline-block absolute bottom-[2px] right-0 w-[14px] h-[14px] rounded-[50%] border-2 border-white bg-green-600 bg-clip-padding'></span>
                    }
                </div>
                <div className='ml-2'>
                    <h2>{name}</h2>
                    {/* <p>Hoạt động 2 giờ trước </p> */}
                </div>
            </div>
            <div className='pl-3'>
                {
                    isTurnOnNotify &&<p className='w-6 h-6 flex justify-center items-center text-xl'><BsBellSlash/></p>
                }
            </div>
        </div>
    </div>
  )
}

export default ItemChat