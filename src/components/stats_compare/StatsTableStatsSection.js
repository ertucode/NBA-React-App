import React, { useEffect, useState, useRef } from "react";
import getUniqueId from "../../utils/getUniqueId";
import TryAgain from "./TryAgain";
import { DESCRIPTION_MAP } from "../../utils/statMap";

import {
	useNotification,
	NOTIFICATION_TYPES,
} from "../_general/Notification/NotificationProvider";

export default function StatsTableStatsSection({ desiredPlayer, minimized }) {
	const [gettingStats, setGettingStats] = useState(true);
	const [gettingStatsFailed, setGettingStatsFailed] = useState(false);
	const [updatingTable, setUpdatingTable] = useState(false);
	const [clickedRows, setClickedRows] = useState([]);
	const tableRef = useRef();

	const dispatchNotification = useNotification();

	useEffect(() => {
		if (gettingStatsFailed)
			dispatchNotification({
				type: NOTIFICATION_TYPES.ERROR,
				message: "Getting stats failed (Too many requests)",
				location: "top-left",
				time: 2000,
			});
		// eslint-disable-next-line
	}, [gettingStatsFailed]);

	function handleGettingStatsFailed() {
		return (
			<tr>
				<th>
					Getting stats failed...{" "}
					<TryAgain
						handleClick={() => {
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

	function handleRowClick(rowKey) {
		if (clickedRows.includes(rowKey)) {
			setClickedRows((prev) => [...prev].filter((row) => row !== rowKey));
			return;
		}
		const prevRows = [...clickedRows];
		if (prevRows.length > 1) {
			prevRows.pop();
		}
		prevRows.push(rowKey);
		setClickedRows(prevRows);
	}

	function handleRowHighlight(rowKey) {
		if (clickedRows.length < 2) {
			return clickedRows.includes(rowKey)
				? { backgroundColor: "hsl(2, 50%, 80%)" }
				: {};
		} else {
			const compareArray = [...clickedRows, rowKey];
			compareArray.sort();
			if (compareArray[1] === rowKey) {
				return { backgroundColor: "hsl(2, 50%, 80%)" };
			}
			return {};
		}
	}

	useEffect(() => {
		if (!desiredPlayer.gotStats)
			desiredPlayer.getStats(setGettingStats, setGettingStatsFailed);
		else setGettingStats(false);
	}, [desiredPlayer]);

	function loadBody() {
		if (!desiredPlayer.gotStats) return;
		tableRef.current.style.setProperty(
			"--row-count",
			desiredPlayer.seasonStats.length
		);

		return desiredPlayer.seasonStats.rows.map((row) => {
			return (
				<tr
					key={getUniqueId()}
					className="stats-table__stat--row"
					style={handleRowHighlight(row[0])}
					onClick={() => handleRowClick(row[0])}
					tabIndex="0"
				>
					{row.map((val) => {
						return <td key={getUniqueId()}>{val}</td>;
					})}
				</tr>
			);
		});
	}

	function handleColumnSort(stat) {
		setUpdatingTable(true);
		desiredPlayer.seasonStats.sortColumnItems(stat, setUpdatingTable);
	}

	return (
		<table
			className={`stats-table ${minimized ? "minimized-table" : ""} ${
				gettingStats || updatingTable
					? "stats-table__getting-stats"
					: ""
			}`}
			ref={tableRef}
		>
			{desiredPlayer.gotStats && (
				<>
					<thead>
						<tr>
							{desiredPlayer.seasonStats.columnNames.map(
								(stat) => {
									return (
										<th
											className="stats-table__data--header"
											title={DESCRIPTION_MAP[stat]}
											onClick={() => {
												handleColumnSort(stat);
											}}
											key={getUniqueId()}
											tabIndex="0"
										>
											{stat}
										</th>
									);
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
