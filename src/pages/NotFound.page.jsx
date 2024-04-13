import React from "react";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center w-screen h-[87vh] ">
			<div className="w-4/12 h-52">
				<div className="w-full">
					<h2 className="font-mono text-6xl">
						404 <span className="text-sm">Not Found</span>
					</h2>
				</div>
				<div className="w-full mt-6">
					<p className="font-mono text-xs">Sorry, the page you are looking for does not exist.</p>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
