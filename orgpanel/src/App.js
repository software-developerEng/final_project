import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
// import HomePage from './pages/HomePage'
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Signin />} />
				<Route path={"/register"} element={<Register />} />
				<Route path={"/home"} element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
