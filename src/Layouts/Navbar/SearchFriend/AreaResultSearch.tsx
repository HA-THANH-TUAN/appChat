import React,{useEffect} from 'react'
import Loading from '../../../Components/Loading'
import { IPagination } from '../../../models/Types/responseType'
import { useQuery } from 'react-query'
import UserApi from '../../../apis/userApi'
import { CgClose } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { receiver } from '../../../features/chat/chatSlice'

interface IAreaResultSearch{

}

const AreaResultSearch:React.FC<IAreaResultSearch> = ({}) => {
    const [pagination, setPagination]= React.useState<IPagination>({page:1, limit:3 , total:1})

    const nav=useNavigate()
    const dispatch = useAppDispatch()
    const dataUserLocalStorage=localStorage.getItem("user")
    const ownId= dataUserLocalStorage !==null ? JSON.parse(dataUserLocalStorage).id : null


    const handleGetUsers = async (ownId:string)=>{
        const result = await UserApi.getUsers(ownId , pagination.page , pagination.limit)
        return result
    }

    const {status, data}= useQuery({
        queryKey:["users", pagination],
        queryFn : async ()=>handleGetUsers(ownId),
        enabled:ownId !==null
    })
    const handleChangePageMessage=(id:string)=>{
        nav(`/message/inbox/${id}`)
    }

    if(status==="loading"){
        return <section className='flex justify-center'>
            <Loading
                borderColor='#6d6d6d'
            />
        </section>
    }
    if(status==="error"){
        return <h2 className='text-3xl font-bold'>ERROR</h2>
    }
    
  return (
    <ul className=''>
        {
            data?.metadata?.users.map((user)=>(
                <li key={user._id} className={`px-4 py-2 my-1 hover:bg-zinc-100 cursor-pointer`}
                    onClick={(e)=>{
                        nav(`/profile/${user._id}`)
                        // e.stopPropagation()
                    }}
                    >
                    <div className='flex items-center'>
                        <div className='flex flex-1 items-center' >
                            <section className='flex flex-1 items-center'>
                            <div className='w-12 h-12 bg-slate-600 rounded-[50%] flex justify-center items-center text-white text-xl font-semibold'>{user.name.slice(0,1)}</div>
                            <div className='ml-2'>
                                <h2>{user.name}</h2>
                            </div>
                            </section>
                            <button onClick={(e)=>{
                                e.stopPropagation()
                                handleChangePageMessage(user._id);
                                    dispatch(receiver(user))
                                }}  
                                className='text-white text-sm px-[10px] font-medium py-2 rounded-md hover:bg-orange-500 transition-colors bg-blue-500'
                            >Message</button>
                        </div>
                        <span className='w-8 h-8 text-2xl flex justify-center items-center text-zinc-500 pointer-events-none rounded-lg '><CgClose/></span>
                    </div>
                </li>
            ))
        }
    </ul>
  )
}

export default AreaResultSearch