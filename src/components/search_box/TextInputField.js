import React, { useRef } from "react";
import getPlayerName from "../../utils/getPlayerName";
import InfoPopup from "../_general/InfoPopup";
import DropdownMenu from "./DropdownMenu";

export default function TextInputField({
	buttonName,
	handleInputChange,
	handleOptionClick,
	players,
}) {
	const inputRef = useRef();

	return (
		<>
			<form className="input-field">
				<InfoPopup
					info={`Can't add player if the input field is not green`}
				/>
				<div className="input-with-dropdown">
					<input
						onChange={(e) => {
							handleInputChange(inputRef.current.value);
						}}
						ref={inputRef}
						type="text"
					></input>
					<>
						{players.length > 0 && (
							<DropdownMenu
								options={players.map((player) =>
									getPlayerName(player)
								)}
								handleOptionClick={(val) => {
									handleOptionClick(val);
									inputRef.current.value = "";
								}}
							/>
						)}
					</>
				</div>

				<button type="submit">{buttonName}</button>
			</form>
		</>
	);
}
