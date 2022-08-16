import React, { useContext } from "react";
import { PosterContext } from "../PlayerPosterPage";
import FileInputButton from "./FileInputButton";
import LinearGradientHandler from "./LinearGradientHandler";

export default function BackgroundPicker() {
	const { backgroundState, setBackgroundState } = useContext(PosterContext);

	return (
		<div className="background-picker-wrapper">
			<div className="background-option-wrapper">
				<div className="option-header">Image</div>
				<FileInputButton
					fileCallback={(file) => {
						if (file.type && !file.type.startsWith("image/")) {
							console.log(
								"File is not an image.",
								file.type,
								file
							);
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
			<div className="background-option-wrapper">
				<div className="background-color-gradient-option-wrapper">
					<div className="background-radio-wrapper opacity">
						<label htmlFor="opacity">Color opacity:</label>
						<input
							id="opacity"
							type="range"
							min={0}
							max={1}
							step={0.05}
							value={backgroundState.colorOpacity}
							onChange={(e) => {
								setBackgroundState((prevState) => {
									const newState = {
										...prevState,
									};
									newState.colorOpacity = e.target.value;
									return newState;
								});
							}}
						/>
					</div>

					<div
						className="background-color-gradient-option-wrapper"
						onChange={(e) => {
							setBackgroundState((prevState) => {
								const newState = { ...prevState };
								newState.colorChoice = e.target.value;
								return newState;
							});
						}}
					>
						<div className="background-radio-wrapper">
							<label htmlFor="bg-color-radio">Color</label>
							<input
								id="bg-color-radio"
								type="radio"
								name="bg-choice"
								value="color"
								defaultChecked={
									backgroundState.colorChoice === "color"
								}
							/>
						</div>

						<div className="background-radio-wrapper">
							<label htmlFor="bg-grad-radio">Gradient</label>
							<input
								id="bg-grad-radio"
								type="radio"
								name="bg-choice"
								value="gradient"
								defaultChecked={
									backgroundState.colorChoice === "gradient"
								}
							/>
						</div>
					</div>
				</div>
			</div>
			{backgroundState.colorChoice === "color" ? (
				<div className="background-option-wrapper">
					<label htmlFor="background-color" className="option-header">
						Color
					</label>
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
				</div>
			) : (
				<div className="background-option-wrapper">
					<div className="option-header">Linear Gradient</div>
					<LinearGradientHandler />
				</div>
			)}
		</div>
	);
}
