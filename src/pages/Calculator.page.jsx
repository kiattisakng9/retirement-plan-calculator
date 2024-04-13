import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/AuthContext";
import CalculatorForm from "src/components/CalculatorForm";
import DataVisualizationSection from "src/components/DataVisualizationSection";
import NoCalculationsDisplay from "src/components/NoCalculationsDisplay";

const CalculatorPage = () => {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!isLoggedIn) navigate("/login");
	}, [isLoggedIn, navigate]);
	
	const [retirementDataWithFillers, setRetirementDataWithFillers] =
		useState(null);
	const [retirementData, setRetirementData] = useState(null);

	return (
		<div className="flex flex-row mx-5 my-10">
			<div className="flex justify-center w-4/12 rounded-3xl">
				<div className="w-full px-12 bg-blue-100 border border-black border-solid rounded">
					<div className="flex items-center bg-blue-100 sm:justify-center max-sm:justify-center">
						<CalculatorForm
							setRetirementData={setRetirementData}
							setRetirementDataWithFillers={setRetirementDataWithFillers}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center w-8/12 pl-5">
				{retirementData ? (
					<DataVisualizationSection
						retirementData={retirementData}
						retirementDataWithFillers={retirementDataWithFillers}
					/>
				) : (
					<NoCalculationsDisplay />
				)}
			</div>
		</div>
	);
};

export default CalculatorPage;
