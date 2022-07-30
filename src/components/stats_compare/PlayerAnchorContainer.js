import React from "react";
import PlayerAnchor from "./PlayerAnchor";
import getPlayerName from "../../utils/getPlayerName";
import getUniqueId from "../../utils/getUniqueId";

export default function PlayerAnchorContainer({
	desiredPlayers,
	pastDesiredPlayers,
}) {
	return (
		<nav className="player-anchor-container">
			{desiredPlayers.map((desiredPlayer) => {
				return (
					<PlayerAnchor
						key={getUniqueId()}
						className="player-anchor"
						playerName={getPlayerName(desiredPlayer.player)}
						active={true}
					></PlayerAnchor>
				);
			})}
			{pastDesiredPlayers.map((desiredPlayer) => {
				return (
					<PlayerAnchor
						key={getUniqueId()}
						className="player-anchor"
						playerName={getPlayerName(desiredPlayer.player)}
						active={false}
					></PlayerAnchor>
				);
			})}
		</nav>
	);
}
