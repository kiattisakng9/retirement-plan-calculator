import React, { useState } from "react";
import { useEffect } from "react";
import CalculatorForm from "src/components/CalculatorForm";
import DataVisualizationSection from "src/components/DataVisualizationSection";

const CalculatorPage = () => {
	const [retirementData, setRetirementData] = useState(null);
	useEffect(() => {
		console.table(retirementData)
	}, [retirementData])
	
	return (
		<div>
			<div className="flex items-center justify-between ml-20 mr-20 rounded-3xl">
				<div className="p-6 mt-10 bg-blue-100 border border-black border-solid rounded lg:mt-10 lg:ml-1 md:mt-10 md:ml-24 md:mr-24 sm:mt-10 sm:ml-10 sm:mr-10 max-sm:mt-10 max-sm:ml-10 max-sm:mr-10">
					<div className="flex items-center bg-blue-100 lg:justify-start md:justify-center sm:justify-center max-sm:justify-center">
						<CalculatorForm setRetirementData={setRetirementData} />
					</div>
				</div>
			</div>
			<div>
				{retirementData && <DataVisualizationSection retirementData={retirementData}/>}
			</div>
		</div>
	);
};

export default CalculatorPage;
