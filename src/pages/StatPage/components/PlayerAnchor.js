import React from "react";
import "../css/player-anchor.css";

import { ReactComponent as CrossSvg } from "../svg/cross.svg";

export default function PlayerAnchor({
	fullName,
	active,
	handlePlayerUndo,
	handlePlayerForeverDelete,
}) {
	return (
		<div className="player-anchor__button-wrapper">
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
			{!active && (
				<button
					className="player-anchor__remove--button"
					onClick={handlePlayerForeverDelete}
					title="Click to delete player forever"
				>
					<CrossSvg style={{ width: "10px" }} />
				</button>
			)}
		</div>
	);
}
