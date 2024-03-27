import React from "react";

const FormButton = ({ buttonText, onClickFn, btnIcon }) => {
	return (
		<div className="flex mt-10 lg:justify-center lg:items-center md:justify-center md:items-center sm:justify-center sm:items-center max-sm:justify-center max-sm:items-center">
			<button
				className="flex items-center gap-1 px-3 py-3 font-semibold text-black duration-200 bg-blue-200 rounded-full lg:text-xl md:text-sm sm:text-sm max-sm:text-sm hover:bg-blue-500"
				onClick={onClickFn}
			>
				<img className="w-5 h-5 " src={btnIcon} alt="calculate" />
				{buttonText}
			</button>
		</div>
	);
};

export default FormButton;
