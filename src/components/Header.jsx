import React from "react";
import CompanyLogo from "./CompanyLogo";
import NavBar from "./NavBar";

const Header = () => {
	return (
		<div className="flex items-center justify-between pt-3 pl-3 lg:bg-blue-100 md:bg-blue-100 sm:bg-blue-100 max-sm:bg-blue-100">
			<header className="items-center mt-6 mb-6 ml-10 lg:flex md:flex sm:flex max-sm:flex">
				<CompanyLogo />
			</header>
			<NavBar />
		</div>
	);
};

export default Header;
