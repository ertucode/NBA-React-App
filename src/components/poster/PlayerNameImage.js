import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import TextInputField from "./TextInputField";
import PlayerImage from "./PlayerImage";
import PlayerNameSection from "./PlayerNameSection";

const playerNameImageStyle = {
	padding: "1rem",
	display: "grid",
	gridTemplateRows: "1fr 10fr",
	alignItems: "center",
	flex: "1 1",
};

export default function PlayerNameImage({ style, index }) {
	const { players } = useContext(PosterContext);
	const thisPlayer = players[index];

	return (
		<div style={{ ...playerNameImageStyle, ...style }}>
			{thisPlayer == null ? (
				<TextInputField index={index} />
			) : (
				<PlayerNameSection index={index} />
			)}
			<PlayerImage />
		</div>
	);
}
