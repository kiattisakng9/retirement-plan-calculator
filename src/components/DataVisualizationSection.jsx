import React from "react";
import WealthChart from "./WealthChart";

const DataVisualizationSection = ({retirementData}) => {
	return (
		<>
			<div className="absolute lg:top-32 lg:right-80 md:right-80 sm:right-72 max-sm:right-40">
				<h1 className=" lg:m-0 lg:text-lg md:mt-10 md:text-base sm:mt-10 sm:text-base max-sm:mt-10 max-sm:text-sm">
					Data Visualization
				</h1>
			</div>
			<div className="absolute lg:top-44 lg:right-20 ">
				<div
					className="
              flex justify-center border-solid border-black border rounded 
              lg:w-[750px] lg:h-72
              md:w-[600px] md:h-48 md:ml-20
              sm:w-[550px] sm:h-44 sm:ml-24
              max-sm:w-[350px] max-sm:h-36 max-sm:ml-10"
				>
					<WealthChart retirementData={retirementData}/>
				</div>
			</div>
		</>
	);
};

export default DataVisualizationSection;
