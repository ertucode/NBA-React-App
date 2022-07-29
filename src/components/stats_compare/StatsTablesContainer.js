import React from "react";
import StatsTable from "./StatsTable";

export default function StatsTablesContainer({ stats }) {
	function loadTables() {
		if (stats.length === 0) return null;

		return stats.map((stat) => {
			return (
				<div key={new Date() * Math.random() + new Date()}>
					<h1 className="stats-table-header">{stat.name}</h1>
					<StatsTable playerStats={stat} />
				</div>
			);
		});
	}

	return <div className="stats-tables-container">{loadTables()}</div>;
}
