import React, { useState, useEffect } from "react";
import getPlayersOfCount from "../utils/getPlayersOfCount";
import TextInputField from "./search_box/TextInputField";
import useDebounce from "../utils/useDebounce";
import Player from "../utils/Player";

export default function Navbar({ setDesiredPlayers }) {
	const [playerSearchTerm, setPlayerSearchTerm] = useState();
	const debouncedPlayerSearchTerm = useDebounce(playerSearchTerm, 500);
	const [inputsAreDifferent, setInputsAreDifferent] = useState(false);
	const [searchedPlayers, setSearchedPlayers] = useState([]);

	useEffect(() => {
		getPlayersOfCount(debouncedPlayerSearchTerm, 10).then((newPlayers) => {
			setSearchedPlayers(() =>
				newPlayers.map((playerData) => new Player(playerData))
			);
		});
	}, [debouncedPlayerSearchTerm]);

	function handleOptionClick(id) {
		setDesiredPlayers((prevDesiredPlayers) => {
			const newDesiredPlayer = searchedPlayers.find(
				(player) => player.id === id
			);

			setTimeout(() => {
				window.location.hash = "#" + newDesiredPlayer.fullName;
			}, 400);

			if (newDesiredPlayer == null) {
				console.log(
					"Something went wrong with finding player",
					searchedPlayers,
					id
				);
				return prevDesiredPlayers;
			}

			if (
				prevDesiredPlayers.find(
					(prevDesiredPlayer) =>
						prevDesiredPlayer.id === newDesiredPlayer.id
				)
			) {
				console.log("Same player exits");
				return prevDesiredPlayers;
			}

			setSearchedPlayers([]);
			return [...prevDesiredPlayers, newDesiredPlayer];
		});
	}

	useEffect(() => {
		setInputsAreDifferent(playerSearchTerm !== debouncedPlayerSearchTerm);
	}, [playerSearchTerm, debouncedPlayerSearchTerm]);

	return (
		<div className="navbar">
			<h1 className="site-name">Basketball Stats</h1>
			<TextInputField
				handleInputChange={setPlayerSearchTerm}
				handleOptionClick={handleOptionClick}
				searchedPlayers={searchedPlayers}
				inputsAreDifferent={inputsAreDifferent}
			/>
		</div>
	);
}
