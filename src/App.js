import "./css/app.css";

import { Routes, Route } from "react-router-dom";
import StatPage from "./pages/StatPage/StatPage";
import PlayerPosterPage from "./pages/PlayerPosterPage/PlayerPosterPage";
import Navbar from "./components/Navbar";
import NotificationProvider from "./components/Notification/NotificationProvider";

function App() {
	return (
		<NotificationProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<StatPage />} />
				<Route path="/poster" element={<PlayerPosterPage />} />
			</Routes>
		</NotificationProvider>
	);
}

export default App;
