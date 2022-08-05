import React, { useContext, useState } from "react";
import FileInputButton from "./FileInputButton";

import { PosterContext } from "../../pages/PlayerPosterPage";

import { ReactComponent as ArrowSvg } from "./svg/arrow-down.svg";

export default function ImageInputArea({ setImgSrc }) {
	const [isDragging, setIsDragging] = useState(false);

	const { backgroundState } = useContext(PosterContext);

	function handleDragOver(e) {
		e.target.classList.add("active");
		setIsDragging(true);
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	}

	function handleDrop(e) {
		e.target.classList.remove("active");
		setIsDragging(false);
		e.stopPropagation();
		e.preventDefault();
		const file = e.dataTransfer.files[0];

		loadImage(file);
	}

	function handleDragLeave(e) {
		e.target.classList.remove("active");
		setIsDragging(false);
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

	const colorStyle =
		backgroundState.src == null &&
		(backgroundState.colorChoice === "color" ||
			backgroundState.linearGradient.gradients.length < 2)
			? {
					"--drop-area-color": getInverseColor(backgroundState.color),
			  }
			: {
					"--drop-area-color": "var(--clr-fourth)",
					backgroundColor: "rgba(0, 0, 0, 0.4)",
			  };

	const opacityClass = isDragging ? "o-0" : "";

	return (
		<div
			onDrop={(e) => handleDrop(e)}
			onDragOver={(e) => handleDragOver(e)}
			onDragLeave={(e) => handleDragLeave(e)}
			style={{
				...colorStyle,
			}}
			className="flex-center drop-area"
		>
			<div className={`drag-and-drop-text ${opacityClass} p-none`}>
				Drag and drop your Image
			</div>
			<div className={`${opacityClass} p-none`}>or</div>
			<div className={opacityClass}>
				<FileInputButton fileCallback={loadImage} />
			</div>
			<div className={`arrow-svg-wrapper ${!isDragging ? "o-0" : ""}`}>
				<ArrowSvg
					fill={getInverseColor(backgroundState.color)}
					stroke={
						backgroundState.src != null &&
						(backgroundState.colorChoice === "color" ||
							backgroundState.linearGradient.gradients.length < 2)
							? backgroundState.color
							: "none"
					}
				/>
			</div>
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
