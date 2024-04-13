import React from "react";
import NavBarLink from "./NavBarLink";
import { useAuth } from "src/AuthContext";

const NavBar = () => {
	const { isLoggedIn } = useAuth();
	return (
		<div className="flex justify-end mt-6 mr-10 lg:font-bold lg:flex lg:gap-5 md:font-bold md: md:justify-end md:gap-4 sm:font-bold sm:gap-3 max-sm:font-bold max-sm:gap-2">
			<NavBarLink link={"/"} navtitle={"Home"} />
			{isLoggedIn ? (
				<>
					<NavBarLink link={"/calculator"} navtitle={"Calculator"} />
					<NavBarLink link={"/login"} navtitle={"Logout"} />
				</>
			) : (
				<NavBarLink link={"/login"} navtitle={"Login"} />
			)}
		</div>
	);
};

export default NavBar;
