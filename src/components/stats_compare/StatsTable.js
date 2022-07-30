import React, { useState } from "react";
import StatsTableStatsSection from "./StatsTableStatsSection";

export default function StatsTable({ desiredPlayer, handlePlayerRemove }) {
	const [minimized, setMinimized] = useState(false);

	function handleMinimizeButtonClick(e) {
		if (minimized) {
			setMinimized(false);
		} else {
			setMinimized(true);
		}
	}

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
					onClick={handleMinimizeButtonClick}
					data-content="—"
				>
					—
				</button>
				<button
					className="button-delete"
					onClick={() => handlePlayerRemove(desiredPlayer)}
				>
					X
				</button>
			</div>
			{!minimized && (
				<StatsTableStatsSection desiredPlayer={desiredPlayer} />
			)}
		</section>
	);
}
