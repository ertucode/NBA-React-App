import React, { useState } from "react";
import StatsTableStatsSection from "./StatsTableStatsSection";

export default function StatsTable({ desiredPlayer, handlePlayerRemove }) {
	const [minimized, setMinimized] = useState(false);

	return (
		<section id={desiredPlayer.fullName} className="stats-table-container">
			<div className="stats-table-top">
				<h1
					className="stats-table-header"
					onClick={() => handlePlayerRemove(desiredPlayer)}
				>
					{desiredPlayer.fullName}
				</h1>
				<button
					className={`button-minimize ${
						minimized ? "minimized" : "extended"
					}`}
					onClick={() => setMinimized((prev) => !prev)}
					data-content="━"
				>
					━
				</button>
				<button
					className="button-delete"
					onClick={() => handlePlayerRemove(desiredPlayer)}
				>
					❌
				</button>
			</div>

			<StatsTableStatsSection
				desiredPlayer={desiredPlayer}
				minimized={minimized}
			/>
		</section>
	);
}
