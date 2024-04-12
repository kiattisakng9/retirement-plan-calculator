import React, { useCallback, useEffect, useState } from "react";
import CalculatorFormInput from "src/components/CalculatorFormInput";
import calculateIcon from "src/assets/images/calculate-icon.gif";
import saveIcon from "src/assets/images/save-icon.gif";
import FormButton from "src/components/FormButton";
import { calculateRetirementData } from "src/utils/calculation.util";
import {
	saveInputConfig,
	fetchInputConfigByID,
} from "src/services/inputConfig.service";
import ConfigSelect from "./ConfigSelect";

const CalculatorForm = ({
	setRetirementData,
	setRetirementDataWithFillers,
}) => {
	const [selectedID, setSelectedID] = useState("");
	const [configName, setConfigName] = useState("");
	const [age, setAge] = useState("");
	const [initialFund, setInitialFund] = useState("");
	const [savingsPerMonth, setSavingsPerMonth] = useState("");
	const [savingsGrowth, setSavingsGrowth] = useState("");
	const [retirementAge, setRetirementAge] = useState("");
	const [monthlyExpenses, setMonthlyExpenses] = useState("");
	const [inflation, setInflation] = useState("");
	const [investmentReturn, setInvestmentReturn] = useState("");
	const [retirementReturn, setRetirementReturn] = useState("");
	const [endAge, setEndAge] = useState("");

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

	/**
	 * Handle form inputs clear
	 * @param {event} e event object
	 */
	const handleClearInputs = (e) => {
		e.preventDefault();
		clearInputs();
		clearVisualizationData();
	};

	/**
	 * Clear form inputs
	 */
	const clearInputs = () => {
		setAge("");
		setInitialFund("");
		setSavingsPerMonth("");
		setSavingsGrowth("");
		setRetirementAge("");
		setMonthlyExpenses("");
		setInflation("");
		setInvestmentReturn("");
		setRetirementReturn("");
		setEndAge("");
	};

	/**
	 * Clear visualization data
	 */
	const clearVisualizationData = () => {
		setRetirementData(null);
		setRetirementDataWithFillers(null);
	};

	useEffect(() => {
		const getConfigInputByID = async () => {
			try {
				const selectedConfig = await fetchInputConfigByID(selectedID);
				const {
					config_name,
					age,
					end_age,
					initial_fund,
					investment_return,
					saving_growth_percentage,
					monthly_expense,
					inflation_percentage,
					retirement_age,
					savings_per_month,
					retirement_return,
				} = selectedConfig?.data?.data || {};

				setConfigName(config_name);
				setAge(age);
				setEndAge(end_age);
				setInitialFund(initial_fund);
				setInvestmentReturn(investment_return);
				setSavingsGrowth(saving_growth_percentage);
				setMonthlyExpenses(monthly_expense);
				setInflation(inflation_percentage);
				setRetirementAge(retirement_age);
				setSavingsPerMonth(savings_per_month);
				setRetirementReturn(retirement_return);
			} catch (error) {
				console.error(error);
			}
		};
		if (selectedID !== "") getConfigInputByID();
	}, [selectedID]);

	return (
		<form className="py-5">
			<ConfigSelect
				setConfigName={setConfigName}
				setSelectedID={setSelectedID}
				clearInputs={clearInputs}
			/>
			<div className="grid gap-2 bg-blue-100 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-2 max-sm:whitespace-nowrap">
				<CalculatorFormInput
					inputId="age-input"
					inputName="inputAge"
					inputDisplayLabel="Age"
					inputPlaceholder="E.g., 35"
					inputType="number"
					inputStep="0"
					inputValue={age}
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
					inputValue={retirementAge}
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
					inputValue={endAge}
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
					inputValue={initialFund}
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
					inputValue={savingsPerMonth}
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
					inputValue={savingsGrowth}
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
					inputValue={monthlyExpenses}
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
					inputValue={inflation}
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
					inputValue={investmentReturn}
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
					inputValue={retirementReturn}
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
			<div className="flex flex-row mt-10 mb-5">
				<div className="flex justify-center w-full">
					<FormButton
						buttonText={"Reset"}
						onClickFn={handleClearInputs}
						btnIcon={calculateIcon}
					/>
				</div>
			</div>
		</form>
	);
};

export default CalculatorForm;
