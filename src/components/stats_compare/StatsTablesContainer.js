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
				<section key={desiredPlayer.id} id={desiredPlayer.fullName}>
					<h1
						className="stats-table-header"
						onClick={() => handlePlayerRemove(desiredPlayer)}
					>
						{desiredPlayer.fullName}
					</h1>
					<StatsTable desiredPlayer={desiredPlayer} />
				</section>
			);
		});
	}

	return <div className="stats-tables-container">{loadTables()}</div>;
}
