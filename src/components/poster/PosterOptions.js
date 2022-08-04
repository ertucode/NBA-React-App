import React, { useContext, useEffect } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import ColorPicker from "./ColorPicker";
import FontWeightPicker from "./FontWeightPicker";
import FontSizePicker from "./FontSizePicker";
import ImageResizer from "./ImageResizer";

import { ReactComponent as StatSvg } from "./svg/stat1.svg";
import { ReactComponent as FontSvg } from "./svg/font1.svg";
import { ReactComponent as ColorSvg } from "./svg/color1.svg";
import { ReactComponent as ImageSvg } from "./svg/image1.svg";

const posterOptionsStyle = {
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	zIndex: 10,
	position: "fixed",
	top: "50%",
	transform: "translateY(-50%)",
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
		<div style={posterOptionsStyle} id="options-area" tabIndex="0">
			<div
				className="options-area__child"
				id="options-area__stat-container"
			>
				<StatSvg />
				<div className="option-popup">
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
			</div>
			<div
				className="options-area__child"
				id="options-area__color-selections"
			>
				<ColorSvg />
				<div className="option-popup">
					<ColorPicker />
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__font-weight-selections"
			>
				<FontSvg />
				<div className="option-popup">
					<FontWeightPicker />
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__font-size-selections"
			>
				<FontSvg />
				<div className="option-popup">
					<FontSizePicker />
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__image-handler"
			>
				<ImageSvg />
				<div className="option-popup">
					<ImageResizer />
				</div>
			</div>
		</div>
	);
}
