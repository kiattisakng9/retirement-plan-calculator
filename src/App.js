import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home.page";
import CalculatorPage from "./pages/Calculator.page";
import Header from "./components/Header";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route index element={<HomePage />}></Route>
					<Route path="/calculator" element={<CalculatorPage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
