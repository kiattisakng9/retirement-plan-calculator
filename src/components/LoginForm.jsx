import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/AuthContext";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const adminUsername = process.env.REACT_APP_LOGIN_USERNAME;
	const adminPassword = process.env.REACT_APP_LOGIN_PASSWORD;
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		// For demonstration purposes, let's just validate the credentials locally
		if (username === adminUsername && password === adminPassword) {
			// If credentials are correct, you can redirect the user or do something else
			login();
			navigate("/");
		} else {
			// If credentials are incorrect, display an error message
			setErrorMessage("Invalid username or password");
		}
	};

	return (
		<div className="flex items-center justify-center w-screen h-[87vh] ">
			<form
				className="flex flex-col px-12 py-5 border border-solid rounded border-black-400"
				onSubmit={handleSubmit}
			>
				<div className="grid w-full grid-cols-3 my-2">
					<label className="px-3 py-2 text-lg text-left" htmlFor="username">
						Username:
					</label>
					<input
						type="text"
						id="username"
						className="col-span-2 px-3 py-2 border border-solid rounded border-slate-500"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-3 my-2">
					<label className="px-3 py-2 text-lg text-left" htmlFor="password">
						Password:
					</label>
					<input
						type="password"
						id="password"
						className="col-span-2 px-3 py-2 border border-solid rounded border-slate-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{errorMessage && (
					<p className="text-xs text-red-500 ">{errorMessage}</p>
				)}
				<div className="flex items-center justify-center w-full mt-2">
					<button
						className="px-5 py-2 duration-200 bg-blue-200 rounded hover:bg-blue-500"
						type="submit"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
