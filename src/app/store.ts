import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../features/counter/counterSlice"
import reducerCreateConnectSocketIO from '../features/createSocketIO'

export const store = configureStore({
  reducer:{
    counter: counterReducer,
    number: reducerCreateConnectSocketIO
  }
 
})
console.log("storestore::::",store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch