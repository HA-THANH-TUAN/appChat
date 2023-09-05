import React from 'react'
import { useQueryClient } from 'react-query'

export const Test = () => {
    const queryClient= useQueryClient()
    const dataConversation = queryClient.getQueryState(["conversations"])
    console.log("dataConversationdataConversation::::",dataConversation)
  
    console.log("Test component:::render")

  return (
    <div>
        Test
    </div>
  )
}
