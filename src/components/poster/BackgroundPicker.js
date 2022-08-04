import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import FileInputButton from "./FileInputButton";

export default function BackgroundPicker() {
	const { backgroundState, setBackgroundState } = useContext(PosterContext);

	return (
		<div>
			<label htmlFor="background-color">Color</label>
			<input
				type="color"
				id="background-color"
				value={backgroundState.color}
				onChange={(e) => {
					setBackgroundState((prevState) => {
						const newState = { ...prevState };
						newState.color = e.target.value;
						return newState;
					});
				}}
			></input>
			<FileInputButton
				fileCallback={(file) => {
					if (file.type && !file.type.startsWith("image/")) {
						console.log("File is not an image.", file.type, file);
						return;
					}

					const reader = new FileReader();
					reader.addEventListener("load", (event) => {
						setBackgroundState((prevState) => {
							const newState = { ...prevState };
							newState.src = event.target.result;
							return newState;
						});
					});
					reader.readAsDataURL(file);
				}}
			/>
		</div>
	);
}
