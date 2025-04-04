import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const Chat = () => {

    const [msg, setMsg] = useState('');
    const [recentChat, serRecentChat] = useState([])
    const socketRef = useRef();
    const navigate = useNavigate();

    const getTokenFromCookie = () => {
        const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
        return match ? match[2] : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msg.trim()) {
            socketRef.current.emit("send-message", msg);
            setMsg("");
        }
    };

    const userId = 'asda';

    useEffect(() => {

        const token = getTokenFromCookie();
        if (!token) {
            console.log("❌ No JWT token found. User not logged in.");
            navigate('/login')
            return;
        }

        const socket = io("http://localhost:3000", {
            token: token,
            query: { userId },
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
        });

        socket.on("connect", () => {
            console.log("🔌 Connected with socket ID:", socket.id)
        })

        socket.on("disconnect", (reason) => {
            console.log(`socket ${socket.id} ⚠️ disconnected due to ${reason}`);
        });
        socket.on("getOnlineUsers", (user) => {
            console.log("🟢 Online users:", user);
        });

        socket.on("message", (data) => {
            serRecentChat((prev) => [...prev, data]);
        });

        socketRef.current = socket

        return (() => {
            socket.disconnect();
        })

    }, [])

    return (
        <div>
            <h2>chatting app</h2>
            <ThemeProvider
                theme={{
                    palette: {
                        primary: {
                            main: '#ACFFAC',
                            dark: '#0066CC',
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '80px',
                        overflowY: 'auto',
                        maxHeight: '150px',
                        marginBottom: '20px',
                        padding: "5px 10px",
                        borderRadius: 1,
                        bgcolor: 'primary.main',
                        // '&:hover': {
                        //     bgcolor: 'primary.dark',
                        // },
                    }}
                >
                    {recentChat.map((data, i) => {

                        return <p key={i}> {data}</p>

                    })}
                </Box>
            </ThemeProvider>

            <form action="" onSubmit={handleSubmit}>

                <div className='flex'>

                    <TextField id="standard-basic" label="text" type="text" value={msg} onChange={(e) => setMsg(e.target.value)} required />

                    <Button variant='contained' type='submit'> send</Button>
                </div>

            </form>

        </div>
    )
}

export default Chat