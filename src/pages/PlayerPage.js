import "../css/app.css";
import React, { useState } from "react";
import StatsTablesContainer from "../components/stats_compare/StatsTablesContainer";
import PlayerAnchorContainer from "../components/stats_compare/PlayerAnchorContainer";
import removePlayerFromArrayWithId from "../utils/removePlayerFromArrayWithId";
import removeElementFromArrayWithIndex from "../utils/removeElementFromArrayWithIndex";
import TextInputField from "../components/search_box/TextInputField";
import Navbar from "../components/Navbar";

function PlayerPage() {
	const [desiredPlayers, setDesiredPlayers] = useState([]);
	const [pastDesiredPlayers, setPastDesiredPlayers] = useState([]);

	function handlePlayerRemove(player) {
		addToPastDesiredPlayers(player);

		setDesiredPlayers((prev) =>
			removePlayerFromArrayWithId(prev, player.id)
		);
	}

	function addToPastDesiredPlayers(deletedPlayer) {
		const newPastDesiredPlayers = [...pastDesiredPlayers];

		if (newPastDesiredPlayers.length > 3)
			newPastDesiredPlayers.splice(0, 1);

		newPastDesiredPlayers.push(deletedPlayer);

		setPastDesiredPlayers(newPastDesiredPlayers);
	}

	function handlePlayerUndo(id) {
		const undoIndex = pastDesiredPlayers.findIndex(
			(desiredPlayer) => desiredPlayer.id === id
		);

		const undoPlayer = pastDesiredPlayers[undoIndex];

		setPastDesiredPlayers((prevValue) =>
			removeElementFromArrayWithIndex(prevValue, undoIndex)
		);
		setDesiredPlayers((prevValue) => [...prevValue, undoPlayer]);
	}

	function handlePlayerForeverDelete(id) {
		setPastDesiredPlayers((prev) =>
			[...prev].filter((player) => player.id !== id)
		);
	}

	return (
		<>
			<Navbar />
			<div className="app-container">
				<TextInputField setDesiredPlayers={setDesiredPlayers} />
				<main>
					<PlayerAnchorContainer
						desiredPlayers={desiredPlayers}
						pastDesiredPlayers={pastDesiredPlayers}
						handlePlayerForeverDelete={handlePlayerForeverDelete}
						handlePlayerUndo={handlePlayerUndo}
					/>
					<StatsTablesContainer
						desiredPlayers={desiredPlayers}
						handlePlayerRemove={handlePlayerRemove}
					/>
				</main>
			</div>
		</>
	);
}

export default PlayerPage;
