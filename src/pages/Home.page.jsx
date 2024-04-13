import React from "react";
import { useAuth } from "src/AuthContext";

const HomePage = () => {
	const { isLoggedIn } = useAuth();
	return (
		<div className="flex flex-col justify-center items-center w-screen h-[87vh] ">
			<h1 className="w-auto text-9xl">Welcome!</h1>
			{!isLoggedIn && (
				<h2 className="font-sans text-lg">
					Please login to use the calculator
				</h2>
			)}
		</div>
	);
};

export default HomePage;
