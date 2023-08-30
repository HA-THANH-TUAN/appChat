import  Cookies  from 'js-cookie';
const handleLoginAgain = ()=>{
    localStorage.clear()
    const allKeyCookie = Object.keys(Cookies.get())
    allKeyCookie.forEach((key)=>{
        Cookies.remove(key)
    })
}

export default handleLoginAgain