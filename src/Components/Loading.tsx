import React from 'react'
interface ILoading{
    borderSpin ?:string | number,
    borderColor ?:string,
    bg ? :string,
    r ?: string
    w ?: string
}
const Loading:React.FC<ILoading>=({borderSpin, borderColor,bg,r,w}) =>{
   
  return (
    <svg className='loading' viewBox="25 25 50 50"
    style={{
      width: w ===undefined  ? "60px" : w,

  }}
    >
        <circle cx="50" cy="50" r={r===undefined ? 10 : r}
            // style={styleCircle}
            style={{
                strokeWidth: borderSpin == undefined  ? "3" : borderSpin ,
                stroke: borderColor ===undefined  ? "red" : borderColor,
                fill: bg ===undefined  ? "white" : bg,

            }}
        ></circle>
    </svg>
  )
}

export default Loading