import React, { useContext } from "react";
import PlayerStats from "./PlayerStats.js";
import { PlayersContext } from "../App";

export default function CompareContainer() {
	const { pickedPlayers } = useContext(PlayersContext);

	return (
		<div className="compare-container box-container">
			<PlayerStats
				player={pickedPlayers.length > 0 ? pickedPlayers[0] : null}
			/>
			<div>X</div>
			<PlayerStats
				player={pickedPlayers.length > 1 ? pickedPlayers[1] : null}
			/>
		</div>
	);
}
