import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout";
import GuestRoute from "../routes/guest-route";
import AuthenticatedRoute from "../routes/authenticated-route";
import Error from "../pages/error";
import Login from "../pages/login";
import Register from "../pages/register";
import Chat from "../pages/chat";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Friends from "../pages/friend";
import { io } from "socket.io-client";


function AllRoutes() {
	return (
		<Routes>
			<Route element={<GuestRoute />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
			<Route path="/" element={<AuthenticatedRoute />}>
				<Route index element={<MainLayout component={Home} />} />
				<Route path="chat" element={<MainLayout component={Chat} />} />
				<Route
					path="profile"
					element={<MainLayout component={Profile} />}
				/>
				<Route
					path="users/:id"
					element={<MainLayout component={Profile} />}
				/>
				<Route
					path="friend"
					element={<MainLayout component={Friends} />}
				/>
			</Route>
			<Route path="*" element={<Error />} />
		</Routes>
	);
}
export default AllRoutes;
