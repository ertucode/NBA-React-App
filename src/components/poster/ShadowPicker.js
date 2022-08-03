import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";

const textInputStyles = {
	width: "4rem",
	padding: ".5rem",
	marginRight: "1rem",
};

export default function ShadowPicker({ index }) {
	const { shadowStyles, setShadowStyles } = useContext(PosterContext);

	return (
		<div>
			Add Shadow<br></br>
			<label>
				Thickness
				<input
					type="number"
					style={textInputStyles}
					value={shadowStyles[index].th}
					min={0}
					onChange={(e) => {
						setShadowStyles((prevStyles) => {
							const newStyles = [...prevStyles];
							newStyles[index].th = e.target.value;
							return newStyles;
						});
					}}
				></input>
			</label>
			<label>
				Color
				<input
					type="color"
					value={shadowStyles[index].color}
					onChange={(e) => {
						setShadowStyles((prevStyles) => {
							const newStyles = [...prevStyles];
							newStyles[index].color = e.target.value;
							return newStyles;
						});
					}}
				></input>
			</label>
		</div>
	);
}
