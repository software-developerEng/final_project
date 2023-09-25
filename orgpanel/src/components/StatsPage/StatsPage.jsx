import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "../Dashboard/Chart";

function StatsPage() {
	const [today, setToday] = useState([]);
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
		setToday(data);
	}, []);

	const [yesturday, setYesturday] = useState([]);
	useEffect(() => {
		const data = [
			{ time: "00:00", amount: 0 },
			{ time: "03:00", amount: 3 },
			{ time: "06:00", amount: 6 },
			{ time: "09:00", amount: 7 },
			{ time: "12:00", amount: 12 },
			{ time: "15:00", amount: 11 },
			{ time: "18:00", amount: 18 },
			{ time: "21:00", amount: 24 },
			{ time: "24:00", amount: undefined },
		];
		setYesturday(data);
	}, []);

	return (
		<>
			<Grid item xs={12} md={8} lg={9}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						height: 240,
					}}
				>
					<Chart data={today} title={"Today"} label={"Volunteers"} />
				</Paper>
			</Grid>
			<Grid item xs={12} md={8} lg={9}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						height: 240,
					}}
				>
					<Chart data={yesturday} title={"Yesturday"} label={"Volunteers"} />
				</Paper>
			</Grid>
		</>
	);
}

export default StatsPage;
