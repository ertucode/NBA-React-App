import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";

export default function PlayerNameSection({ index }) {
	const { players, setPlayers } = useContext(PosterContext);
	const thisPlayer = players[index];

	return (
		<div
			className="poster-page__player-name-section"
			onClick={() => {
				setPlayers((prevPlayers) => {
					const newPlayers = [...prevPlayers];
					newPlayers[index] = null;
					return newPlayers;
				});
			}}
			style={{ margin: "auto" }}
		>
			{thisPlayer.fullName}
		</div>
	);
}
