import React, { useState } from "react";

export default function ListNumbers({ count, getPlayersAtPage, searchParam }) {
	const [activeNumber, setActiveNumber] = useState(1);

	function populateNumbers() {
		const numbers = [];
		for (let i = 1; i < count + 1; i++) {
			numbers.push(
				<span
					className={`list-number ${
						activeNumber === i ? "active" : ""
					}`}
					key={i}
					onClick={() => {
						setActiveNumber(i);
						getPlayersAtPage(searchParam, i);
					}}
				>
					{i}
				</span>
			);
		}
		return numbers;
	}

	return <div className="list-number-container">{populateNumbers()}</div>;
}
