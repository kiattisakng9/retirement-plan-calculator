import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const WealthChart = ({ retirementData }) => {
	const [agesData, setAgesData] = useState([]);
	const [wealthData, setWealthData] = useState([]);
	const [expensesData, setExpensesData] = useState([]);
	const [investmentReturnsData, setInvestmentReturnsData] = useState([]);

	useEffect(() => {
		if (retirementData) {
			const ages = retirementData.map((item) => item.age);
			setAgesData(ages);

			const wealths = retirementData.map((item) => item.wealth.toFixed());
			setWealthData(wealths);

			const expenses = retirementData.map((item) => item.expense.toFixed());
			setExpensesData(expenses);
      
			const investmentReturns = retirementData.map((item) =>
				item.investmentReturn.toFixed()
			);
			setInvestmentReturnsData(investmentReturns);
		}
	}, [retirementData]);

	const chartOption = {
		xAxis: {
			type: "category",
			data: agesData,
			name: "Age",
		},
		yAxis: {
			type: "value",
      name: "THB"
		},
		series: [
			{
				data: wealthData,
				type: "line",
				smooth: true,
				name: "Wealth",
			},
			{
				data: expensesData,
				type: "line",
				smooth: true,
				name: "Expense",
			},
			{
				data: investmentReturnsData,
				type: "line",
				smooth: true,
				name: "Investment Return",
			},
		],
		legend: {
			data: ["Wealth", "Expense", "Investment Return"],
			selected: {
				Wealth: true,
				Expense: false,
				"Investment Return": false,
			},
		},
		tooltip: {
			trigger: "axis",
		},
		toolbox: {
			feature: {
				saveAsImage: {},
			},
		},
	};
	return (
		<div className="w-full h-full">
			<ReactECharts option={chartOption} />
		</div>
	);
};

export default WealthChart;
