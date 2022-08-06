import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";

export default function ShadowPicker({ index }) {
	const { shadowStyles, setShadowStyles } = useContext(PosterContext);

	return (
		<div className="shadow-picker">
			<div className="option-header">Shadow</div>
			<div>
				<label htmlFor="shadow-thickness">Thickness</label>
				<input
					type="number"
					value={shadowStyles[index].th}
					min={0}
					id="shadow-thickness"
					onChange={(e) => {
						setShadowStyles((prevStyles) => {
							const newStyles = [...prevStyles];
							newStyles[index].th = e.target.value;
							return newStyles;
						});
					}}
				></input>
			</div>
			<div>
				<label htmlFor="shadow-color">Color</label>
				<input
					type="color"
					value={shadowStyles[index].color}
					id="shadow-color"
					onChange={(e) => {
						setShadowStyles((prevStyles) => {
							const newStyles = [...prevStyles];
							newStyles[index].color = e.target.value;
							return newStyles;
						});
					}}
				></input>
			</div>
		</div>
	);
}
