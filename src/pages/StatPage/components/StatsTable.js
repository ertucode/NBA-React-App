import React, { useState } from "react";
import StatsTableStatsSection from "./StatsTableStatsSection";
import "../css/table.css";

import { ReactComponent as CrossSvg } from "../svg/cross.svg";

export default function StatsTable({ desiredPlayer, handlePlayerRemove }) {
	const [minimized, setMinimized] = useState(false);

	return (
		<section id={desiredPlayer.fullName} className="stats-table-container">
			<div className="stats-table-top">
				<h1
					className="stats-table-header"
					onClick={() => handlePlayerRemove(desiredPlayer)}
					tabIndex="0"
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
					style={{ display: "grid", placeItems: "center" }}
				>
					<CrossSvg style={{ width: "50%" }} />
				</button>
			</div>

			<StatsTableStatsSection
				desiredPlayer={desiredPlayer}
				minimized={minimized}
			/>
		</section>
	);
}
