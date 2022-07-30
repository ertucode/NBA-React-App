import React, { useRef, useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

export default function TextInputField({
	handleInputChange,
	handleOptionClick,
	searchedPlayers,
	inputsAreDifferent,
}) {
	const inputRef = useRef();

	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		inputRef.current.parentNode.classList.toggle(
			"loading",
			inputsAreDifferent
		);
	}, [inputsAreDifferent]);

	return (
		<>
			<div className="input-field">
				<div className="input-with-dropdown">
					<input
						className={
							searchedPlayers.length === 0 || !showDropdown
								? "empty"
								: ""
						}
						onChange={(e) => {
							handleInputChange(inputRef.current.value);
						}}
						ref={inputRef}
						onFocus={() => setShowDropdown(true)}
						onBlur={() => {
							setTimeout(() => setShowDropdown(false), 100);
						}}
						type="text"
						placeholder="Search Player/Team"
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
