import React from "react";
import { Link } from "react-router-dom";

const NavBarLink = ({link, navtitle}) => {
	return (
		<Link to={link}>
			<h1 className="mb-6 lg:text-xl md:text-lg sm:text-base">{navtitle}</h1>
		</Link>
	);
};

export default NavBarLink;
