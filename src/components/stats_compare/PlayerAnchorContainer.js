import React from "react";
import PlayerAnchor from "./PlayerAnchor";

export default function PlayerAnchorContainer({
	desiredPlayers,
	pastDesiredPlayers,
	handlePlayerUndo,
}) {
	return (
		<nav className="player-anchor-container">
			{desiredPlayers.map((desiredPlayer) => {
				return (
					<PlayerAnchor
						key={desiredPlayer.id}
						className="player-anchor"
						fullName={desiredPlayer.fullName}
						active={true}
					></PlayerAnchor>
				);
			})}
			{pastDesiredPlayers.map((desiredPlayer) => {
				return (
					<PlayerAnchor
						key={desiredPlayer.id}
						className="player-anchor"
						fullName={desiredPlayer.fullName}
						active={false}
						handlePlayerUndo={() =>
							handlePlayerUndo(desiredPlayer.id)
						}
					></PlayerAnchor>
				);
			})}
		</nav>
	);
}
