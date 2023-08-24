function setCookie(cname:string, cvalue:string, secondExp:number) {
    const d = new Date();
    d.setTime(d.getTime() + (secondExp*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


const getCookie =()=>{
    const stringCookie= document.cookie
    const arrayPice = stringCookie.split(";")
    if(arrayPice.length>0){
        const objectCookie: Record<string, string>={}
        arrayPice.forEach((pieceCooke)=>{
            const [key, value]= pieceCooke.split("=")
            objectCookie[key.replace(/\s+/g, "")]=value
        })
        return objectCookie
    }
    


}
export {setCookie,getCookie}