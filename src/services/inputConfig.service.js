import axios from "axios";
import bcrypt from "bcryptjs-react";
const apiKey = process.env.REACT_APP_CLOUD_FUNCTIONS_API_KEY;

/**
 * Save input configs into database
 * @param {any} inputValues
 */
export const saveInputConfig = async (inputValues) => {
	const TAG = "[saveInputConfig]";
	try {
		console.info(`${TAG} inserting input configs`);
		const convertedInputValues = prepareRequestBody(inputValues);
		const postURL = process.env.REACT_APP_CLOUD_FUNCTIONS_POST_URL;

		const authHeader = prepareAuthHeaders(apiKey);

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

/**
 * List InputConfigs
 * @returns InputConfig objects
 */
export const fetchInputConfigs = async () => {
	const TAG = "[fetchInputConfigs]";
	try {
		console.info(`${TAG} Fetching all input configs`);
		const getURL = process.env.REACT_APP_CLOUD_FUNCTIONS_LIST_URL;
		const authHeader = prepareAuthHeaders(apiKey);
		const listInputPromise = axios.get(getURL, authHeader);
		console.debug("listInputPromise: ", listInputPromise);

		return listInputPromise;
	} catch (error) {
		console.error(`${TAG} error: `, error);
		return error;
	}
};

/**
 * Get InputConfig by ID
 * @param {string} id ID of InputConfig
 * @returns InputConfig config
 */
export const fetchInputConfigByID = async (id) => {
	const TAG = "[fetchInputConfigById]";
	try {
		console.info(`${TAG} Fetching input config of id`);

		const getByIdURL = `${process.env.REACT_APP_CLOUD_FUNCTIONS_GET_BY_ID_URL}/${id}`;
		const authHeader = prepareAuthHeaders(apiKey);
		const listInputPromise = axios.get(getByIdURL, authHeader);
		console.debug("listInputPromise: ", listInputPromise);

		return listInputPromise;
	} catch (error) {
		console.error(`${TAG} error: `, error);
		return error;
	}
};

/**
 * Prepare request body for API
 */
const prepareRequestBody = ({
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
}) => {
	const TAG = "[prepareRequestBody]";
	console.info(`${TAG} preparing requst body `);

	const convertedInputValues = {
		config_name: configName,
		age: age,
		end_age: endAge,
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

/**
 * Prepare authorization header
 * @param {string} apiKey API key
 * @returns Authorization header with API key
 */
const prepareAuthHeaders = (apiKey) => {
	const TAG = "[prepareAuthHeaders]";
	console.info(`${TAG} preparing auth header`);
	const encryptedKey = bcrypt.hashSync(apiKey, 12);

	const authHeader = {
		headers: {
			"x-api-key": encryptedKey,
			"content-type": "application/json",
		},
	};

	return authHeader;
};
