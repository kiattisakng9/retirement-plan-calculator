import React,{useState} from 'react'
import CalculatorFormInput from "src/components/CalculatorFormInput";
import calculateIcon from "src/assets/images/calculate-icon.gif";
import FormButton from "src/components/FormButton";

const CalculatorForm = () => {
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

	const handleSubmit = (e) => {
		const inputValues = {
			configName,
			age,
			initialFund,
			savingsPerMonth,
			savingsGrowth,
			retirementAge,
			monthlyExpenses,
			inflation,
			investmentReturn,
			retirementReturn,
		};
		console.log("inputValues: ", inputValues);
		e.preventDefault();
	};
  return (
    <form>
							<CalculatorFormInput
								inputId="config-name-input"
								inputName="inputConfigName"
								inputDisplayLabel="Config Name"
								inputPlaceholder="E.g., Retirement for 35 years old Individual"
								inputType="text"
								setStateFn={setConfigName}
							/>
							<div className="grid gap-2 bg-blue-100 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-2 max-sm:whitespace-nowrap">
								<CalculatorFormInput
									inputId="age-input"
									inputName="inputAge"
									inputDisplayLabel="Age"
									inputPlaceholder="E.g., 35"
									inputType="number"
									setStateFn={setAge}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="retirement-age-input"
									inputName="inputRetirementAge"
									inputDisplayLabel="Retirement Age"
									inputPlaceholder="E.g., 55"
									inputType="number"
									setStateFn={setRetirementAge}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="initial-fund-input"
									inputName="inputInitialFund"
									inputDisplayLabel="Initial Fund"
									inputPlaceholder="E.g., 100000"
									inputType="number"
									setStateFn={setInitialFund}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="savings-per-month-input"
									inputName="inputSavingsPerMonth"
									inputDisplayLabel="Savings Per Month"
									inputPlaceholder="E.g., 10000"
									inputType="number"
									setStateFn={setSavingsPerMonth}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="savings-growth-input"
									inputName="inputSavingsGrowth"
									inputDisplayLabel="Savings Growth"
									inputPlaceholder="E.g., 50000"
									inputType="number"
									setStateFn={setSavingsGrowth}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="monthly-expenses-input"
									inputName="inputMonthlyExpenses"
									inputDisplayLabel="Monthly Expenses"
									inputPlaceholder="E.g., 5000"
									inputType="number"
									setStateFn={setMonthlyExpenses}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="inflation-input"
									inputName="inputInflation"
									inputDisplayLabel="Inflation (%)"
									inputPlaceholder="E.g., 1.2"
									inputType="number"
									setStateFn={setInflation}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="investment-return-input"
									inputName="inputInvestmentReturn"
									inputDisplayLabel="Investment Return (%)"
									inputPlaceholder="E.g., 10"
									inputType="number"
									setStateFn={setInvestmentReturn}
									isRequired={true}
								/>
								<CalculatorFormInput
									inputId="retirement-return-input"
									inputName="inputRetirementReturn"
									inputDisplayLabel="Retirement Return (%)"
									inputPlaceholder="E.g., 20"
									inputType="number"
									setStateFn={setRetirementReturn}
									isRequired={true}
								/>
							</div>
							<FormButton
								buttonText={"Calculate"}
								onClickFn={handleSubmit}
								btnIcon={calculateIcon}
							/>
						</form>
  )
}

export default CalculatorForm