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

const initialFontStates = {
	playerName: {
		label: "Player Name",
		style: {
			color: "#9999ff",
			fontWeight: "700",
			fontSize: "3rem",
		},
	},
	statName: {
		label: "Stat Name",
		style: {
			color: "#444444",
			fontWeight: "400",
			fontSize: "1rem",
		},
	},
	statNumber: {
		label: "Stat Number",
		style: {
			color: "#44ff44",
			fontWeight: "700",
			fontSize: "2rem",
		},
	},
};

const initialBackgroundState = {
	color: "#ffffff",
	src: null,
	size: "cover",
};

// transform
// transparency
// scale

const initialTransformStates = [
	{
		translateX: { label: "X", value: 0, min: -100, max: 100, step: 1 },
		translateY: { label: "Y", value: 0, min: -100, max: 100, step: 1 },
		scale: { label: "Scale", value: 1, min: 0, max: 10, step: 0.01 },
	},
	{
		translateX: { label: "X", value: 0, min: -100, max: 100, step: 1 },
		translateY: { label: "Y", value: 0, min: -100, max: 100, step: 1 },
		scale: { label: "Scale", value: 1, min: 0, max: 5, step: 0.001 },
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
	const [imageTransforms, setImageTransforms] = useState(
		initialTransformStates
	);
	const [fontState, setFontState] = useState(initialFontStates);
	const [backgroundState, setBackgroundState] = useState(
		initialBackgroundState
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
		imageTransforms,
		setImageTransforms,
		imageSources,
		setImageSources,
		shadowStyles,
		setShadowStyles,
		fontState,
		setFontState,
		backgroundState,
		setBackgroundState,
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
