import React from "react";
import StatsTable from "./StatsTable";
import getUniqueId from "../../utils/getUniqueId";

export default function StatsTablesContainer({ stats, handlePlayerRemove }) {
	function loadTables() {
		if (stats.length === 0) return null;

		return stats.map((stat) => {
			return (
				<section key={getUniqueId()} id={stat.name}>
					<h1
						className="stats-table-header"
						onClick={() => handlePlayerRemove(stat.name)}
					>
						{stat.name}
					</h1>
					<StatsTable playerStats={stat} />
				</section>
			);
		});
	}

	return <div className="stats-tables-container">{loadTables()}</div>;
}
