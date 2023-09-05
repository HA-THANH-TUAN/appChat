const getDataLocalStorage =<T>(key:string):T|null|string=>{
    const dataLS = localStorage.getItem(key)
    if(dataLS){
        try {
            return JSON.parse(dataLS)
        } catch (error) {
            return dataLS
        }
    }
    return null
}

export {getDataLocalStorage}