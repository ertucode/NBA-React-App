import React, { useRef, useState, useEffect, useContext } from "react";
import DropdownMenu from "../search_box/DropdownMenu";
import { PosterContext } from "../../pages/PlayerPosterPage";

import getPlayersOfCount from "../../utils/getPlayersOfCount";
import useDebounce from "../../utils/useDebounce";
import Player from "../../utils/Player";

/*,
	position: "absolute",
	top: "5%",
	left: "50%",
	transform: "translateX(-50%)",

*/

export default function TextInputField({ index }) {
	const inputRef = useRef();

	const [showDropdown, setShowDropdown] = useState(false);
	const [playerSearchTerm, setPlayerSearchTerm] = useState();
	const debouncedPlayerSearchTerm = useDebounce(playerSearchTerm, 500);
	const [inputsAreDifferent, setInputsAreDifferent] = useState(false);
	const [searchedPlayers, setSearchedPlayers] = useState([]);

	const { setPlayers } = useContext(PosterContext);

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

	useEffect(() => {
		setInputsAreDifferent(playerSearchTerm !== debouncedPlayerSearchTerm);
	}, [playerSearchTerm, debouncedPlayerSearchTerm]);

	return (
		<>
			<div className="input-field input-field-poster">
				<div className="input-with-dropdown">
					<input
						className={
							searchedPlayers.length === 0 || !showDropdown
								? "empty "
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
									setPlayers((prevPlayers) => {
										const newPlayers = [...prevPlayers];
										newPlayers[index] =
											searchedPlayers.find(
												(player) => player.id === id
											);
										return newPlayers;
									});
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
