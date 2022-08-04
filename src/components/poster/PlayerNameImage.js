import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import TextInputField from "./TextInputField";
import PlayerImage from "./PlayerImage";
import PlayerNameSection from "./PlayerNameSection";

export default function PlayerNameImage({ style, index }) {
	const { players, imageSources } = useContext(PosterContext);
	const thisPlayer = players[index];

	return (
		<div
			style={style}
			className={`player-name-image ${
				imageSources[index].src != null ? "has-image" : ""
			}`}
		>
			{thisPlayer == null ? (
				<TextInputField index={index} />
			) : (
				<PlayerNameSection index={index} />
			)}
			<PlayerImage index={index} />
		</div>
	);
}
