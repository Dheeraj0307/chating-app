import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const ChatApi = createApi({
    reducerPath:'ChatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/user"
    }),
    endpoints:(builder)=>({
        chatApiLogin: builder.mutation({
            query: (data)=>({
                url: '/login',
                method:'POST',
                headers:{
                    "Content-type":"Application/JSON"
                },
                body:data
            })
        }),
        chatApiSignUp: builder.mutation({
            query:(data)=>({
                url:"/signup",
                method:"POST",
                headers:{
                    "Content-type":"Application/JSON"
                },
                body:data
            })
        }),
        chatApiLogout: builder.mutation({
            
        })
    })
})