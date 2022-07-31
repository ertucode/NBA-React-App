import React, { useEffect, useState, useRef } from "react";
import getUniqueId from "../../utils/getUniqueId";
import TryAgain from "./TryAgain";

export default function StatsTableStatsSection({ desiredPlayer, minimized }) {
	const [gettingStats, setGettingStats] = useState(true);
	const [gettingStatsFailed, setGettingStatsFailed] = useState(false);
	const [statRows, setStatRows] = useState([]);
	const tableRef = useRef();

	function handleGettingStatsFailed() {
		return (
			<tr>
				<th>
					Getting stats failed...{" "}
					<TryAgain
						handleClick={() => {
							console.log("trying again");
							setGettingStatsFailed(false);
							setGettingStats(true);
							desiredPlayer.getStats(
								setGettingStats,
								setGettingStatsFailed
							);
						}}
					/>
				</th>
			</tr>
		);
	}

	useEffect(() => {
		if (!desiredPlayer.gotStats)
			desiredPlayer.getStats(setGettingStats, setGettingStatsFailed);
		else setGettingStats(false);
	}, [desiredPlayer]);

	function loadBody() {
		if (!statRows.length > 0) {
			// const newRows = [];
			// const desiredStats = getDesiredStats(
			// 	statCategoriesToShow,
			// 	desiredPlayer.seasonStats
			// );

			// for (const [season, seasonStat] of Object.entries(desiredStats)) {
			// 	newRows.push([season, ...Object.values(seasonStat)]);
			// }
			tableRef.current.style.setProperty(
				"--row-count",
				desiredPlayer.seasonStats.length
			);
			setStatRows(desiredPlayer.seasonStats.rows);
		}

		return statRows.map((row) => {
			return (
				<tr key={getUniqueId()}>
					{row.map((val) => {
						return <td key={getUniqueId()}>{val}</td>;
					})}
				</tr>
			);
		});
	}

	return (
		<table
			className={`stats-table ${minimized ? "minimized-table" : ""}`}
			ref={tableRef}
		>
			{desiredPlayer.gotStats && (
				<>
					<thead>
						<tr>
							{desiredPlayer.seasonStats.columnNames.map(
								(stat) => {
									return <th key={getUniqueId()}>{stat}</th>;
								}
							)}
						</tr>
					</thead>
					<tbody>
						{gettingStats
							? handleLoading()
							: gettingStatsFailed
							? handleGettingStatsFailed()
							: loadBody()}
					</tbody>
				</>
			)}
		</table>
	);
}

function handleLoading() {
	return (
		<tr>
			<th>Loading</th>
		</tr>
	);
}
