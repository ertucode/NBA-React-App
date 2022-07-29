import React, { useState, useEffect } from "react";
import getPlayersOfCount from "../utils/getPlayersOfCount";
import TextInputField from "./search_box/TextInputField";
import useDebounce from "../utils/useDebounce";

export default function Navbar({ setDesiredPlayers }) {
	const [playerSearchTerm, setPlayerSearchTerm] = useState();
	const debouncedPlayerSearchTerm = useDebounce(playerSearchTerm, 500);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		getPlayersOfCount(setPlayers, debouncedPlayerSearchTerm, 10);
	}, [debouncedPlayerSearchTerm]);

	return (
		<div className="navbar">
			<h1 className="site-name">Basketball Stats</h1>
			<TextInputField
				buttonName="Add Player"
				onChangeCallback={(val) => {
					setPlayerSearchTerm(val);
				}}
				onSubmitCallback={(val) => {
					setDesiredPlayers((prevPlayers) => {
						const newPlayers = [...prevPlayers];

						newPlayers.push({
							player: players[0],
							gotStats: false,
						});
						return newPlayers;
					});
				}}
				players={players}
			/>
		</div>
	);
}
