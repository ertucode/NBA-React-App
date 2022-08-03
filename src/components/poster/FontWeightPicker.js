import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";

const fontWeightFieldContainer = {
	display: "flex",
	flexWrap: "wrap",
};

export default function FontWeightPicker() {
	const { textState, setTextState } = useContext(PosterContext);

	return (
		<div>
			<div>Change Font Weight</div>
			<div style={fontWeightFieldContainer}>
				{Object.entries(textState)
					.slice(0, -1)
					.map(([key, value]) => (
						<fieldset
							key={key}
							onChange={(e) =>
								setTextState((prevState) => {
									const newState = { ...prevState };
									newState[key].style.fontWeight =
										e.target.value;

									return newState;
								})
							}
						>
							<legend>{value.label}</legend>

							<div>
								<input
									type="radio"
									name={`${value.label}`}
									id={`${value.label}bold`}
									value="700"
									defaultChecked
								/>
								<label
									style={{ fontWeight: 700 }}
									htmlFor={`${value.label}bold`}
								>
									700
								</label>
							</div>
							<div>
								<input
									type="radio"
									name={`${value.label}`}
									id={`${value.label}normal`}
									value="400"
								/>
								<label
									style={{ fontWeight: 400 }}
									htmlFor={`${value.label}normal`}
								>
									400
								</label>
							</div>
							<div>
								<input
									type="radio"
									name={`${value.label}`}
									id={`${value.label}thin`}
									value="100"
								/>
								<label
									style={{ fontWeight: 100 }}
									htmlFor={`${value.label}thin`}
								>
									100
								</label>
							</div>
						</fieldset>
					))}
			</div>
		</div>
	);
}
