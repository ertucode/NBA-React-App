import React, { useId } from "react";

const sliderGroupStyle = {
	zIndex: 5,
};

export default function SliderComponent({ props }) {
	const id = useId();

	const { min, max, step, label, value, setValue } = props;

	return (
		<div style={sliderGroupStyle}>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => setValue(e)}
			></input>
		</div>
	);
}
