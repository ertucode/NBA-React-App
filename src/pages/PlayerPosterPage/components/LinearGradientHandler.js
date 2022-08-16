import React, { useContext } from "react";
import getUniqueId from "../../../utils/getUniqueId";

import { PosterContext } from "../PlayerPosterPage";

export default function LinearGradientHandler() {
	const { backgroundState, setBackgroundState } = useContext(PosterContext);

	return (
		<div className="linear-gradient-handler">
			<div className="gradient-direction-wrapper">
				<label htmlFor="g-dir">Direction:</label>
				<input
					id="g-dir"
					type="range"
					min={0}
					max={360}
					step={1}
					value={backgroundState.linearGradient.direction}
					onChange={(e) => {
						setBackgroundState((prevState) => {
							const newState = {
								...prevState,
							};
							newState.linearGradient.direction = e.target.value;
							return newState;
						});
					}}
				/>
			</div>
			<div className="gradient-selections-wrapper">
				<>
					{backgroundState.linearGradient.gradients.map(
						(color, index) => {
							return (
								<div
									className="gradient-wrapper"
									key={getUniqueId()}
								>
									<input
										type="color"
										value={color}
										onInput={(e) =>
											setBackgroundState((prevState) => {
												const newState = {
													...prevState,
												};
												newState.linearGradient.gradients[
													index
												] = e.target.value;
												return newState;
											})
										}
									/>
									<button
										className="generic-button"
										onClick={(e) => {
											setBackgroundState((prevState) => {
												const newState = {
													...prevState,
												};
												newState.linearGradient.gradients.splice(
													index,
													1
												);
												return newState;
											});
										}}
									>
										X
									</button>
								</div>
							);
						}
					)}
					<button
						className="linear-gradient-add-button generic-button"
						onClick={() => {
							setBackgroundState((prevState) => {
								const newState = {
									...prevState,
								};
								if (
									newState.linearGradient.gradients.length ===
									0
								)
									console.log("urge user");
								newState.linearGradient.gradients.push(
									"#222222"
								);
								return newState;
							});
						}}
					>
						Add gradient color
					</button>
				</>
			</div>
		</div>
	);
}
