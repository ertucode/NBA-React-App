import React, { useState } from "react";
import PosterOptions from "../components/poster/PosterOptions";
import PosterArea from "../components/poster/PosterArea";
import { PRIORITY_ORDER } from "../utils/statMap";

import "../components/poster/css/poster.css";

const initialDesiredStats = ["PTS", "AST", "REB"];
const initialOptions = {
	desiredStats: Object.fromEntries(
		PRIORITY_ORDER.map((stat) => [
			[stat],
			initialDesiredStats.includes(stat),
		])
	),
};
const initialTextState = {
	playerName: {
		label: "Player Name",
		style: { color: "#ff0000", fontWeight: "700" },
	},
	statName: {
		label: "Stat Name",
		style: { color: "#00ffff", fontWeight: "700" },
	},
	statNumber: {
		label: "Stat Number",
		style: { color: "#000000", fontWeight: "700" },
	},
	bg: { label: "Background", style: { color: "#eeeeee" } },
};

export const PosterContext = React.createContext();

// https://web.dev/read-files/
const posterPageStyle = {
	display: "flex",
	flexDirection: "column",
	minHeight: "100vh",
};

export default function PlayerPosterPage() {
	const [players, setPlayers] = useState([null, null]);
	const [options, setOptions] = useState(initialOptions);
	const [gettingStats, setGettingStats] = useState(false);
	const [gettingStatsFailed, setGettingStatsFailed] = useState(false);
	const [textState, setTextState] = useState(initialTextState);

	const posterContextValue = {
		players,
		setPlayers,
		options,
		gettingStats,
		setGettingStats,
		gettingStatsFailed,
		setGettingStatsFailed,
		textState,
		setTextState,
	};

	return (
		<PosterContext.Provider value={posterContextValue}>
			<div style={posterPageStyle}>
				<PosterOptions setOptions={setOptions} />
				<PosterArea />
			</div>
		</PosterContext.Provider>
	);
}
