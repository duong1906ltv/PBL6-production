import express from "express";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(express.static("public"));

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";

import cors from "cors";
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

//routers
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoute.js";
import conversationRouter from "./routes/conversationRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandleMiddleware from "./middleware/error-handler.js";

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000"
	}
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	//when ceonnect

	//take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	//send and get message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		console.log("users:", users);
		const user = getUser(receiverId);
		io.to(user.socketId).emit("getMessage", {
			senderId,
			text,
		});
	});

	//when disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected!");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		server.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};


start();
