import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { formatLocaleWithDecimals } from "src/utils/calculation.util";

const WealthTable = ({ retirementData }) => {
	const data = { nodes: retirementData };

	const theme = useTheme([
		getTheme(),
		{
			Table: `
      --data-table-library_grid-template-columns: 7% 14% 15% 17% 14% 15% 18%;
    `,
		},
	]);
	const pagination = usePagination(data, {
		state: {
			page: 0,
			size: 10,
		},
	});

	const COLUMNS = [
		{ label: "Age", renderCell: (item) => item.age },
		{
			label: "Wealth",
			renderCell: (item) => formatLocaleWithDecimals(item.wealth),
		},
		{
			label: "Saving Index",
			renderCell: (item) => formatLocaleWithDecimals(item.savingIndex, 2),
		},
		{
			label: "Accumulation",
			renderCell: (item) => formatLocaleWithDecimals(item.accumulation),
		},
		{
			label: "Expense Index",
			renderCell: (item) => formatLocaleWithDecimals(item.expenseIndex, 2),
		},
		{
			label: "Expense",
			renderCell: (item) => formatLocaleWithDecimals(item.expense),
		},
		{
			label: "Investment Return",
			renderCell: (item) => formatLocaleWithDecimals(item.investmentReturn),
		},
	];

	return (
		<>
			<div className="pt-5">
				<CompactTable
					data={data}
					columns={COLUMNS}
					theme={theme}
					pagination={pagination}
					layout={{ custom: true }}
				/>
				<br />
				<div className="px-5 py-3 mb-5">
					<span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

					<span style={{ float: "right" }}>
						Page:{" "}
						{pagination.state.getPages(data.nodes).map((_, index) => (
							<button
								key={index}
								type="button"
								style={{
									fontWeight:
										pagination.state.page === index ? "bold" : "normal",
									margin: "3px",
									padding: "5px 10px",
									border: "1px solid black",
									borderRadius: "3px",
								}}
								onClick={() => pagination.fns.onSetPage(index)}
							>
								{index + 1}
							</button>
						))}
					</span>
				</div>
			</div>
		</>
	);
};

export default WealthTable;
