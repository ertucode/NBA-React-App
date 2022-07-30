import "../css/app.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import StatsTablesContainer from "./stats_compare/StatsTablesContainer";
import getPlayerStats from "../utils/getPlayerStats";
import getPlayerName from "../utils/getPlayerName";
import PlayerAnchorContainer from "./stats_compare/PlayerAnchorContainer";

function App() {
	const [desiredPlayers, setDesiredPlayers] = useState([]);
	const [stats, setStats] = useState([]);
	const [pastDesiredPlayers, setPastDesiredPlayers] = useState([]);

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

	function handlePlayerRemove(playerName) {
		const playerIndex = desiredPlayers.findIndex(
			(playerObject) => getPlayerName(playerObject.player) === playerName
		);

		if (playerIndex === -1) {
			console.log(
				"Somehow couldn't find player to remove",
				playerName,
				desiredPlayers
			);
			return;
		}

		addToPastDesiredPlayers({ ...desiredPlayers[playerIndex] });

		const newDesiredPlayers = [...desiredPlayers];
		newDesiredPlayers.splice(playerIndex, 1);
		setDesiredPlayers(newDesiredPlayers);

		const newStats = [...stats];
		newStats.splice(playerIndex, 1);
		setStats(newStats);
	}

	function addToPastDesiredPlayers(deletedPlayer) {
		const newPastDesiredPlayers = [...pastDesiredPlayers];

		if (newPastDesiredPlayers.length > 3)
			newPastDesiredPlayers.splice(0, 1);

		newPastDesiredPlayers.push(deletedPlayer);

		setPastDesiredPlayers(newPastDesiredPlayers);
	}

	return (
		<div className="app-container">
			<Navbar setDesiredPlayers={setDesiredPlayers} />
			<PlayerAnchorContainer
				desiredPlayers={desiredPlayers}
				pastDesiredPlayers={pastDesiredPlayers}
			/>
			<StatsTablesContainer
				stats={stats}
				handlePlayerRemove={handlePlayerRemove}
			/>
		</div>
	);
}

export default App;
