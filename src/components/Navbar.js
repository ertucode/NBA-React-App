import React, { useState } from "react";
import getPlayersOfCount from "../utils/getPlayersOfCount";
import TextInputField from "./search_box/TextInputField";

export default function Navbar() {
	const [players, setPlayers] = useState([]);

	return (
		<div className="navbar">
			<h1 className="site-name">Basketball Stats</h1>
			<TextInputField
				buttonName="Add Player"
				onChangeCallback={(val) => {
					getPlayersOfCount(setPlayers, val, 10);
				}}
				players={players}
			/>
		</div>
	);
}
