import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PlayerPage from "./pages/PlayerPage";
import PlayerPosterPage from "./pages/PlayerPosterPage";
import Navbar from "./components/Navbar";

/**IDEAS
 * Add graphs
 */

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/player" element={<PlayerPage />} />
				<Route path="/poster" element={<PlayerPosterPage />} />
			</Routes>
		</>
	);
}

export default App;
