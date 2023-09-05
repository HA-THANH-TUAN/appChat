import React, {useEffect, useState,useContext} from 'react'
import {NavLink,useLocation, useNavigate} from "react-router-dom"

import {AiFillHome,AiOutlineMenu} from "react-icons/ai"
import {CgAddR} from "react-icons/cg"
import {MdOutlineLiveTv} from "react-icons/md"
import {IoMdNotificationsOutline} from "react-icons/io"
import {RiMessengerLine} from "react-icons/ri"
import {LuSearch} from "react-icons/lu"
import {PiFilmReelLight} from "react-icons/pi"
import {FcEnteringHeavenAlive} from "react-icons/fc"
import SearchFriend from './SearchFriend/SearchFriend'
import CreatePost from './CreatePost/CreatePost'
import Notification from './Notification/Notification'
import { getCookie } from '../../Utils/setCookie'
import MyContext from '../../app/context/context'

interface navListItem {
    name:string, url:string[]
}

interface IdataUserLocalStorage{
    name:string,
    email:string,
    id:string
}
const navList :navListItem[] = [
    {
        name:"home",
        url: ["/"]
    },
    {
        name:"message",
        url: ["/message","/message/inbox/"]
    },
    {
        name:"live",
        url: ["/live"]
    },
    {
        name:"reel",
        url: ["/reel", "/reel/"]
    },
    {
        name:"profile",
        url: ["/profile", "/profile/"]
    },
]
 

