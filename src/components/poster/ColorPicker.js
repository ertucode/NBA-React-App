import React, { useContext } from "react";

import { PosterContext } from "../../pages/PlayerPosterPage";

const colorPickerContainerStyle = {
	display: "flex",
	gap: ".25rem .5rem",
};

const colorContainerStyle = {
	boxShadow: "2px 2px 2px var(--clr-primary), -2px -2px 2px var(--clr-third)",
	padding: ".5rem",
	borderRadius: "2px",
};

const labelStyle = {
	marginRight: ".5rem",
	fontWeight: "600",
};

export default function ColorPicker() {
	const { textState, setTextState } = useContext(PosterContext);

	return (
		<div>
			<div>Change Colors</div>
			<div style={colorPickerContainerStyle}>
				{Object.entries(textState).map(([key, value]) => (
					<div style={colorContainerStyle} key={key}>
						<label htmlFor={value.label} style={labelStyle}>
							{value.label}
						</label>
						<input
							type="color"
							name={value.label}
							id={value.label}
							onInput={(e) =>
								setTextState((prevState) => {
									return {
										...prevState,
										...{
											[key]: {
												label: value.label,
												style: {
													...value.style,
													color: e.target.value,
												},
											},
										},
									};
								})
							}
							value={value.style.color}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
