import React from "react";
import NavBarLink from "./NavBarLink";

const NavBar = () => {
	return (
		<div className="flex justify-end mt-6 mr-10 lg:font-bold lg:flex lg:gap-5 md:font-bold md: md:justify-end md:gap-4 sm:font-bold sm:gap-3 max-sm:font-bold max-sm:gap-2">
			<NavBarLink link={"/"} navtitle={"Home"} />
			<NavBarLink link={"/calculator"} navtitle={"Calculator"} />
		</div>
	);
};

export default NavBar;
