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
		style: { color: "#000000", fontWeight: "700", fontSize: "3rem" },
	},
	statName: {
		label: "Stat Name",
		style: { color: "#000000", fontWeight: "700", fontSize: "2rem" },
	},
	statNumber: {
		label: "Stat Number",
		style: { color: "#000000", fontWeight: "700", fontSize: "1.5rem" },
	},
	bg: { label: "Background", style: { color: "#ffffff" } },
};

const initialTransformStates = [
	{
		translateX: { value: 0, min: -100, max: 100, step: 1 },
		translateY: { value: 0, min: -100, max: 100, step: 1 },
		scale: { value: 1, min: 0, max: 10, step: 0.01 },
	},
	{
		translateX: { value: 0, min: -100, max: 100, step: 1 },
		translateY: { value: 0, min: -100, max: 100, step: 1 },
		scale: { value: 1, min: 0, max: 5, step: 0.001 },
	},
];

const initialImageSources = [
	{ id: 0, src: null },
	{ id: 1, src: null },
];

const initialShadowStyles = [
	{
		th: 0,
		color: "#000000",
	},
	{
		th: 0,
		color: "#000000",
	},
];

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
	const [imageTransforms, setImageTransforms] = useState(
		initialTransformStates
	);
	const [imageSources, setImageSources] = useState(initialImageSources);
	const [shadowStyles, setShadowStyles] = useState(initialShadowStyles);

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
		imageTransforms,
		setImageTransforms,
		imageSources,
		setImageSources,
		shadowStyles,
		setShadowStyles,
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
