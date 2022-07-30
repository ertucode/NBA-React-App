import React from "react";

export default function PlayerAnchor({ playerName, active }) {
	return (
		<a
			className={`player-anchor ${active ? "" : "deactivated"}`}
			href={active ? `#${playerName}` : ""}
			title={
				active
					? "Click to scroll to the player"
					: "Click to bring back the player"
			}
		>
			{playerName}
		</a>
	);
}
