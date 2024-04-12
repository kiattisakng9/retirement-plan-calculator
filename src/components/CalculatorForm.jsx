import React, { useCallback, useState } from "react";
import CalculatorFormInput from "src/components/CalculatorFormInput";
import calculateIcon from "src/assets/images/calculate-icon.gif";
import saveIcon from "src/assets/images/save-icon.gif";
import FormButton from "src/components/FormButton";
import { calculateRetirementData } from "src/utils/calculation.util";
import { saveInputConfig } from "src/services/inputConfig.service";

const CalculatorForm = ({
	setRetirementData,
	setRetirementDataWithFillers,
}) => {
	const [configName, setConfigName] = useState("");
	const [age, setAge] = useState(0);
	const [initialFund, setInitialFund] = useState(0);
	const [savingsPerMonth, setSavingsPerMonth] = useState(0);
	const [savingsGrowth, setSavingsGrowth] = useState(0);
	const [retirementAge, setRetirementAge] = useState(0);
	const [monthlyExpenses, setMonthlyExpenses] = useState(0);
	const [inflation, setInflation] = useState(0);
	const [investmentReturn, setInvestmentReturn] = useState(0);
	const [retirementReturn, setRetirementReturn] = useState(0);
	const [endAge, setEndAge] = useState(99);

	/**
	 * Handle calculation callback
	 */
	const handleCalculate = useCallback(
		(e) => {
			const inputValues = {
				configName,
				age,
				endAge,
				initialFund,
				savingsPerMonth,
				savingsGrowth,
				retirementAge,
				monthlyExpenses,
				inflation,
				investmentReturn,
				retirementReturn,
			};
			console.log("[handleCalculate] inputValues: ", inputValues);

			const resultDataWithFillers = calculateRetirementData(
				age,
				endAge,
				initialFund,
				savingsPerMonth,
				savingsGrowth,
				retirementAge,
				monthlyExpenses,
				inflation,
				investmentReturn,
				retirementReturn,
				true
			);

			const resultData = calculateRetirementData(
				age,
				endAge,
				initialFund,
				savingsPerMonth,
				savingsGrowth,
				retirementAge,
				monthlyExpenses,
				inflation,
				investmentReturn,
				retirementReturn,
				false
			);

			setRetirementDataWithFillers(resultDataWithFillers);
			setRetirementData(resultData);
			e.preventDefault();
		},
		[
			configName,
			age,
			endAge,
			initialFund,
			savingsPerMonth,
			savingsGrowth,
			retirementAge,
			monthlyExpenses,
			inflation,
			investmentReturn,
			retirementReturn,
			setRetirementDataWithFillers,
			setRetirementData,
		]
	);

	/**
	 * Handle config data submission callback
	 */
	const handleSubmit = useCallback(
		async (e) => {
			try {
				e.preventDefault();
				const inputValues = {
					configName,
					age,
					endAge,
					initialFund,
					savingsPerMonth,
					savingsGrowth,
					retirementAge,
					monthlyExpenses,
					inflation,
					investmentReturn,
					retirementReturn,
				};

				const saveInputConfigResponse = await saveInputConfig(inputValues);

				const responseData = saveInputConfigResponse?.data;
				console.debug("[handleSubmit] responseData: ", responseData);
				if (responseData && responseData?.message === "success") {
					alert("Config saved successfully!");
				}
				
			} catch (error) {
				alert("Something went wrong. Unable to save input configs!");
			}
		},
		[
			configName,
			age,
			endAge,
			initialFund,
			savingsPerMonth,
			savingsGrowth,
			retirementAge,
			monthlyExpenses,
			inflation,
			investmentReturn,
			retirementReturn,
		]
	);

	return (
		<form className="py-5">
			<CalculatorFormInput
				inputId="config-name-input"
				inputName="inputConfigName"
				inputDisplayLabel="Config Name"
				inputPlaceholder="E.g., Retirement for 35 years old Individual"
				inputType="text"
				inputStep="0"
				setStateFn={setConfigName}
			/>
			<div className="grid gap-2 bg-blue-100 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-2 max-sm:whitespace-nowrap">
				<CalculatorFormInput
					inputId="age-input"
					inputName="inputAge"
					inputDisplayLabel="Age"
					inputPlaceholder="E.g., 35"
					inputType="number"
					inputStep="0"
					setStateFn={setAge}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="retirement-age-input"
					inputName="inputRetirementAge"
					inputDisplayLabel="Retirement Age"
					inputPlaceholder="E.g., 55"
					inputType="number"
					inputStep="0"
					setStateFn={setRetirementAge}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="end-age-input"
					inputName="inputEndAge"
					inputDisplayLabel="End Age"
					inputPlaceholder="E.g., 99"
					inputType="number"
					inputStep="0"
					setStateFn={setEndAge}
					isRequired={false}
				/>
				<CalculatorFormInput
					inputId="initial-fund-input"
					inputName="inputInitialFund"
					inputDisplayLabel="Initial Fund"
					inputPlaceholder="E.g., 1,000,000"
					inputType="number"
					inputStep="0"
					setStateFn={setInitialFund}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="savings-per-month-input"
					inputName="inputSavingsPerMonth"
					inputDisplayLabel="Savings Per Month"
					inputPlaceholder="E.g., 30,000"
					inputType="number"
					inputStep="0"
					setStateFn={setSavingsPerMonth}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="savings-growth-input"
					inputName="inputSavingsGrowth"
					inputDisplayLabel="Savings Growth"
					inputPlaceholder="E.g., 3"
					inputType="number"
					inputStep="0.1"
					setStateFn={setSavingsGrowth}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="monthly-expenses-input"
					inputName="inputMonthlyExpenses"
					inputDisplayLabel="Monthly Expenses"
					inputPlaceholder="E.g., 40,000"
					inputType="number"
					inputStep="0"
					setStateFn={setMonthlyExpenses}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="inflation-input"
					inputName="inputInflation"
					inputDisplayLabel="Inflation (%)"
					inputPlaceholder="E.g., 2.5"
					inputType="number"
					inputStep="0.1"
					setStateFn={setInflation}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="investment-return-input"
					inputName="inputInvestmentReturn"
					inputDisplayLabel="Investment Return (%)"
					inputPlaceholder="E.g., 4"
					inputType="number"
					inputStep="0.1"
					setStateFn={setInvestmentReturn}
					isRequired={true}
				/>
				<CalculatorFormInput
					inputId="retirement-return-input"
					inputName="inputRetirementReturn"
					inputDisplayLabel="Retirement Return (%)"
					inputPlaceholder="E.g., 3"
					inputType="number"
					inputStep="0.1"
					setStateFn={setRetirementReturn}
					isRequired={true}
				/>
			</div>
			<div className="flex flex-row mt-10 mb-5">
				<div className="flex justify-center w-6/12">
					<FormButton
						buttonText={"Calculate"}
						onClickFn={handleCalculate}
						btnIcon={calculateIcon}
					/>
				</div>
				<div className="flex justify-center w-6/12 ">
					<FormButton
						buttonText={"Save"}
						onClickFn={handleSubmit}
						btnIcon={saveIcon}
					/>
				</div>
			</div>
		</form>
	);
};

export default CalculatorForm;
