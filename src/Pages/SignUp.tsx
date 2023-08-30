
import React, { useState } from 'react'
import AuthenApi from '../apis/authenApi'
import {IFomSignUp} from '../apis/authenApi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface IpushLable {
  name:boolean,
  email:boolean,
  password:boolean
}

const SignUp = () => {

  const [isLoading, setIsLoading]=useState<boolean>(false)
  const [isError, setIsError]=useState<boolean>(false)

  const nav=useNavigate()
  const [formData, setFormData] =useState<IFomSignUp>({email:"555", password:"", name:""})
  const [hiddenPassword, setHidenPassword] = useState<boolean>(true)
  
  const [pushLabel, setPushLabel] =useState<IpushLable>(
    ()=>{
      const result= Object.keys(formData).reduce((prev, key)=>{
        const value =formData[key as keyof IFomSignUp]
        const bool= value.length>0
        return {...prev, [key]:true}
      },{email:false, password:false ,name:false})

      return result
    }
  )


  const onChange:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    const valueEmail= e.target.value
    setPushLabel({...pushLabel, [e.target.name]: valueEmail.length>0})
    setFormData({...formData, [e.target.name]: valueEmail})
  }
  const onFocus:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    setPushLabel({...pushLabel, [e.target.name]: true})
  }

  const onBlur:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    const valueEmail= e.target.value
    setPushLabel({...pushLabel, [e.target.name]: valueEmail.length === 0 ? false : true })
  }

  const handleSignUp =async ()=>{
    try {
      setIsError(false)
      setIsLoading(false)
      const dt = await AuthenApi.signUp(formData)
      if(dt.status===401){
        setIsError(true)
        alert("Error Login")
      }else{
        const userData=dt.metadata?.user
        const tokensData=dt.metadata?.tokens
        if(tokensData && userData){
          const twoHourFromNow = new Date().getTime() + 60*60*1000*2
          Cookies.set("access_token", tokensData.accessToken ,{expires:twoHourFromNow, secure:true})
          Cookies.set("refresh_token", tokensData.refreshToken, {expires:twoHourFromNow, secure:true})
          localStorage.setItem("user", JSON.stringify(userData))
          nav("/")
        }
      }
    } catch (error) {
      nav("*")
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <div className='backgound-login w-screen h-screen flex justify-center items-center'>

    <div className=' '>
      <div className='w-[350px] mx-auto'>
        <section className='border px-6 pb-3'>
          <h1 className='text-3xl font-bold my-6 text-center'>Stream Live</h1>
          <form className=''>
            <div className='relative my-7'>
              <label className={`absolute ${pushLabel.name ? "top-[-2px] text-xs h-6 font-medium" : "top-[7px] h-7"  } left-3  transition-all flex justify-center pointer-events-none items-center`}> Name</label>
              <input name='name' value={formData.name} className={`w-full  h-11 border border-zinc-300 rounded-sm px-3 ${pushLabel.name ? "pt-3 " : "py-4"} focus:outline-none`} type="text" 
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus} 
              />
            </div>
            <div className='relative my-7'>
              <label className={`absolute ${pushLabel.email ? "top-[-2px] text-xs h-6 font-medium" : "top-[7px] h-7"  } left-3  transition-all flex justify-center pointer-events-none items-center`}> Email</label>
              <input name='email' value={formData.email} className={`w-full  h-11 border border-zinc-300 rounded-sm px-3 ${pushLabel.email ? "pt-3 " : "py-4"} focus:outline-none`} type="text" 
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus} 
              />
            </div>
            <div className='relative my-7'>
              <label className={`absolute ${pushLabel.password ? "top-[-2px] text-xs h-6 font-medium" : "top-[7px] h-7"  } left-3 flex justify-center items-center transition-all pointer-events-none`} > Password</label>
              <input name='password' value={formData.password} className={`w-full  h-11 border border-zinc-300 rounded-sm px-3 ${pushLabel.password ? "pt-3 " : "py-4"} focus:outline-none`} type= {hiddenPassword ? "password":"text"}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                />
            <span className='font-semibold absolute right-3 cursor-pointer hover:opacity-70 text-sm top-[8px] flex justify-center items-center h-7' onClick={()=>{setHidenPassword(state=>(!state))}}>Show</span>
            </div>
            <button type='button' className='bg-blue-500 w-full py-1 rounded-md text-white' onClick={()=>{handleSignUp()}} >Sign Up</button>

          </form>
          <p className='text-end my-4 font-medium text-sm cursor-pointer'>Forgot password ?</p>


        </section>
        <section className='border my-4 py-3'>
          <p className='text-center'>Have an account ? <span className='mr-2 text-blue-800 font-bold hover:text-blue-500 cursor-pointer ml-2' onClick={()=>{nav("/account/sign-in")}} >Sign In</span></p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default SignUp