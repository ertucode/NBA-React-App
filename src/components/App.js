import "../css/app.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import StatsTablesContainer from "./stats_compare/StatsTablesContainer";
import getPlayerStats from "../utils/getPlayerStats";
import getPlayerName from "../utils/getPlayerName";

function App() {
	const [desiredPlayers, setDesiredPlayers] = useState([]);
	const [stats, setStats] = useState([]);

	useEffect(() => {
		if (desiredPlayers.length === 0) return;

		desiredPlayers.forEach((desiredPlayer) => {
			if (!desiredPlayer.gotStats) {
				const player = desiredPlayer.player;
				getPlayerStats(getPlayerName(player), player.id, setStats);
				desiredPlayer.gotStats = true;
			}
		});
	}, [desiredPlayers]);

	return (
		<div className="app-container">
			{desiredPlayers.length !== 0 ? "" : ""}
			<Navbar setDesiredPlayers={setDesiredPlayers} />
			<StatsTablesContainer stats={stats} />
		</div>
	);
}

export default App;
