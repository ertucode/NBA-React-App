import React, { useContext, useEffect } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import { PRIORITY_ORDER } from "../../utils/statMap";

const posterOptionsStyle = {
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	width: "100%",
};

export default function PosterOptions({ setOptions }) {
	const { players, options } = useContext(PosterContext);

	useEffect(() => {
		players.forEach((player) => {
			if (player != null && !player.gotStats) {
				player.getStats();
			}
		});
	}, [players]);

	function handleStatClick(e, stat) {
		const newOptions = { ...options };
		newOptions.desiredStats[stat] = !newOptions.desiredStats[stat];
		setOptions(newOptions);
	}

	return (
		<div style={posterOptionsStyle} id="options-area">
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
	);
}
