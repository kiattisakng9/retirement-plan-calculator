import React from "react";
import NavBarLink from "./NavBarLink";
import { useAuth } from "src/AuthContext";
import { useNavigate } from "react-router";

const NavBar = () => {
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="flex justify-end mt-6 mr-10 lg:font-bold lg:flex lg:gap-5 md:font-bold md: md:justify-end md:gap-4 sm:font-bold sm:gap-3 max-sm:font-bold max-sm:gap-2">
			<NavBarLink link={"/"} navtitle={"Home"} />
			{isLoggedIn ? (
				<>
					<NavBarLink link={"/calculator"} navtitle={"Calculator"} />
					<p
						className="mb-6 cursor-pointer lg:text-xl md:text-lg sm:text-base"
						onClick={() => {
							logout();
							navigate("/login");
						}}
					>
						Logout
					</p>
				</>
			) : (
				<NavBarLink link={"/login"} navtitle={"Login"} />
			)}
		</div>
	);
};

export default NavBar;
