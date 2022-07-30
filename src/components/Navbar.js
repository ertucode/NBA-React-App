import React, { useState, useEffect } from "react";
import getPlayersOfCount from "../utils/getPlayersOfCount";
import TextInputField from "./search_box/TextInputField";
import useDebounce from "../utils/useDebounce";
import getPlayerName from "../utils/getPlayerName";

export default function Navbar({ setDesiredPlayers }) {
	const [playerSearchTerm, setPlayerSearchTerm] = useState();
	const debouncedPlayerSearchTerm = useDebounce(playerSearchTerm, 500);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		getPlayersOfCount(setPlayers, debouncedPlayerSearchTerm, 10);
	}, [debouncedPlayerSearchTerm]);

	function handleOptionClick(name) {
		setDesiredPlayers((prevDesiredPlayers) => {
			const newDesiredPlayer = {
				player: players.find(
					(player) => name === getPlayerName(player)
				),
				gotStats: false,
			};

			if (newDesiredPlayer.player == null) {
				console.log(
					"Something went wrong with finding player",
					players,
					name
				);
				return prevDesiredPlayers;
			}

			if (
				prevDesiredPlayers.find(
					(player) => newDesiredPlayer.player.id === player.player.id
				)
			) {
				console.log("Same player exits");
				return prevDesiredPlayers;
			}

			setPlayers([]);
			return [...prevDesiredPlayers, newDesiredPlayer];
		});
	}

	return (
		<div className="navbar">
			<h1 className="site-name">Basketball Stats</h1>
			<TextInputField
				buttonName="Add Player"
				handleInputChange={(query) => {
					setPlayerSearchTerm(query);
				}}
				handleOptionClick={(name) => {
					handleOptionClick(name);
				}}
				players={players}
			/>
		</div>
	);
}
