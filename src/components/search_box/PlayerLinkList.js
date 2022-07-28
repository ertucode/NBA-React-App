import React, { useState, useEffect, useContext } from "react";
import PlayerLink from "./PlayerLink";
import { PlayersContext } from "../App";

export default function PlayerLinkList({ players, setLoadPlayers }) {
	const [listItems, setListItems] = useState("");

	const { pickedPlayers, setPickedPlayers } = useContext(PlayersContext);

	function handlePlayerPick(pickedPlayer) {
		if (pickedPlayers.length < 2) {
			const newPlayers = [...pickedPlayers];
			newPlayers.push(pickedPlayer);
			setPickedPlayers(newPlayers);
			return;
		}

		setPickedPlayers([pickedPlayers[0], pickedPlayer]);
	}

	useEffect(() => {
		setListItems(
			players.map((player) => (
				<PlayerLink
					key={player.id}
					player={player}
					handlePlayerPick={handlePlayerPick}
				/>
			))
		);
		setLoadPlayers(false);
	}, [players, setLoadPlayers]);

	return <div className="player-link-container">{listItems}</div>;
}
