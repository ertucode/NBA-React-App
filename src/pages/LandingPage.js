import React from "react";
import curryImg from "../images/curry_img.png";
import lebronImg from "../images/lebron_img.png";

export default function LandingPage() {
	return (
		<div className="landing-page">
			<div className="landing-page-body">
				<div className="landing-page-image-grid">
					<img
						src={curryImg}
						alt="curry"
						className="landing-page-image"
					/>
					<img
						src={lebronImg}
						alt="lebron"
						className="landing-page-image"
					/>
				</div>
				<div className="landing-page-text-grid">COMPARE</div>
			</div>
		</div>
	);
}
