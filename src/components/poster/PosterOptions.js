import React, { useContext, useEffect } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import ColorPicker from "./ColorPicker";
import FontWeightPicker from "./FontWeightPicker";
import FontSizePicker from "./FontSizePicker";
import ImageResizer from "./ImageResizer";

const posterOptionsStyle = {
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	width: "100%",
	zIndex: 1,
};

export default function PosterOptions({ setOptions }) {
	const { players, options, setGettingStats, setGettingStatsFailed } =
		useContext(PosterContext);

	useEffect(() => {
		players.forEach((player) => {
			if (player != null && !player.gotStats) {
				setGettingStats(true);
				player.getStats(setGettingStats, setGettingStatsFailed);
			}
		});
	}, [players, setGettingStats, setGettingStatsFailed]);

	function handleStatClick(e, stat) {
		const newOptions = { ...options };
		newOptions.desiredStats[stat] = !newOptions.desiredStats[stat];
		setOptions(newOptions);
	}

	return (
		<div style={posterOptionsStyle} id="options-area">
			<div id="options-area__stat-container">
				<div>Select stats to display</div>
				<div id="options-area__stat-selections">
					{Object.entries(options.desiredStats).map(
						([stat, bool], index) => (
							<button
								key={index}
								onClick={(e) => handleStatClick(e, stat)}
								className={bool ? "" : "deactivated"}
							>
								{stat}
							</button>
						)
					)}
				</div>
			</div>
			<div id="options-area__color-selections">
				<ColorPicker />
			</div>
			<div id="options-area__font-weight-selections">
				<FontWeightPicker />
			</div>
			<div id="options-area__font-size-selections">
				<FontSizePicker />
			</div>
			<div id="options-area__image-handler">
				<ImageResizer />
			</div>
		</div>
	);
}
