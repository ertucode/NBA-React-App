import React from "react";

export default function PlayerAnchor({ playerName, active, handlePlayerUndo }) {
	return (
		<a
			className={`player-anchor ${active ? "" : "deactivated"}`}
			href={active ? `#${playerName}` : "#"}
			title={
				active
					? "Click to scroll to the player"
					: "Click to bring back the player"
			}
			onClick={
				active
					? undefined
					: () => {
							console.log("Undoing " + playerName);
							handlePlayerUndo(playerName);
					  }
			}
		>
			{playerName}
		</a>
	);
}
