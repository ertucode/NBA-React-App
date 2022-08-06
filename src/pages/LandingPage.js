import React from "react";

import upDownPoster from "../images/posters/up-down.png";
import leftRightPoster from "../images/posters/left-right.PNG";
import HypedPoster from "../images/posters/hyped.png";

export default function LandingPage() {
	return (
		<div className="landing-page">
			<div className="landing-page-body">
				<div className="landing-page-poster">
					<div className="teaser-body">
						<div className="teaser">
							<span className="hidden-button">Get stats </span>of
							your favorite players and compare them with others.
						</div>
						<div className="teaser">
							<span className="hidden-button">Make posters </span>
							using the simple UI
						</div>
					</div>
				</div>

				<div className="make-posters-wrapper">
					<img
						src={upDownPoster}
						alt="up-down poster"
						className="landing-page-image"
					/>
					<img
						src={leftRightPoster}
						alt="left-right poster"
						className="landing-page-image"
					/>
					<img
						src={HypedPoster}
						alt="hyped poster"
						className="landing-page-image"
					/>
				</div>
			</div>
		</div>
	);
}
