import { Routes, Route } from "react-router-dom";
import PlayerPage from "./pages/PlayerPage";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/player" element={<PlayerPage />} />
		</Routes>
	);
}

export default App;
