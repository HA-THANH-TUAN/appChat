import React from 'react'

export const ItemChatSkeleton = () => {
  return (
    <div className='px-4 py-2 my-1 hover:bg-zinc-100 hover:cursor-pointer'>
        <div className='flex items-center'>
            <div className='flex flex-1 items-center' >
                <div className='w-14 h-14 bg-[#00000023] rounded-[50%] relative'></div>
                <div className='ml-2'>
                    <h2 className='w-[200px] bg-[#00000023] h-5 rounded-[6px]'></h2>
                    <p className='w-[150px] bg-[#00000023] h-5 rounded-[6px] mt-1'></p>
                </div>
            </div>
        </div>
    </div>
  )
}
