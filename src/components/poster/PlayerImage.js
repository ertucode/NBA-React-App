import React, { useState } from "react";
import ImageInputArea from "./ImageInputArea";

const playerImageCardStyle = {
	gridRow: "2 / 11",
	flexGrow: 1,
};

const playerImageStyle = {};

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
