import React from "react";
import PlayerNameImage from "./PlayerNameImage";
import StatDisplayer from "./StatDisplayer";

const posterResizableStyle = {
	display: "flex",
	margin: "1rem 2rem",
	boxShadow: "0 0 10px var(--clr-third)",
	backgroundColor: "#f8f8f8",
};

export default function PosterArea() {
	return (
		<div style={posterResizableStyle}>
			<PlayerNameImage index={0} />
			<StatDisplayer />
			<PlayerNameImage index={1} />
		</div>
	);
}
