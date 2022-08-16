import React from "react";
import StatsTable from "./StatsTable";

export default function StatsTablesContainer({
	desiredPlayers,
	handlePlayerRemove,
}) {
	function loadTables() {
		if (desiredPlayers.length === 0) return null;

		return desiredPlayers.map((desiredPlayer) => {
			return (
				<StatsTable
					desiredPlayer={desiredPlayer}
					handlePlayerRemove={handlePlayerRemove}
					key={desiredPlayer.id}
				/>
			);
		});
	}

	return <div className="stats-tables-container">{loadTables()}</div>;
}
