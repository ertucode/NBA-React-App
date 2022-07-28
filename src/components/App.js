import CompareContainer from "./compare/CompareContainer.js";
import "../css/app.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.js";

export const PlayersContext = React.createContext();

function App() {
	const [pickedPlayers, setPickedPlayers] = useState([]);

	const contextValues = {
		pickedPlayers,
		setPickedPlayers,
	};

	useEffect(() => {
		console.log("Picked players", pickedPlayers);
	}, [pickedPlayers]);

	return (
		<div className="app-container">
			<Navbar />
			<PlayersContext.Provider value={contextValues}>
				<CompareContainer />
			</PlayersContext.Provider>
		</div>
	);
}

export default App;
