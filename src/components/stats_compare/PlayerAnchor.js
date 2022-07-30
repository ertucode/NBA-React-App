import React from "react";

export default function PlayerAnchor({ fullName, active, handlePlayerUndo }) {
	return (
		<a
			className={`player-anchor ${active ? "" : "deactivated"}`}
			href={active ? `#${fullName}` : "#"}
			title={
				active
					? "Click to scroll to the player"
					: "Click to bring back the player"
			}
			onClick={
				active
					? undefined
					: () => {
							handlePlayerUndo();
					  }
			}
		>
			{fullName}
		</a>
	);
}
