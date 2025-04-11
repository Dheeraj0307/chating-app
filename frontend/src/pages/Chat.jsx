import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { io } from "socket.io-client";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [recentChat, setRecentChat] = useState([]);
  const socketRef = useRef();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!msg.trim()) return;

    console.log("Submitted:", msg);
    socketRef.current.emit("send-message",  {
        user: socketRef.current.id,
        text: msg,
        timestamp: Date.now(), // optional
      });
    setMsg(""); // clear input
    setSubmitted(false);    
  }; 

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
    });

    socket.on("connect", () => {
      console.log("🔌 Connected with socket ID:", socket.id);
    });

    socket.on("chat_history",(prevData)=>{
        setRecentChat(prevData)
    })

    socket.on("disconnect", (reason) => {
      console.log(`socket ${socket.id} ⚠️ disconnected due to ${reason}`);
    });
    socket.on("getOnlineUsers", (user) => {
      console.log("🟢 Online users:", user);
    });

    socket.on("receive_message", (data) => {
      setRecentChat((prev) => [...prev, data]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect(); 
    };
  }, []);

  return (
    <div>
      <h2 className="text-5xl text-center my-5 capitalize">chatting app</h2>
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#ACFFAC",
              dark: "#0066CC",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "80px",
            overflowY: "auto",
            maxHeight: "150px",
            marginBottom: "20px",
            padding: "5px 10px",
            borderRadius: 1,
            bgcolor: "primary.main",
            // '&:hover': {
            //     bgcolor: 'primary.dark',
            // },
          }}
        >
          {recentChat.map((data, i) => {
            return <p key={data.id || i}>{data.text || data}</p>
          })}
        </Box>
      </ThemeProvider>

      <div className="flex">
        <TextField
          id="standard-basic"
          label="text"
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          required
          error={submitted && !msg.trim()}
          helperText={submitted && !msg.trim() ? "Message is required" : ""}
        />
        <Button variant="contained" onClick={handleSubmit}>
          send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
