import React, { useRef } from "react";
import getPlayerName from "../../utils/getPlayerName";
import InfoPopup from "../_general/InfoPopup";

export default function TextInputField({
	buttonName,
	onChangeCallback,
	onSubmitCallback,
	players,
}) {
	const inputRef = useRef();

	return (
		<>
			<form
				className="input-field"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmitCallback(inputRef.current.value);
					inputRef.current.value = "";
				}}
			>
				<InfoPopup
					info={`Can't add player if the input field is not green`}
				/>
				<input
					onChange={(e) => {
						onChangeCallback(inputRef.current.value);
					}}
					ref={inputRef}
					type="text"
					list="players"
					className={players.length === 1 ? "bg-green" : ""}
				></input>
				<button type="submit">{buttonName}</button>
				<datalist id="players">
					{players.map((player) => {
						return (
							<option key={player.id}>
								{getPlayerName(player)}
							</option>
						);
					})}
				</datalist>
			</form>
		</>
	);
}
