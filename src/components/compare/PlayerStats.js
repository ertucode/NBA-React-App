import React from "react";

export default function PlayerStats({ player }) {
	console.log(player);
	return (
		<div className="player-stats__container">
			{player ? (
				<>
					<div className="player-stats__player-name player-stats__player-stat">
						{loadStatField(
							"Name",
							`${loadStat(player.first_name)} ${loadStat(
								player.last_name
							)}`
						)}
					</div>
					<div className="player-stats__player-height player-stats__player-stat">
						{loadStatField("Position", player.position)}
					</div>
					<div className="player-stats__player-team-name player-stats__player-stat">
						{loadStatField("Team", player.team.full_name)}
					</div>
					<div className="player-stats__player-weight player-stats__player-stat">
						{loadStatField(
							"Weight",
							player.weight_pounds
								? `${player.weight_pounds} pounds`
								: "--"
						)}
					</div>
					<div className="player-stats__player-height player-stats__player-stat">
						{loadStatField(
							"Height",
							player.height_inches
								? `${loadStat(player.height_feet)}'${loadStat(
										player.height_inches
								  )}''`
								: "--"
						)}
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
}

function loadStat(stat) {
	return stat != null ? stat : "";
}

function loadStatField(statName, stat) {
	return (
		<div className="player-stats__stat--field">
			<span className="player-stats__stat--name">{statName}:</span>
			<span className="player-stats__stat--name">{stat}</span>
		</div>
	);
}
