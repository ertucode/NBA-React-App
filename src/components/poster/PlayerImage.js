import React, { useContext, useEffect, useState } from "react";
import ImageInputArea from "./ImageInputArea";
import { PosterContext } from "../../pages/PlayerPosterPage";

const playerImageCardStyle = {
	gridRow: "3 / 11",
	overflow: "hidden",
};

const playerImageStyle = {
	position: "absolute",
	pointerEvents: "none",
	overflow: "hidden",
};

/*
 -webkit-filter: drop-shadow(1px 1px 0 black)
                  drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(1px 1px 0 black) 
          drop-shadow(-1px -1px 0 black);
*/

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
		<div style={playerImageCardStyle} className="flex-center">
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
