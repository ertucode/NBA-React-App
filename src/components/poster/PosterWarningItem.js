import React from "react";

// Make a popup class
// Add delete image

const warningItemStyles = {
	position: "absolute",
	fontWeight: "700",
	top: "0",
	left: "60%",
	color: "red",
	transform: "translateY(-50%)",
	width: "10rem",
	cursor: "pointer",
};

export default function PosterWarningItem() {
	return (
		<div style={warningItemStyles}>
			Getting stats failed due to too many requests
		</div>
	);
}
