import React from "react";

export default function TryAgain({ handleClick }) {
	return (
		<button className="try-again-button" onClick={handleClick}>
			Try again
		</button>
	);
}
