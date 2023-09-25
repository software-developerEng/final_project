import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState } from "react";
import { useEffect } from "react";

export default function TotalUsers() {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000); // Update the current date every second

		return () => {
			clearInterval(intervalId); // Clean up the interval when the component unmounts
		};
	}, []);
	return (
		<React.Fragment>
			<Title>Total Users</Title>
			<Typography component="p" variant="h4">
				#
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{currentDate.toLocaleString()}
			</Typography>
		</React.Fragment>
	);
}
