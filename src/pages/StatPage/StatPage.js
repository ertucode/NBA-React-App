import "./css/player-page-empty.css";

import React, { useState } from "react";
import StatsTablesContainer from "./components/StatsTablesContainer";
import PlayerAnchorContainer from "./components/PlayerAnchorContainer";
import removePlayerFromArrayWithId from "../../utils/removePlayerFromArrayWithId";
import removeElementFromArrayWithIndex from "../../utils/removeElementFromArrayWithIndex";
import TextInputField from "./components/TextInputField";

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

	const zeroPlayer =
		pastDesiredPlayers.length === 0 && desiredPlayers.length === 0;

	return (
		<>
			<div className="app-container">
				<main>
					{zeroPlayer && (
						<h1 className="players-have-not-been-searched">
							Start typing to get started
						</h1>
					)}
					<TextInputField
						zeroPlayer={zeroPlayer}
						setDesiredPlayers={setDesiredPlayers}
					/>
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
