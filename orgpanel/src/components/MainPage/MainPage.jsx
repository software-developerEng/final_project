import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Chart from "../Dashboard/Chart";
import TotalUsers from "../Dashboard/TotalUsers";
import Users from "../Dashboard/Users";

function MainPage() {
	const [chartData, setChartData] = useState([]);
	// To Add Data To Chart
	useEffect(() => {
		const data = [
			{ time: "00:00", amount: 0 },
			{ time: "03:00", amount: 3 },
			{ time: "06:00", amount: 6 },
			{ time: "09:00", amount: 18 },
			{ time: "12:00", amount: 12 },
			{ time: "15:00", amount: 15 },
			{ time: "18:00", amount: 18 },
			{ time: "21:00", amount: 21 },
			{ time: "24:00", amount: undefined },
		];
		setChartData(data);
	}, []);

	// CALL API HERE: Get Todays Volinteers with their ratings
	const [rows, setRows] = useState([]);
	useEffect(() => {
		const exampleRows = [
			{ id: 0, date: "16 Mar, 2019", name: "Elvis Presley", rating: 1 },
			{ id: 1, date: "16 Mar, 2019", name: "Paul McCartney", rating: 2 },
			{ id: 3, date: "16 Mar, 2019", name: "Tom Scholz", rating: 3 },
			{ id: 4, date: "16 Mar, 2019", name: "Michael Jackson", rating: 4 },
			{ id: 5, date: "15 Mar, 2019", name: "Bruce Springsteen", rating: 5 },
		];
		setRows(exampleRows);
	}, []);
	return (
		<>
			{/* Chart */}
			<Grid item xs={12} md={8} lg={9}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						height: 240,
					}}
				>
					<Chart data={chartData} title={"Today"} label={"Volunteers"} />
				</Paper>
			</Grid>

			{/* Total Users */}
			<Grid item xs={12} md={4} lg={3}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						height: 240,
					}}
				>
					<TotalUsers />
				</Paper>
			</Grid>

			{/* Recent Users */}
			<Grid item xs={12}>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<Users rows={rows} />
				</Paper>
			</Grid>
		</>
	);
}

export default MainPage;
