/**
 * Calculate retirement planning data
 * @param {number} startAge starting age for loop
 * @param {number} endAge end age for loop
 * @param {number} initialFund initial fund
 * @param {number} savingsPerMonth savings per month
 * @param {number} savingGrowth saving growth percentage
 * @param {number} retirementAge retirement age
 * @param {number} monthlyExpense monthly expense
 * @param {number} inflation inflation percentage
 * @param {number} investmentReturn investment return
 * @param {number} retirementReturn retirement return
 * @returns retirement planner data
 */
export const calculateRetirementData = (
	startAge,
	endAge,
	initialFund,
	savingsPerMonth,
	savingGrowth,
	retirementAge,
	monthlyExpense,
	inflation,
	investmentReturn,
	retirementReturn
) => {
	const parsedStartAge = parseInt(startAge);
	const parsedEndAge = parseInt(endAge);
	const parsedInitialFund = parseInt(initialFund);
	const parsedSavingsPerMonth = parseInt(savingsPerMonth);
	const parsedSavingGrowthDecimal = parseFloat(savingGrowth) / 100;
	const parsedRetirementAge = parseInt(retirementAge);
	const parsedMonthlyExpense = parseInt(monthlyExpense);
	const parsedInflationDecimal = parseFloat(inflation) / 100;
	const parsedInvestmentReturnDecimal = parseFloat(investmentReturn) / 100;
	const parsedRetirementReturnDecimal = parseFloat(retirementReturn) / 100;

	const resultData = initializeData(parsedStartAge);
	const agePeriod = parseInt(parsedEndAge - parsedStartAge);
	let currentWealth = parsedInitialFund;
	let currentAccumulation = 0;
	let currentExpense = 0;
	let currentInvestmentReturn = 0;

	for (let i = 0; i <= agePeriod; i++) {
		const currentAge = parsedStartAge + i;
		const isFirstLoop = i === 0;
		const isRetired = checkRetired(currentAge, parsedRetirementAge);
		let data = { age: currentAge };

		const savingIndex = calculatePercentageIndex(parsedSavingGrowthDecimal, i);
		const expenseIndex = calculatePercentageIndex(parsedInflationDecimal, i);
		const accumulation = calculateAccumulations(
			isRetired,
			parsedSavingsPerMonth,
			savingIndex
		);
		const expense = calculateExpense(
			isRetired,
			parsedMonthlyExpense,
			expenseIndex
		);
		const percentageReturn = isRetired
			? parsedRetirementReturnDecimal
			: parsedInvestmentReturnDecimal;
		const wealth = isFirstLoop
			? parsedInitialFund
			: calculateWealth(
					currentWealth,
					currentAccumulation,
					currentExpense,
					currentInvestmentReturn
			  );
		const investmentReturn = calculateInvestmentReturn(
			wealth,
			percentageReturn
		);

		currentWealth = wealth;
		currentAccumulation = accumulation;
		currentExpense = expense;
		currentInvestmentReturn = investmentReturn;

		data.wealth = wealth;
		data.savingIndex = savingIndex;
		data.accumulation = accumulation;
		data.expenseIndex = expenseIndex;
		data.expense = expense;
		data.investmentReturn = investmentReturn;

		resultData.push(data);
	}

	return resultData;
};

/**
 * Initialize data array
 * @param {number} startAge starting age
 * @returns initialized array
 */
const initializeData = (startAge) => {
	let count = 1;
	const dataArray = [];

	while (count < startAge) {
		dataArray.push({
			accumulation: 0,
			age: count,
			expense: 0,
			expenseIndex: 0,
			investmentReturn: 0,
			savingIndex: 0,
			wealth: 0,
		});
		count++;
	}

	return dataArray;
};

/**
 * Calculate percentage index (for savingIndex and expenseIndex)
 * @param {number} percentageIndex
 * @param {number} currentIndex
 * @returns {number} savingIndex or expenseIndex
 */
const calculatePercentageIndex = (percentageIndex, currentIndex) => {
	const incrementPercentage = parseFloat(1 + percentageIndex);
	const seIndex = Math.pow(incrementPercentage, currentIndex);

	return seIndex;
};

/**
 * Calculate accumulations
 * @param {boolean} isRetired Retired status
 * @param {number} savingsPerMonth savings per month
 * @param {number} savingIndex saving index
 * @returns {number} accumulations
 */
const calculateAccumulations = (isRetired, savingsPerMonth, savingIndex) => {
	if (isRetired) return 0;

	const accumulation = savingsPerMonth * 12 * savingIndex;
	return accumulation;
};

/**
 * Calculate expense
 * @param {boolean} isRetired Retired status
 * @param {number} monthlyExpense monthly expense
 * @param {number} expenseIndex expense index
 * @returns {number} expense
 */
const calculateExpense = (isRetired, monthlyExpense, expenseIndex) => {
	if (!isRetired) return 0;

	const expense = monthlyExpense * 12 * expenseIndex;
	return expense;
};

/**
 * Calculate investment return based on investment or
 * retirement return
 * @param {number} currentWealth Current wealth
 * @param {number} percentageReturn percentage return
 * @returns {number} investment return
 */
const calculateInvestmentReturn = (currentWealth, percentageReturn) => {
	if (currentWealth < 0) return 0;
	return currentWealth * percentageReturn;
};

/**
 * Calculate wealth
 * @param {number} currentWealth current wealth
 * @param {number} accumulation accumulations
 * @param {number} expense expenses
 * @param {number} investmentReturn investment returns
 * @returns {number} wealth
 */
const calculateWealth = (
	currentWealth,
	accumulation,
	expense,
	investmentReturn
) => {
	const calculatedWealth =
		currentWealth + accumulation - expense + investmentReturn;

	return calculatedWealth;
};

/**
 * Check if retired
 * @param {number} currentAge
 * @param {number} retirementAge
 * @returns {boolean} retired status
 */
const checkRetired = (currentAge, retirementAge) => currentAge > retirementAge;
