import React from "react";

export default function PlayerLink({ player, handlePlayerPick }) {
	return (
		<div className="player-link" onClick={() => handlePlayerPick(player)}>
			{player.first_name} {player.last_name}
		</div>
	);
}
