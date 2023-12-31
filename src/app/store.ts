import { configureStore } from '@reduxjs/toolkit'
import refreshAppReducer from "../features/refreshApp/refreshApp"
import chatReducer from "../features/chat/chatSlice"
import callReducer from "../features/call/callSlice"
import authReducer from "../features/auth/authSlice"
import notifyReducer from "../features/notify/notifySlice"

export const store = configureStore({
  reducer:{
    auth:authReducer,
    refreshApp: refreshAppReducer,
    chat: chatReducer,
    call: callReducer,
    notify: notifyReducer,
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch