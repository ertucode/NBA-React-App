import React, { useContext, useEffect, useState } from "react";
import { PosterContext } from "../PlayerPosterPage";
import {
	useNotification,
	NOTIFICATION_TYPES,
} from "../../../components/Notification/NotificationProvider";

const statNameStyles = {
	fontSize: "1.2em",
	color: "var(--clr-primary)",
};

export default function StatDisplayer() {
	const [averageStats, setAverageStats] = useState([{}, {}]);
	const dispatch = useNotification();

	const {
		options,
		players,
		gettingStats,
		gettingStatsFailed,
		setGettingStatsFailed,
		fontState,
	} = useContext(PosterContext);

	useEffect(() => {
		const stats = getTrues(options.desiredStats);
		const newAverageStats = players.map((player) => {
			if (player != null) {
				return player.getSeasonAverages(stats);
			} else {
				return Object.fromEntries(stats.map((stat) => [stat, 0]));
			}
		});

		setAverageStats(newAverageStats);
	}, [options, players, gettingStats]);

	useEffect(() => {
		if (gettingStatsFailed) {
			dispatch({
				message: "Getting stats failed (Too many requests)",
				time: 3000,
				location: "bottom-left",
				type: NOTIFICATION_TYPES.ERROR,
			});
		}
		setGettingStatsFailed(false);
	}, [gettingStatsFailed, dispatch, setGettingStatsFailed]);

	const addedSpanClass = gettingStats ? "poster-loading" : "";

	return (
		<>
			<div className="stat-displayer-panel">
				{getTrues(options.desiredStats).map((stat) => (
					<div key={stat} className="stat-individual">
						<span
							style={{
								...fontState.statNumber.style,
							}}
							key={stat + "0"}
							className={` stat-span ${addedSpanClass}`}
						>
							{getTwoDecimal(averageStats[0][stat])}
						</span>
						<span
							style={{
								...statNameStyles,
								...fontState.statName.style,
							}}
							className="stat-span"
							key={stat + "1"}
						>
							{stat}
						</span>
						<span
							style={{
								...fontState.statNumber.style,
							}}
							key={stat + "2"}
							className={` stat-span ${addedSpanClass}`}
						>
							{getTwoDecimal(averageStats[1][stat])}
						</span>
					</div>
				))}
			</div>
		</>
	);
}

function getTwoDecimal(num) {
	if (typeof num !== "number") return "...";
	return Math.round(num * 100) / 100;
}

function getTrues(obj) {
	const trues = [];

	Object.entries(obj).forEach(([stat, bool]) => {
		if (bool) trues.push(stat);
	});
	return trues;
}
