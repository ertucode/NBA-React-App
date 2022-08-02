import React, { useState } from "react";
import PosterOptions from "../components/poster/PosterOptions";
import PosterArea from "../components/poster/PosterArea";
import { PRIORITY_ORDER } from "../utils/statMap";

import "../components/poster/css/poster.css";

const initialDesiredStats = ["PTS", "AST", "TRB"];
const initialOptions = {
	desiredStats: Object.fromEntries(
		PRIORITY_ORDER.map((stat) => [
			[stat],
			initialDesiredStats.includes(stat),
		])
	),
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

	const posterContextValue = {
		players,
		setPlayers,
		options,
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
