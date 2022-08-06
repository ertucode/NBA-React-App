import React, { useRef, useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

import getPlayersOfCount from "../../utils/getPlayersOfCount";
import useDebounce from "../../utils/useDebounce";
import Player from "../../utils/Player";

export default function TextInputField({ zeroPlayer, setDesiredPlayers }) {
	const inputRef = useRef();

	const [showDropdown, setShowDropdown] = useState(false);
	const [playerSearchTerm, setPlayerSearchTerm] = useState();
	const debouncedPlayerSearchTerm = useDebounce(playerSearchTerm, 500);
	const [inputsAreDifferent, setInputsAreDifferent] = useState(false);
	const [searchedPlayers, setSearchedPlayers] = useState([]);

	useEffect(() => {
		inputRef.current.parentNode.classList.toggle(
			"loading",
			inputsAreDifferent
		);
	}, [inputsAreDifferent]);

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
		<>
			<div className={`input-field ${zeroPlayer ? "no-player" : ""}`}>
				<div className="input-with-dropdown">
					<input
						className={
							searchedPlayers.length === 0 || !showDropdown
								? "empty"
								: ""
						}
						onChange={(e) => {
							setPlayerSearchTerm(inputRef.current.value);
						}}
						ref={inputRef}
						onFocus={() => setShowDropdown(true)}
						onBlur={() => {
							setTimeout(() => setShowDropdown(false), 100);
						}}
						type="text"
						placeholder="Search Player"
					></input>

					<>
						{searchedPlayers.length > 0 && showDropdown && (
							<DropdownMenu
								options={searchedPlayers}
								handleOptionClick={(id) => {
									handleOptionClick(id);
									inputRef.current.value = "";
								}}
							/>
						)}
					</>
				</div>
			</div>
		</>
	);
}
