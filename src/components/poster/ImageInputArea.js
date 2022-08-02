import React from "react";
import FileInputButton from "./FileInputButton";

const dropAreaStyle = {
	border: "3px dashed black",
	borderRadius: "1rem",
	width: "80%",
	aspectRatio: 1,
	margin: "auto",
	flexDirection: "column",
};

export default function ImageInputArea({ setImgSrc }) {
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
			style={dropAreaStyle}
			className="flex-center"
		>
			<div className="drag-and-drop">Drag and drop your Image</div>
			<FileInputButton fileCallback={loadImage} />
		</div>
	);
}
