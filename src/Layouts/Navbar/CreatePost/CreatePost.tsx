import React from 'react'
import UploadSvg from './UploadSvg'
import {CgClose} from "react-icons/cg"

interface IPropCreatePost {
  handleCloseMadal:()=>void
}

 const CreatePostReact :React.FC<IPropCreatePost>= ({handleCloseMadal})=> {
  const refInput =  React.useRef<HTMLInputElement>(null)
  
  const handleOpenFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.stopPropagation()
    refInput.current?.click()
  }
  const handleCloseModal = (e:React.MouseEvent<any>)=>{
    e.stopPropagation()
    handleCloseMadal()

  }

  return (
      <div className='fixed w-screen h-screen  top-0' >
        <div className='w-ful h-full relative flex items-center justify-center'>
          <div className='bg-[#2d2d2dad] w-ful h-full top-0 absolute -inset-1'
            onClick={handleCloseModal}
          >
              <span className='flex justify-center items-center hover:text-zinc-300 cursor-pointer text-white p-1 absolute top-5 right-5 w-10 text-3xl'
                onClick={handleCloseModal}
              ><CgClose/></span>
          </div>
          <div className='absolute w-[482px]'>
            <section className='w-full'>
              <div className='bg-white max-w-[482px] min-h-[500px] mx-auto rounded-xl flex flex-col'>
                  <nav className='border-b'><h2 className='py-2 text-center font-semibold'>Create New Post</h2></nav>
                  <div className='flex items-center p-3 flex-1'>
                      <div className='flex flex-col items-center flex-1'>
                          <span className='inline-block pb-5'><UploadSvg/></span>
                          <h2 className='mb-5 text-xl'>Drag photos and videos here</h2>
                          <input ref={refInput} type="file" className='hidden'/>
                          <button onClick={handleOpenFile} className='text-white bg-blue-500 hover:opacity-70 rounded-lg py-1 font-medium px-3'>Select from computer</button>
                      </div>
                  </div>
              </div>
            </section>
          </div>

        </div>
      </div>
  ) 
}
export default CreatePostReact