import React, { useContext, useEffect, useState } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import getTrues from "../../utils/getTrues";
import PosterWarningItem from "./PosterWarningItem";

const statDisplayerStyles = {
	display: "grid",
	gridTemplateColumns: "1fr 1fr 1fr",
	alignItems: "center",
};

const spanStyles = {
	textAlign: "center",
	fontWeight: 700,
	color: "hsl(360, 100%, 30%)",
};

const statNameStyles = {
	fontSize: "1.2em",
	color: "var(--clr-primary)",
};

const middlePanelStyles = {
	display: "grid",
	gridTemplateColumns: "1fr",
	position: "relative",
};

export default function StatDisplayer() {
	const [averageStats, setAverageStats] = useState([{}, {}]);

	const { options, players, gettingStats, gettingStatsFailed, textState } =
		useContext(PosterContext);

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

	const addedSpanClass = gettingStats ? "poster-loading" : "";

	return (
		<>
			<div style={middlePanelStyles}>
				{getTrues(options.desiredStats).map((stat) => (
					<div key={stat} style={statDisplayerStyles}>
						<span
							style={{
								...spanStyles,
								...textState.statNumber.style,
							}}
							key={stat + "0"}
							className={addedSpanClass}
						>
							{getOneDecimal(averageStats[0][stat])}
						</span>
						<span
							style={{
								...spanStyles,
								...statNameStyles,
								...textState.statName.style,
							}}
							key={stat + "1"}
						>
							{stat}
						</span>
						<span
							style={{
								...spanStyles,
								...textState.statNumber.style,
							}}
							key={stat + "2"}
							className={addedSpanClass}
						>
							{getOneDecimal(averageStats[1][stat])}
						</span>
					</div>
				))}
				{gettingStatsFailed && <PosterWarningItem />}
			</div>
		</>
	);
}

function getOneDecimal(num) {
	if (typeof num !== "number") return "...";
	return Math.round(num * 10) / 10;
}
