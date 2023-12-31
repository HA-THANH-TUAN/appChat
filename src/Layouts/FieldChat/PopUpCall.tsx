import React,{useContext, useEffect, useRef, useState} from 'react'
import { BsCameraVideoFill, BsCameraVideoOff, BsCameraVideoOffFill } from 'react-icons/bs'
import { PiMicrophoneFill, PiMicrophoneSlashFill } from 'react-icons/pi'
import MyContext from '../../app/context/context';
import { useSearchParams } from 'react-router-dom';

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const peerConnection = new RTCPeerConnection(configuration);

peerConnection.ontrack=((events)=>{
    console.log("events:::",events)
})


interface IPopUpCall {
    stream: MediaStream | undefined,
    isCamera:boolean,
    isMicrophone?:boolean,
    onStartCalling:()=>void
}

const PopUpCall : React.FC<IPopUpCall> = ({ isCamera=false , stream, isMicrophone=false , onStartCalling}) => {
    const refVideo =useRef<HTMLVideoElement>(null)
    

    useEffect(()=>{
        const eVideo= refVideo?.current
        if(eVideo && stream ){
            eVideo.srcObject=stream 
        }
    })

    console.log("IPopUpCall:::")

  return (
    <div className='fixed top-0 right-0 w-screen h-screen bg-black'>
        <div className='w-screen h-screen relative flex justify-center items-center'>
            <div className=' max-w-5xl flex-1 grid grid-cols-6 gap-6'>
                <section className='bg-[#18191a] col-span-4 rounded-xl flex flex-col'>
                    <section className='flex-1 flex justify-center items-center relative h-[340px]'>

                        {
                            isCamera ? 
                            <>
                               
                                <video className='z-2 w-[500px]' autoPlay ref={refVideo}></video>
                                {!stream && <div className='w-12 absolute z-20'>
                                    <img className='w-full object-contain' src="https://i.gifer.com/ZKZg.gif" alt="loading"/>
                                </div>}
                            </> :
                            <p className='flex justify-center flex-col items-center text-white'>
                                <span className='my-3 text-3xl'><BsCameraVideoOffFill/></span>
                                <span className='font-medium text-lg'>Camera Off</span>
                            </p>
                        }
                    </section>
                    <ul className='bg-[#1f1f1f] h-[60px] flex justify-center rounded-br-xl rounded-bl-xl items-center'>
                        <li className='mx-2'>
                           {
                                isCamera ? <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
                                    onClick={()=>{
                                
                                    }}
                                    ><BsCameraVideoFill/></button> :
                                    
                                    <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
                                    onClick={()=>{
                                     
                    
                                    }}
                                    ><BsCameraVideoOffFill/></button>
                            } 
                            
                        </li>       
                        <li className='mx-2'>
                           {
                               isMicrophone ? <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
                               onClick={()=>{
                            
                                    }}
                                ><PiMicrophoneFill/></button>:

                                <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
                                    onClick={()=>{

                                    }}
                              ><PiMicrophoneSlashFill/></button>
                           }
                        </li>       
                
                    </ul>
                </section>
                <section className='bg-[#18191a] col-span-2 rounded-xl'>
                    <div className='flex justify-center h-full items-center'>
                        <ul className='flex flex-col items-center justify-center text-white'>
                            <li className='w-20 h-20 rounded-[50%] bg-blue-200'><span className='w-full h-full'></span></li>
                            <li className='font-bold text-2xl mt-4 '>Thanh Tuan</li>
                            <li className='flex flex-col justify-center items-center'>
                                <span className='font-medium '>Ready to call ? </span>
                                <button className='bg-blue-500 font-bold px-3 py-1 rounded-md mt-6 hover:bg-blue-400'
                                    onClick={onStartCalling}      
                                >Bắt đầu</button>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}

export default PopUpCall

// import React,{useContext, useEffect, useRef, useState} from 'react'
// import { BsCameraVideoFill, BsCameraVideoOff, BsCameraVideoOffFill } from 'react-icons/bs'
// import { PiMicrophoneFill, PiMicrophoneSlashFill } from 'react-icons/pi'
// import MyContext from '../../app/context/context';

// const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
// const peerConnection = new RTCPeerConnection(configuration);

// peerConnection.ontrack=((events)=>{
//     console.log("events:::",events)
// })


// interface IPopUpCall {
//     hasVideo :boolean,
//     roomId : string
// }

// const PopUpCall : React.FC<IPopUpCall> = ({roomId}) => {

//     const [isMicrophone, setIsMicrophone]=useState<boolean>(true)
//     const [isCamera, setIsCamera]=useState<boolean>(true)
//     const [stream, setStream]=useState<MediaStream>()
//     const refVideo= useRef<HTMLVideoElement>(null)
//     const timerCall=useRef<number>(0)
//     const [offer, setOffer]=useState<RTCSessionDescriptionInit>()
//     const ctx = useContext(MyContext)

//     const refIdTimeOut = useRef<NodeJS.Timer>()

//     useEffect(()=>{
//         if(isCamera || isMicrophone){
//             const constraints = {
//                 audio:isMicrophone,
//                 video:false,
//             }
//             const createStream =  async()=>{
//                 try {
//                     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//                     if(stream && refVideo.current !== null && refVideo.current.srcObject !==undefined){
//                         setStream(stream)
//                         refVideo.current.srcObject=stream
//                         stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
//                         const offer = await peerConnection.createOffer();
//                         await peerConnection.setLocalDescription(offer)
//                         setOffer(offer)
                        
//                     }
//                 }catch (error) {
//                     console.log("Loi==>")
//                 }
//             } 
//             createStream()
//         }

//     },[isMicrophone, isCamera])

//     const onStartCalling = ()=>{
//         console.log("click Start Call")
//         const handleSendSession=()=>{
//             const socketIO = ctx?.socketIO
//             console.log("SOCKET PRESENT:::", socketIO)
//             console.log("OFFER PRESENT:::", offer)
//             if(socketIO && offer){
//                 if(socketIO.connected===false){
//                     console.log("Kết nối lại !!!")
//                     socketIO.connect()
//                 }else{
//                     console.log("Kết nối luôn !!!",peerConnection)
//                     socketIO.emit("requestCall", {
//                         roomId:roomId,
//                         sessionRTC: offer
//                     })
//                 }
    
//             }
//         }
//         // refIdTimeOut.current = setInterval(handleSendSession, 3000)
//         refIdTimeOut.current = setInterval(()=>{
//             if(timerCall.current<9){
//                 console.log("run Interval::", timerCall.current)
//                 handleSendSession();
//                 timerCall.current++
//                 return undefined
//             }
//             clearInterval(refIdTimeOut.current)
//         }, 3000)
//     }
//     useEffect(()=>{
//         return ()=>{
//             clearInterval(refIdTimeOut.current)
//         }
//     },[])


//   return (
//     <div className='fixed top-0 right-0 w-screen h-screen bg-black'>
//         <div className='w-screen h-screen relative flex justify-center items-center'>
//             <div className=' max-w-5xl flex-1 grid grid-cols-6 gap-6 h-[450px]'>
//                 <section className='bg-[#18191a] col-span-4 rounded-xl flex flex-col'>
//                     <section className='flex-1 flex justify-center items-center relative'>

//                         {
//                             isCamera ? 
//                             <>
//                                 <video className='z-2' autoPlay width={550} height={300} ref={refVideo}></video>
//                                 {!stream && <div className='w-12 absolute z-20'>
//                                     <img className='w-full object-contain' src="https://i.gifer.com/ZKZg.gif" alt="loading"/>
//                                 </div>}
//                             </> :
//                             <p className='flex justify-center flex-col items-center text-white'>
//                                 <span className='my-3 text-3xl'><BsCameraVideoOffFill/></span>
//                                 <span className='font-medium text-lg'>Camera Off</span>
//                             </p>
//                         }
//                     </section>
//                     <ul className='bg-[#1f1f1f] h-[60px] flex justify-center rounded-br-xl rounded-bl-xl items-center'>
//                         <li className='mx-2'>
//                            {
//                                 isCamera ? <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
//                                     onClick={()=>{
//                                         setIsCamera(false);
//                                         stream?.getVideoTracks()[0].stop()
//                                     }}
//                                     ><BsCameraVideoFill/></button> :
                                    
//                                     <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
//                                     onClick={()=>{
//                                         setIsCamera(true)
//                                         // console.log(" OFF getTracks=====>",stream?.getTracks())
                                         
//                                         // console.log(" OFF getVideoTracks=====>",stream?.getVideoTracks())
//                                         // console.log(" OFF getAudioTracks=====>",stream?.getAudioTracks())
//                                     }}
//                                     ><BsCameraVideoOffFill/></button>
//                             } 
                            
//                         </li>       
//                         <li className='mx-2'>
//                            {
//                                isMicrophone ? <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
//                                onClick={()=>{
//                                    setIsMicrophone(false);
//                                    stream?.getAudioTracks()[0].stop()
//                                     }}
//                                 ><PiMicrophoneFill/></button>:

//                                 <button className='hover:opacity-70 text-white w-10 h-10 rounded-[50%] bg-[#363636] flex justify-center items-center text-2xl'
//                                     onClick={()=>{setIsMicrophone(true)}}
//                               ><PiMicrophoneSlashFill/></button>
//                            }
//                         </li>       
                
//                     </ul>
//                 </section>
//                 <section className='bg-[#18191a] col-span-2 rounded-xl'>
//                     <div className='flex justify-center h-full items-center'>
//                         <ul className='flex flex-col items-center justify-center text-white'>
//                             <li className='w-20 h-20 rounded-[50%] bg-blue-200'><span className='w-full h-full'></span></li>
//                             <li className='font-bold text-2xl mt-4 '>Thanh Tuan</li>
//                             <li className='flex flex-col justify-center items-center'>
//                                 <span className='font-medium '>Ready to call ? </span>
//                                 <button className='bg-blue-500 font-bold px-3 py-1 rounded-md mt-6 hover:bg-blue-400'
//                                     onClick={onStartCalling}      
                                
//                                 >Bắt đầu</button>
//                             </li>
//                         </ul>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default PopUpCall