import "../css/app.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import StatsTablesContainer from "./stats_compare/StatsTablesContainer";
import getPlayerStats from "../utils/getPlayerStats";
import getPlayerName from "../utils/getPlayerName";
import PlayerAnchorContainer from "./stats_compare/PlayerAnchorContainer";
import getPlayerIndexFromDesiredPlayers from "../utils/getPlayerIndexFromDesiredPlayer";
import removePlayerFromArray from "../utils/removePlayerFromArray";

function App() {
	const [desiredPlayers, setDesiredPlayers] = useState([]);
	const [stats, setStats] = useState([]);
	const [pastDesiredPlayersWithStats, setPastDesiredPlayersWithStats] =
		useState([]);

	useEffect(() => {
		if (desiredPlayers.length === 0) return;

		desiredPlayers.forEach((desiredPlayer) => {
			if (!desiredPlayer.gotStats) {
				const player = desiredPlayer.player;
				setStats((prevStats) => [
					...prevStats,
					getPlayerStats(getPlayerName(player), player.id),
				]);
				desiredPlayer.gotStats = true;
			}
		});
	}, [desiredPlayers]);

	function handlePlayerRemove(playerName) {
		const playerIndex = getPlayerIndexFromDesiredPlayers(
			desiredPlayers,
			playerName
		);

		if (playerIndex === -1) {
			console.log(
				"Somehow couldn't find player to remove",
				playerName,
				desiredPlayers
			);
			return;
		}

		addToPastDesiredPlayersWithStats({
			...desiredPlayers[playerIndex],
			...stats[playerIndex].seasonStats,
		});

		setDesiredPlayers((prev) => removePlayerFromArray(prev, playerIndex));

		setStats((prev) => removePlayerFromArray(prev, playerIndex));
	}

	function addToPastDesiredPlayersWithStats(deletedPlayerWithStats) {
		const newPastDesiredPlayersWithStats = [...pastDesiredPlayersWithStats];

		if (newPastDesiredPlayersWithStats.length > 3)
			newPastDesiredPlayersWithStats.splice(0, 1);

		newPastDesiredPlayersWithStats.push(deletedPlayerWithStats);

		setPastDesiredPlayersWithStats(newPastDesiredPlayersWithStats);
	}

	function handlePlayerUndo(playerName) {
		const undoIndex =
			playerName == null
				? 0
				: getPlayerIndexFromDesiredPlayers(
						pastDesiredPlayersWithStats,
						playerName
				  );

		const newPastDesiredPlayersWithStats = [...pastDesiredPlayersWithStats];

		const undoPlayer = newPastDesiredPlayersWithStats.splice(
			undoIndex,
			1
		)[0];

		const player = undoPlayer.player;
		getPlayerStats(getPlayerName(player), player.id, setStats);

		setPastDesiredPlayersWithStats(newPastDesiredPlayersWithStats);

		setDesiredPlayers((prevValue) => [...prevValue, undoPlayer]);
	}

	return (
		<div className="app-container">
			<Navbar setDesiredPlayers={setDesiredPlayers} />
			<PlayerAnchorContainer
				desiredPlayers={desiredPlayers}
				pastDesiredPlayersWithStats={pastDesiredPlayersWithStats}
				handlePlayerUndo={handlePlayerUndo}
			/>
			<StatsTablesContainer
				stats={stats}
				handlePlayerRemove={handlePlayerRemove}
			/>
		</div>
	);
}

export default App;
