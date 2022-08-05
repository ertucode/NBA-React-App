import React, { useContext, useEffect, useReducer, useState } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import ImageResizer from "./ImageResizer";

import { ReactComponent as StatSvg } from "./svg/stat1.svg";
import { ReactComponent as FontSvg } from "./svg/font1.svg";
import { ReactComponent as BackgroundSvg } from "./svg/background.svg";
import { ReactComponent as ImageSvg } from "./svg/image1.svg";
import { ReactComponent as HideSvg } from "./svg/hide.svg";
import FontHandler from "./FontHandler";
import BackgroundPicker from "./BackgroundPicker";

function handleSvgHover(state, action) {
	const newState = { ...state };
	newState[action.key] = action.isHovering;
	return newState;
}

export default function PosterOptions({ setOptions }) {
	const [minimized, setMinimized] = useState(false);

	const { players, options, setGettingStats, setGettingStatsFailed } =
		useContext(PosterContext);

	const [hoverState, dispatch] = useReducer(handleSvgHover, {
		image: false,
		stat: false,
		color: false,
		font: false,
	});

	useEffect(() => {
		players.forEach((player) => {
			if (player != null && !player.gotStats) {
				setGettingStats(true);
				player.getStats(setGettingStats, setGettingStatsFailed);
			}
		});
	}, [players, setGettingStats, setGettingStatsFailed]);

	function handleStatClick(e, stat) {
		const newOptions = { ...options };
		newOptions.desiredStats[stat] = !newOptions.desiredStats[stat];
		setOptions(newOptions);
	}

	return (
		<div
			id="options-area"
			className={`${minimized ? "minimized" : ""}`}
			tabIndex="0"
		>
			<div
				className="options-area__child"
				id="options-area__stat-container"
				onMouseEnter={() => dispatch({ key: "stat", isHovering: true })}
				onMouseLeave={() =>
					dispatch({ key: "stat", isHovering: false })
				}
			>
				<div className="svg-container">
					<StatSvg
						fill={`${hoverState.stat ? "#ffffff" : "#000000"}`}
					/>
				</div>
				<div className="option-popup">
					<div className="stat-container">
						<div id="options-area__stat-selections">
							{Object.entries(options.desiredStats).map(
								([stat, bool], index) => (
									<button
										key={index}
										onClick={(e) =>
											handleStatClick(e, stat)
										}
										className={bool ? "" : "deactivated"}
									>
										{stat}
									</button>
								)
							)}
						</div>
					</div>
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__color-selections"
				onMouseEnter={() =>
					dispatch({ key: "color", isHovering: true })
				}
				onMouseLeave={() =>
					dispatch({ key: "color", isHovering: false })
				}
			>
				<div className="svg-container">
					<BackgroundSvg
						fill={`${hoverState.color ? "#ffffff" : "#000000"}`}
					/>
				</div>
				<div className="option-popup">
					<BackgroundPicker />
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__font-handler"
				onMouseEnter={() => dispatch({ key: "font", isHovering: true })}
				onMouseLeave={() =>
					dispatch({ key: "font", isHovering: false })
				}
			>
				<div className="svg-container">
					<FontSvg
						fill={`${hoverState.font ? "#ffffff" : "#000000"}`}
					/>
				</div>
				<div className="option-popup">
					<FontHandler />
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__image-handler"
				onMouseEnter={() =>
					dispatch({ key: "image", isHovering: true })
				}
				onMouseLeave={() =>
					dispatch({ key: "image", isHovering: false })
				}
			>
				<div className="svg-container">
					<ImageSvg
						fill={`${hoverState.image ? "#ffffff" : "#000000"}`}
					/>
				</div>
				<div className="option-popup">
					<ImageResizer />
				</div>
			</div>
			<div
				className="options-area__child"
				id="options-area__hide-handler"
				onMouseEnter={() => dispatch({ key: "hide", isHovering: true })}
				onMouseLeave={() =>
					dispatch({ key: "hide", isHovering: false })
				}
				onClick={() => {
					setMinimized((prevState) => !prevState);
				}}
			>
				<div className="svg-container">
					<HideSvg
						fill={`${hoverState.hide ? "#ffffff" : "#000000"}`}
					/>
				</div>
				<div className="option-popup">
					{!minimized ? (
						<div>
							Click to hide the editor at the top of the page
						</div>
					) : (
						<div>Click to restore</div>
					)}
				</div>
			</div>
		</div>
	);
}
