import React, { useContext } from "react";
import { PosterContext } from "../PlayerPosterPage";

export default function FontHandler() {
	const { fontState, setFontState } = useContext(PosterContext);

	return (
		<div className="font-handler-container">
			{Object.entries(fontState).map(([key, value]) => (
				<div key={key}>
					<div className="font-handler-label option-header">
						{value.label}
					</div>
					<div className="font-handler-group-container">
						<input
							type="color"
							className="font-handler-font-color"
							value={value.style.color}
							onChange={(e) => {
								setFontState((prevState) => {
									const newState = { ...prevState };
									newState[key].style.color = e.target.value;
									return newState;
								});
							}}
						></input>
						<button
							className="font-handler-font-weight"
							style={{ fontWeight: value.style.fontWeight }}
							onClick={() => {
								setFontState((prevState) => {
									const newState = { ...prevState };
									const oldFontWeight =
										value.style.fontWeight;
									let newFontWeight;
									// eslint-disable-next-line
									switch (oldFontWeight) {
										case "100":
											newFontWeight = "400";
											break;
										case "400":
											newFontWeight = "700";
											break;
										case "700":
											newFontWeight = "100";
											break;
									}
									newState[key].style.fontWeight =
										newFontWeight;
									return newState;
								});
							}}
						>
							B
						</button>
						<input
							className="font-handler-font-size"
							type="number"
							step={0.1}
							min={0}
							value={getNumberFromFontSize(value.style.fontSize)}
							onChange={(e) => {
								setFontState((prevState) => {
									const newState = { ...prevState };
									newState[
										key
									].style.fontSize = `${e.target.value}px`;
									return newState;
								});
							}}
						></input>
					</div>
				</div>
			))}
		</div>
	);
}

function getNumberFromFontSize(fontSize) {
	if (fontSize == null) return 2;
	return parseFloat(fontSize.slice(0, -2));
}
