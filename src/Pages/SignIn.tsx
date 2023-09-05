import React, { useState,useEffect } from 'react'
import AuthenApi from '../apis/authenApi'
import {IFomSignIn} from '../apis/authenApi'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../Utils/setCookie'
import Cookies from 'js-cookie'
import { useMutation } from 'react-query'
import Loading from '../Components/Loading'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../app/hooks/useCustomReduxTookit'
import { resetAuth, setIsLogin } from '../features/auth/authSlice'
import { handleLogout } from '../Utils/handleLogout'



interface IpushLable {
  email:boolean,
  password:boolean
}

const SignIn = () => {

  const [isLoading, setIsLoading]=useState<boolean>(false)
  const [isError, setIsError]=useState<boolean>(false)
  const dispatch = useAppDispatch()
  const nav=useNavigate()
  const [formData, setFormData] =useState<IFomSignIn>({email:"555", password:""})
  const [hiddenPassword, setHidenPassword] = useState<boolean>(true)
  
  const [pushLabel, setPushLabel] =useState<IpushLable>(()=>{
     const result= Object.keys(formData).reduce((prev, key)=>{
      const value =formData[key as keyof IFomSignIn]
        const bool= value.length>0
        return {...prev, [key]:true}
    },{email:false, password:false})
    return result
  })
  
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

  const mutationSignIn = useMutation(
    async (formData:IFomSignIn)=>{
          return await AuthenApi.signIn(formData)
    },
    {
      onSuccess: async (data) => {
        const status= data.status
        if(status===200){
          const userData=data.metadata?.user
          const tokensData=data.metadata?.tokens
          if(tokensData && userData){
            const twoHourFromNow = new Date().getTime() + 2*60*60*1000
            Cookies.set("access_token", tokensData.accessToken)
            Cookies.set("refresh_token", tokensData.refreshToken)
            localStorage.setItem("user", JSON.stringify(userData))
            dispatch(setIsLogin(true))
            nav("/")
          }  
        }
      },
    }
  )
  useEffect(()=>{
    handleLogout()
    dispatch(resetAuth())
  },[])
  
  return (
    <div className='backgound-login w-screen h-screen flex justify-center items-center'>

    <div className=' '>
      <div className='w-[350px] mx-auto'>
        <section className='border px-6 pb-3'>
          <h1 className='text-3xl font-bold my-6 text-center'>Stream Live</h1>
          <form className='' onSubmit={(e)=>{
              e.preventDefault()
              if(mutationSignIn.status !=="loading"){
                mutationSignIn.mutate(formData)
              }
              
            }}>
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
            <button type='submit' className='bg-blue-500 w-full py-1 h-[36px]  flex items-center justify-center rounded-md font-medium text-white'>Login 
              { mutationSignIn.status ==="loading" && <span className='ml-2'><Loading w="30px" r="12" borderSpin={4 } borderColor='#e5e7eb' bg='#3b82f6'/></span>}
            </button>

          </form>
          <p className='text-end my-4 font-medium text-sm cursor-pointer'>Forgot password ?</p>

        </section>
        <section className='border my-4 py-3'>
          <p className='text-center'>Don't have a account ? <span className='mr-2 text-blue-800 font-bold hover:text-blue-500 cursor-pointer ml-2' onClick={()=>{nav("/account/sign-up")}} >Sign Up</span></p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default SignIn