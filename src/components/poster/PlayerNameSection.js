import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";

const playerNameStyle = {
	zIndex: 5,
};

export default function PlayerNameSection({ index }) {
	const { players, setPlayers, textState } = useContext(PosterContext);
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
			style={{
				...playerNameStyle,
				...textState.playerName.style,
			}}
		>
			{thisPlayer.fullName}
		</div>
	);
}
