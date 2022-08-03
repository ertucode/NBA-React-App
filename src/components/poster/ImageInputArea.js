import React, { useContext } from "react";
import FileInputButton from "./FileInputButton";

import { PosterContext } from "../../pages/PlayerPosterPage";

const dropAreaStyle = {
	border: "3px dashed var(--drop-area-color, black)",
	color: "var(--drop-area-color, black)",
	borderRadius: "1rem",
	width: "80%",
	aspectRatio: 1,
	margin: "auto",
	flexDirection: "column",
	zIndex: 5,
};

export default function ImageInputArea({ setImgSrc }) {
	const { textState } = useContext(PosterContext);

	function handleDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	}

	function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		const file = e.dataTransfer.files[0];

		loadImage(file);
	}

	function loadImage(file) {
		if (file.type && !file.type.startsWith("image/")) {
			console.log("File is not an image.", file.type, file);
			return;
		}

		const reader = new FileReader();
		reader.addEventListener("load", (event) => {
			setImgSrc(event.target.result);
		});
		reader.readAsDataURL(file);
	}

	return (
		<div
			onDrop={(e) => handleDrop(e)}
			onDragOver={(e) => handleDragOver(e)}
			style={{
				...dropAreaStyle,
				"--drop-area-color": getInverseColor(textState.bg.style.color),
			}}
			className="flex-center"
		>
			<div className="drag-and-drop">Drag and drop your Image</div>
			<div>or</div>
			<FileInputButton fileCallback={loadImage} />
		</div>
	);
}

function getInverseColor(hex) {
	hex = hex.slice(1);
	return `#${(Number(`0x1${hex}`) ^ 0xffffff)
		.toString(16)
		.substr(1)
		.toUpperCase()}`;
}
