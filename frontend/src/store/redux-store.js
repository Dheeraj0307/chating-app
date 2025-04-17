import {configureStore} from '@reduxjs/toolkit'
// import { middleware } from '@reduxjs/toolkit' 
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer:{
        [chatApi.reducerPath] : chatApi.reducer
    },
    middleware:(defaultMiddleware)=>(
        defaultMiddleware().concat(chatApi.middleware)
    )
}) 

setupListeners(store.dispatch)