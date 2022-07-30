import React from "react";

export default function DropdownMenu({ options, handleOptionClick }) {
	return (
		<div className="dropdown">
			{options.map((option, index) => {
				return (
					<div
						key={index}
						className="dropdown__option"
						onClick={() => handleOptionClick(option)}
					>
						{option}
					</div>
				);
			})}
		</div>
	);
}
