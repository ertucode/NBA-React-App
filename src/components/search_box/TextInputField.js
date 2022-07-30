import React, { useRef } from "react";
import InfoPopup from "../_general/InfoPopup";
import DropdownMenu from "./DropdownMenu";

export default function TextInputField({
	buttonName,
	handleInputChange,
	handleOptionClick,
	searchedPlayers,
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
						{searchedPlayers.length > 0 && (
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

				<button type="submit">{buttonName}</button>
			</form>
		</>
	);
}
