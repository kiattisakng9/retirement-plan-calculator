import React from "react";
import WealthChart from "./WealthChart";
import WealthTable from "./WealthTable";

const DataVisualizationSection = ({
	retirementData,
	retirementDataWithFillers,
}) => {
	return (
		<>
			<div className="w-full border border-black border-solid rounded lg:h-72 md:h-48 sm:h-44 max-sm:h-36">
				<WealthChart retirementData={retirementDataWithFillers} />
			</div>
			<div className="w-full border border-black border-solid rounded md:mt-5 sm:mt-10 max-sm:mt-10 lg:h-full">
				<WealthTable retirementData={retirementData} />
			</div>
		</>
	);
};

export default DataVisualizationSection;
