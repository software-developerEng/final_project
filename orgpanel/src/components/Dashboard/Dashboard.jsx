import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

// import { mainListItems } from "./listItems";
import MainPage from "../MainPage/MainPage";
import { useState } from "react";
import UsersPage from "../UsersPage/UsersPage";
import StatsPage from "../StatsPage/StatsPage";
import { useEffect } from "react";

export const PageContext = React.createContext();

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	const [page, setPage] = useState(1);

	const [rows, setRows] = useState([]);
	useEffect(() => {
		const data = [
			{ name: "Cupcake", numV: 305, lastLoc: 3.7, rating: 67 },
			{ name: "Donut", numV: 452, lastLoc: 25.0, rating: 51 },
			{ name: "Eclair", numV: 262, lastLoc: 16.0, rating: 24 },
			{ name: "Frozen yoghurt", numV: 159, lastLoc: 6.0, rating: 24 },
			{ name: "Gingerbread", numV: 356, lastLoc: 16.0, rating: 49 },
			{ name: "Honeycomb", numV: 408, lastLoc: 3.2, rating: 87 },
			{ name: "Ice cream sandwich", numV: 237, lastLoc: 9.0, rating: 37 },
			{ name: "Jelly Bean", numV: 375, lastLoc: 0.0, rating: 94 },
			{ name: "KitKat", numV: 518, lastLoc: 26.0, rating: 65 },
			{ name: "Lollipop", numV: 392, lastLoc: 0.2, rating: 98 },
			{ name: "Marshmallow", numV: 318, lastLoc: 0, rating: 81 },
			{ name: "Nougat", numV: 360, lastLoc: 19.0, rating: 9 },
			{ name: "Oreo", numV: 437, lastLoc: 18.0, rating: 63 },
		];
		setRows(data);
	}, []);

	return (
		<PageContext.Provider value={[page, setPage]}>
			<ThemeProvider theme={defaultTheme}>
				<Box sx={{ display: "flex" }}>
					<CssBaseline />
					<AppBar position="absolute" open={open}>
						<Toolbar
							sx={{
								pr: "24px", // keep right padding when drawer closed
							}}
						>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="open drawer"
								onClick={toggleDrawer}
								sx={{
									marginRight: "36px",
									...(open && { display: "none" }),
								}}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								component="h1"
								variant="h6"
								color="inherit"
								noWrap
								sx={{ flexGrow: 1 }}
							>
								Dashboard
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer variant="permanent" open={open}>
						<Toolbar
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								px: [1],
							}}
						>
							<IconButton onClick={toggleDrawer}>
								<ChevronLeftIcon />
							</IconButton>
						</Toolbar>
						<Divider />
						<List component="nav">
							<React.Fragment>
								<ListItemButton
									onClick={(e) => {
										e.preventDefault();
										setPage(1);
									}}
								>
									<ListItemIcon>
										<DashboardIcon />
									</ListItemIcon>
									<ListItemText primary="Dashboard" />
								</ListItemButton>
								<ListItemButton
									onClick={(e) => {
										e.preventDefault();
										setPage(2);
									}}
								>
									<ListItemIcon>
										<PeopleIcon />
									</ListItemIcon>
									<ListItemText primary="Users" />
								</ListItemButton>
								<ListItemButton
									onClick={(e) => {
										e.preventDefault();
										setPage(3);
									}}
								>
									<ListItemIcon>
										<BarChartIcon />
									</ListItemIcon>
									<ListItemText primary="Stats" />
								</ListItemButton>
							</React.Fragment>
						</List>
					</Drawer>
					<Box
						component="main"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.mode === "light"
									? theme.palette.grey[100]
									: theme.palette.grey[900],
							flexGrow: 1,
							height: "100vh",
							overflow: "auto",
						}}
					>
						<Toolbar />
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
							<Grid container spacing={3}>
								{page === 1 ? (
									<MainPage />
								) : page === 2 ? (
									<UsersPage rows={rows} />
								) : page === 3 ? (
									<StatsPage />
								) : (
									<></>
								)}
							</Grid>
							<Copyright sx={{ pt: 4 }} />
						</Container>
					</Box>
				</Box>
			</ThemeProvider>
		</PageContext.Provider>
	);
}
