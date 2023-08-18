import React from 'react'
import FieldChat from '../Layouts/FieldChat/FieldChat'
import ListChat from '../Layouts/ListChat/ListChat'
// import socket from '../configs/io.config'

// socket.emit('message', "HA THANH TUAN");




export const Message = () => {
  return (
    <div className='flex-1 flex '>
      <ListChat/>
      <FieldChat/>
    </div>
  )
}
