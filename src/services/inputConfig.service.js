import axios from "axios";
import bcrypt from "bcryptjs-react";

export const saveInputConfig = async (inputValues) => {
	const TAG = "[saveInputConfig]";
	try {
		const convertedInputValues = prepareRequestBody(inputValues);
		console.log("convertedInputValues: ", convertedInputValues);
		// const postURL = "http://localhost:8080/"; // FOR DEVELOPMENT ONLY
		const postURL = `${process.env.REACT_APP_CLOUD_FUNCTIONS_BASE_URL}/user-inputs`;
		const apiKey = process.env.REACT_APP_CLOUD_FUNCTIONS_API_KEY;
		const encryptedKey = bcrypt.hashSync(apiKey, 12);

		const authHeader = {
			headers: {
				"x-api-key": encryptedKey,
				"content-type": "application/json",
			},
		};

		const saveInputPromise = axios.post(
			postURL,
			JSON.stringify(convertedInputValues),
			authHeader
		);

		return saveInputPromise;
	} catch (error) {
		console.error(`${TAG} error: `, error);
		return error;
	}
};

const prepareRequestBody = ({
	configName,
	initialFund,
	savingsPerMonth,
	savingsGrowth,
	retirementAge,
	monthlyExpenses,
	inflation,
	investmentReturn,
	retirementReturn,
}) => {
	const convertedInputValues = {
		config_name: configName,
		initial_fund: initialFund,
		savings_per_month: savingsPerMonth,
		saving_growth_percentage: savingsGrowth,
		retirement_age: retirementAge,
		monthly_expense: monthlyExpenses,
		inflation_percentage: inflation,
		investment_return: investmentReturn,
		retirement_return: retirementReturn,
	};

	return convertedInputValues;
};
