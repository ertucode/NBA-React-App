import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";

const fontSizeFieldContainer = {
	display: "flex",
	flexWrap: "wrap",
};

const labelStyle = {
	marginRight: ".5rem",
	fontWeight: "600",
};

export default function FontSizePicker() {
	const { textState, setTextState } = useContext(PosterContext);

	return (
		<div>
			<div>Change Font Size</div>
			<div style={fontSizeFieldContainer}>
				{Object.entries(textState)
					.slice(0, -1)
					.map(([key, value]) => (
						<div key={key}>
							<label htmlFor={value.label} style={labelStyle}>
								{value.label}
							</label>
							<input
								type="range"
								id={value.label}
								min={0}
								max={5}
								step={0.1}
								value={getNumberFromFontSize(
									textState[key].style.fontSize
								)}
								onChange={(e) =>
									setTextState((prevState) => {
										const newState = { ...prevState };
										newState[
											key
										].style.fontSize = `${e.target.value}rem`;
										return newState;
									})
								}
							></input>
						</div>
					))}
			</div>
		</div>
	);
}

function getNumberFromFontSize(fontSize) {
	if (fontSize == null) return 3;
	return parseFloat(fontSize.slice(0, -3));
}
