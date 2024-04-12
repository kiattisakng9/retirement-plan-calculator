import React from "react";

const CalculatorFormInput = ({
	inputId,
	inputName,
	inputDisplayLabel,
	inputPlaceholder,
	inputType,
	inputStep,
  setStateFn,
  isRequired = false
}) => {
  const handleOnChange = (e) =>{
    setStateFn(e.target.value);
  }
	return (
		<div className="grid-rows-2 lg:mt-5 md:mt-5 sm:mt-5 max-sm:mt-5 ">
			<div>
				<label
					htmlFor={inputId}
					className="block font-medium lg:text-lg md:text-xs sm:text-xs max-sm:text-xs"
				>
					{inputDisplayLabel} {isRequired && (<span className="text-red-500">*</span>)}
				</label>
				<div className="mt-2">
					<input
						type={inputType}
						name={inputName}
						id={inputId}
						step={inputStep}
						className=" 
        lg:w-full lg:block lg:rounded-md lg:py-1.5 lg:px-2 lg:ring-1 lg:ring-inset lg:ring-gray-400 lg:focus:text-gray-800 
        md:w-28 md:block md:rounded-md md:py-1.5 md:px-2 md:ring-1 md:ring-inset md:ring-gray-400 md:focus:text-gray-800
        sm:w-32 sm:block sm:rounded-md sm:py-1.5 sm:px-2 sm:ring-1 sm:ring-inset sm:ring-gray-400 sm:focus:text-gray-800
        max-sm: w-20 max-sm:block max-sm:rounded-md max-sm:py-1.5 max-sm:px-2 max-sm:ring-1 max-sm:ring-inset max-sm:ring-gray-400 max-sm:focus:text-gray-800
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						placeholder={inputPlaceholder}
            onChange={handleOnChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default CalculatorFormInput;
