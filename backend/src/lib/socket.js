import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const userSocketMap = {}; // userId -> socketId

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// ✅ Middleware to check JWT before handshake
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    console.log("❌ Token missing in socket handshake");
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId; // attach userId to socket
    next();
  } catch (err) {
    console.log("❌ Invalid token in socket handshake");
    return next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.userId; // ✅ comes from verified token
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };