import React, { useRef } from "react";
import getPlayerName from "../../utils/getPlayerName";

export default function TextInputField({
	buttonName,
	onChangeCallback,
	players,
}) {
	const inputRef = useRef();

	return (
		<>
			<form
				className="input-field"
				onSubmit={(e) => {
					e.target.preventDefault();
				}}
			>
				<input
					onChange={(e) => {
						onChangeCallback(inputRef.current.value);
					}}
					ref={inputRef}
					type="text"
					list="players"
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
