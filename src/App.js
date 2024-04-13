import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home.page";
import CalculatorPage from "./pages/Calculator.page";
import Header from "./components/Header";
import LoginPage from "./pages/Login.page";
import { useAuth } from "./AuthContext";

function App() {
	const { isLoggedIn } = useAuth();
	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route index element={<HomePage />}></Route>
					{isLoggedIn && (
						<Route path="/calculator" element={<CalculatorPage />}></Route>
					)}
					<Route path="/login" element={<LoginPage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
