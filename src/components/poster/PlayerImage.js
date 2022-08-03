import React, { useState } from "react";
import ImageInputArea from "./ImageInputArea";

const playerImageCardStyle = {
	gridRow: "3 / 11",
};

const playerImageStyle = {
	position: "absolute",
};

export default function PlayerImage() {
	const [imgSrc, setImgSrc] = useState(null);

	return (
		<div style={playerImageCardStyle} className="flex-center">
			{imgSrc == null ? (
				<ImageInputArea setImgSrc={setImgSrc} />
			) : (
				<img src={imgSrc} style={playerImageStyle} alt="left poster" />
			)}
		</div>
	);
}