export default function Navbar() {
    const [type, setType]=useState<boolean>(true);
    const [popUpCreate, setPopUpCreate]= React.useState<boolean>(false)
    const [popUpName, setPopUpName]= React.useState<string>("")
    const nav=useNavigate()
 
    

    const [outlet, setOulet] =React.useState<string>("")
    const location = useLocation()
    const [navItem, setNavItem] = React.useState<string>()

    const findNav= (navList:navListItem[] , pathName:string): (navListItem | undefined) =>{
        const result= navList.find((item)=>{
            const isExist =item.url.some((urlItem)=> {
                if(pathName==="/"){
                    return pathName===urlItem
                }
                else{
                    return urlItem==="/"? false : pathName.includes(urlItem)
                }
            })
            return isExist
        })
        return result
    }

    useEffect(()=>{
        const navInfor = findNav(navList, location.pathname)
        if(navInfor!==undefined){setNavItem(navInfor.name)}
        const isType= navInfor?.name ? "message"===navInfor.name :false
        if(isType){
            setType(false)
        }
    },[location.pathname])
  return (
    <nav className={`${type===true ? "w-60" : "w-16"} h-screen`}>
        <div className={`flex flex-col ${type===true ? "px-4" : "px-2"} overflow-hidden border-r relative`}>
            <NavLink to="/">
                <h2 className={`flex items-center ${type===true ? "justify-start hover:opacity-60 " : "justify-center hover:bg-slate-100"}  my-1 py-3 rounded-md cursor-pointer`}
                    onClick={()=>{
                        if(type!==true){ setType(true)}
                        setOulet("");
                    }}
                >    
                    {
                        type===true ? <p className={`ml-4 font-semibold text-3xl py-4`}>Stream Live</p>
                        : <span className='text-3xl'><FcEnteringHeavenAlive/></span> 
                        
                    }
                </h2>
            </NavLink>
              
            <ul >
                <li>
                    <NavLink to={"/"}>
                        <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${navItem==="home" && popUpName=="" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                            onClick={()=>{
                                if(type!==true){ setType(true)}
                                setOulet("")
                                setPopUpName("")
                            }}
                        >
                            <span className='text-2xl'><AiFillHome/></span>
                            <p className={`${type===true ? undefined :"hidden" } ml-4`}>Home</p>
                        </span>
                    </NavLink>
                </li>
                <li>
                    <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${popUpName==="search" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                        onClick={()=>{
                            if(type!==false){ setType(false)}
                            if(outlet==="search"){
                                setOulet("")
                                setPopUpName("")
                            }
                            else{
                                setOulet("search")
                                setPopUpName("search");
                            }
                        }}
                    >
                        <span className='text-2xl'><LuSearch/></span>
                        <p className={`${type===true ? undefined :"hidden" } ml-4`} >Search</p>
                    </span>
                </li>

                <li>
                  <NavLink to={"/reel"}> 
                      <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${navItem==="reel" && popUpName=="" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                          onClick={()=>{
                              if(type!==true){ setType(true)}
                              setOulet("");
                              setPopUpName("")
                          }}
                      >
                          <span className='text-2xl'><PiFilmReelLight/></span>
                          <p className={`${type===true ? undefined :"hidden" } ml-4`}>Reels</p>
                      </span>
                  </NavLink>
                </li>
                <li>
                    <NavLink to={"/message/inbox/"}> 
                        <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${navItem==="message" && popUpName=="" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                            onClick={()=>{
                                if(type===true){ setType(false)}
                                setOulet("");
                                setPopUpName("")
                            }}
                        >
                            <span className='text-2xl'><RiMessengerLine/></span>
                            <p className={`${type===true ? undefined :"hidden"} ml-4`}>Messages</p>
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/live"}> 
                        <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${navItem==="live" && popUpName=="" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                            onClick={()=>{
                                setType((type=>(!type)))
                                setOulet("");
                                setPopUpName("")
                        }}
                        >
                            <span className='text-2xl'><MdOutlineLiveTv/></span>
                            <p className={`${type===true ? undefined :"hidden" } ml-4`}>Live</p>
                        </span>

                    </NavLink>
                </li>
              <li>
                    <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${popUpName==="notification" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                        onClick={()=>{
                            if(type===true){ setType(false)}
                            if(outlet==="notification"){
                                setOulet("")
                                setPopUpName("");
                            }
                            else{
                                setOulet("notification");
                                setPopUpName("notification");
                            }
                        }}
                    >
                        <span className='text-2xl'><IoMdNotificationsOutline/></span>
                        <p className={`${type===true ? undefined :"hidden" } ml-4`} >Notifications</p>
                    </span>

                </li>
                <li>
                    <span className={` ${type ===true ? "justify-start px-3": "justify-center"} flex items-center my-1 py-3 rounded-md cursor-pointer hover:bg-slate-100`}
                        onClick={()=>{
                            setPopUpCreate(true)
                            setPopUpName("create")
                        }}
                    >
                        <span className='text-2xl'><CgAddR/></span>
                        <p className={`${type===true ? undefined :"hidden" } ml-4`} >Create</p>
                    </span>

                </li>
                <li>
                    <a> 
                        <span className={` ${type ===true ? "justify-start px-3": "justify-center"} ${navItem==="profile" ? "font-semibold bg-slate-300" : "font-normal hover:bg-slate-100"} flex items-center my-1 py-3 rounded-md cursor-pointer`}
                            onClick={
                                ()=>{
                                    if(type!==true){ setType(true)};
                                    const dataUserLocalStorage=localStorage.getItem("user")
                                    if(dataUserLocalStorage!==null){
                                        const {id}:IdataUserLocalStorage = JSON.parse(dataUserLocalStorage)
                                        if(id){
                                            nav(`/profile/${id}`)
                                        }else{
                                            nav("/account/sign-in");
                                        }
                                    }else{nav("/account/sign-in");}
                                }
                               
                            }
                        >
                            <span className=''><span className='w-6 h-6 block bg-blue-500 rounded-[50%]'></span>
                            </span> <p className={`${type===true ? undefined :"hidden" } ml-4`}>Profile</p>
                        </span>
                    </a>
                </li>
            </ul>
            <div className={`my-10 ${type ===true ? "justify-start px-3": "justify-center"} flex items-center py-3 px-3 rounded-md cursor-pointer hover:bg-slate-100`}
                onClick={()=>{if(type!==true){ setType(true)}}}
            >
                    <span className=''><AiOutlineMenu/></span> 
                    <p className={`${type===true ? undefined :"hidden" } ml-4 font-medium text-lg`}>More</p>
            </div>
        </div>
        {outlet === "search" ? <SearchFriend/> : outlet ==="notification" ? <Notification/> : undefined}
        {
            popUpCreate === true && <CreatePost handleCloseMadal={()=>{setPopUpCreate(false)}} />
        }
        
       
    </nav>
  )
}
