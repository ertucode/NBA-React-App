import React, { useEffect, useState } from "react";

export default function InfoPopup({ info }) {
	const [showing, setShowing] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShowing(false), 2000);
		return () => clearTimeout(timer);
	}, [showing]);

	return (
		<>
			<span
				className={`info-popup ${showing ? "visible" : ""}`}
				onClick={() => {
					showing ? setShowing(false) : setShowing(true);
				}}
				data-info={info}
			>
				I
			</span>
		</>
	);
}
