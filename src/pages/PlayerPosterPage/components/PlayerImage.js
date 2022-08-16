import React, { useContext, useEffect, useState } from "react";
import ImageInputArea from "./ImageInputArea";
import { PosterContext } from "../PlayerPosterPage";

const playerImageCardStyle = {
	overflow: "hidden",
};

const playerImageStyle = {
	position: "absolute",
	pointerEvents: "none",
	overflow: "hidden",
};

export default function PlayerImage({ index }) {
	const [imageTransformStyle, setImageTransformStyle] = useState({});
	const { imageSources, setImageSources, imageTransforms, shadowStyles } =
		useContext(PosterContext);

	useEffect(() => {
		const it = imageTransforms[index];
		setImageTransformStyle({
			transform: `translate(${it.translateX.value}%,${it.translateY.value}%) scale(${it.scale.value})`,
		});
	}, [imageTransforms, index]);

	const shadowStyle = shadowStyles[index];

	return (
		<div style={playerImageCardStyle} className="flex-center m-auto">
			{imageSources[index].src == null ? (
				<ImageInputArea
					setImgSrc={(src) =>
						setImageSources((prevSources) => {
							const newSources = [...prevSources];
							newSources[index].src = src;
							return newSources;
						})
					}
				/>
			) : (
				<img
					src={imageSources[index].src}
					style={{
						...playerImageStyle,
						...imageTransformStyle,
						...getShadowStyle(shadowStyle.th, shadowStyle.color),
					}}
					alt={`$player{index}`}
				/>
			)}
		</div>
	);
}

function getShadowStyle(th, color) {
	if (th === "0" || th === 0) return {};

	const style = `drop-shadow(${th}px ${th}px 0 ${color}) drop-shadow(-${th}px -${th}px 0 ${color})`;

	return { WebkitFilter: style, filter: style };
}
